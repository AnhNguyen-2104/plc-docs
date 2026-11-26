from __future__ import annotations

from pathlib import Path

from PIL import Image, ImageOps

ROOT = Path(__file__).resolve().parent.parent
IMG_SRC = ROOT / "assets-src" / "img"
PHOTO_SRC = ROOT / "assets-src" / "photos"
PUBLIC = ROOT / "docs" / "public"
OUT_IMG = PUBLIC / "img"
OUT_MODULES = OUT_IMG / "modules"
SIZES_TS = ROOT / "docs" / ".vitepress" / "data" / "imageSizes.ts"

IMAGE_EXT = {".jpg", ".jpeg", ".png", ".webp", ".gif", ".bmp", ".tif", ".tiff"}


def flatten(image: Image.Image) -> Image.Image:
    image = ImageOps.exif_transpose(image)
    if image.mode in {"RGBA", "LA", "P"}:
        image = image.convert("RGBA")
        canvas = Image.new("RGB", image.size, (255, 255, 255))
        canvas.paste(image, mask=image.getchannel("A"))
        return canvas
    return image.convert("RGB")


def resize(image: Image.Image, limit: int, width_limit: bool = False) -> Image.Image:
    width, height = image.size
    longest = width if width_limit else max(width, height)
    if longest <= limit:
        return image
    scale = limit / longest
    size = (max(1, round(width * scale)), max(1, round(height * scale)))
    return image.resize(size, Image.Resampling.LANCZOS)


def save_webp(image: Image.Image, target: Path, quality: int) -> tuple[int, int]:
    target.parent.mkdir(parents=True, exist_ok=True)
    image.save(target, "WEBP", quality=quality, method=6)
    return image.size


def main() -> None:
    sizes: dict[str, list[int]] = {}

    if IMG_SRC.exists():
        for source in sorted(IMG_SRC.rglob("*")):
            if not source.is_file() or source.suffix.lower() not in IMAGE_EXT:
                continue
            relative = source.relative_to(IMG_SRC).with_suffix(".webp")
            target = OUT_IMG / relative
            with Image.open(source) as opened:
                manual = relative.parts[0] == "manual"
                image = resize(flatten(opened), 1200)
            width, height = save_webp(image, target, 68 if manual else 82)
            sizes[f"/img/{relative.as_posix()}"] = [width, height]

    if PHOTO_SRC.exists():
        for source in sorted(PHOTO_SRC.glob("*")):
            if not source.is_file() or source.suffix.lower() not in IMAGE_EXT:
                continue
            stem = source.stem
            with Image.open(source) as opened:
                image = flatten(opened)
            full = resize(image, 640)
            width, height = save_webp(full, OUT_MODULES / f"{stem}.webp", 80)
            sizes[f"/img/modules/{stem}.webp"] = [width, height]
            thumb = resize(image, 160)
            tw, th = save_webp(thumb, OUT_MODULES / f"{stem}-thumb.webp", 78)
            sizes[f"/img/modules/{stem}-thumb.webp"] = [tw, th]

    og = IMG_SRC / "og.png"
    if og.exists():
        with Image.open(og) as opened:
            image = flatten(opened)
            scale = max(1200 / image.width, 630 / image.height)
            image = image.resize(
                (max(1200, round(image.width * scale)), max(630, round(image.height * scale))),
                Image.Resampling.LANCZOS,
            )
            left = (image.width - 1200) // 2
            top = (image.height - 630) // 2
            image = image.crop((left, top, left + 1200, top + 630))
        width, height = save_webp(image, OUT_IMG / "og.webp", 82)
        sizes["/img/og.webp"] = [width, height]

    SIZES_TS.parent.mkdir(parents=True, exist_ok=True)
    lines = [
        "export const imageSizes: Record<string, [number, number]> = {",
        *[f"  '{key}': [{value[0]}, {value[1]}]," for key, value in sorted(sizes.items())],
        "}",
        "",
    ]
    SIZES_TS.write_text("\n".join(lines), encoding="utf-8")
    total = sum(path.stat().st_size for path in OUT_IMG.rglob("*.webp"))
    print(f"images: {len(sizes)} webp, {total / 1024 / 1024:.2f} MB")


if __name__ == "__main__":
    main()
