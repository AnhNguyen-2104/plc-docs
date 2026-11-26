from __future__ import annotations

import os
import re
import sys
import urllib.request
from pathlib import Path

import pymupdf
from PIL import Image, ImageDraw

ROOT = Path(__file__).resolve().parent.parent
MANUAL_DIR = Path(os.environ.get("MANUAL_DIR", "D:/Manual-PLC-Servo"))
OUT_DIR = ROOT / "assets-src" / "img" / "manual"
PDF_DOCS = ROOT / "docs" / ".vitepress" / "data" / "pdfDocs.ts"

# Canonical archive layout under MANUAL_DIR (relative paths, checked by _check.ps1).
MANUAL_PATHS = {
    "sh080042": "IO/IO_BuildingBlock_SH-080042AH.pdf",
    "sh080483": "CPU/QCPU_Hardware_SH-080483BC.pdf",
    "sh080058": "Positioning-QD75/QD75_POSITIONING.pdf",
    "sh080036": "IO/HSC_QD62_SH-080036Q.pdf",
    "sh080055": "IO/Q64AD_AnalogIn_SH-080055U.pdf",
    "sh080054": "IO/Q62DA_AnalogOut_SH-080054V.pdf",
    "sh080006": "Communication/sh080006w_Serial-Basic.pdf",
    "sh080009": "Communication/sh080009y_Ethernet-Basic.pdf",
    "sh080016": "Communication/sh080016e_CC-Link-MasterLocal.pdf",
    "sh080049": "Communication/sh080049t_MELSECNET-H-PLCtoPLC.pdf",
    "ib0300062": "Motion/QD75M_Positioning_IB-0300062C.pdf",
    "ib0300185": "Motion/QD77MS_Positioning_IB-0300185K.pdf",
    "sh080807": "CPU/QnUCPU_Function_SH-080807AF.pdf",
}

PDF_URLS = {
    "sh080042": "https://dl.mitsubishielectric.com/dl/fa/document/manual/plc/sh080042/sh080042ah.pdf",
    "sh080483": "https://www.mitsubishielectric.com/dl/fa/document/manual/plc/sh080483eng/sh080483engbc.pdf",
    "sh080036": "https://dl.mitsubishielectric.com/dl/fa/document/manual/plc/sh080036/sh080036q.pdf",
    "sh080058": "https://dl.mitsubishielectric.com/dl/fa/document/manual/plc/sh080058/sh080058v.pdf",
    "sh080055": "https://www.mitsubishielectric.com/dl/fa/document/manual/plc/sh080055/sh080055u.pdf",
    "sh080054": "https://www.mitsubishielectric.com/dl/fa/document/manual/plc/sh080054/sh080054v.pdf",
    "sh080006": "https://dl.mitsubishielectric.com/dl/fa/document/manual/plc/sh080006/sh080006w.pdf",
    "sh080049": "https://dl.mitsubishielectric.com/dl/fa/document/manual/plc/sh080049/sh080049t.pdf",
    "sh080009": "https://dl.mitsubishielectric.com/dl/fa/document/manual/plc/sh080009/sh080009y.pdf",
    "sh080016": "https://dl.mitsubishielectric.com/dl/fa/document/manual/plc/sh080016/sh080016e.pdf",
    "sh080807": "https://www.mitsubishielectric.com/dl/fa/document/manual/plc/sh080807eng/sh080807engaf.pdf",
}

# id, model, section, printed page (auto-located from the SH-080042 map)
MODELS = [
    ("qx10", "QX10", "2.1", "2-1"),
    ("qx10ts", "QX10-TS", "2.2", "2-2"),
    ("qx28", "QX28", "2.3", "2-3"),
    ("qx40", "QX40", "2.4", "2-4"),
    ("qx40s1", "QX40-S1", "2.5", "2-5"),
    ("qx40ts", "QX40-TS", "2.6", "2-6"),
    ("qx40h", "QX40H", "2.7", "2-8"),
    ("qx41", "QX41", "2.8", "2-9"),
    ("qx41s1", "QX41-S1", "2.9", "2-11"),
    ("qx41s2", "QX41-S2", "2.10", "2-12"),
    ("qx42", "QX42", "2.11", "2-14"),
    ("qx42s1", "QX42-S1", "2.12", "2-16"),
    ("qx50", "QX50", "2.13", "2-17"),
    ("qx70", "QX70", "2.14", "2-18"),
    ("qx70h", "QX70H", "2.15", "2-20"),
    ("qx71", "QX71", "2.16", "2-21"),
    ("qx72", "QX72", "2.17", "2-23"),
    ("qx80", "QX80", "2.18", "2-24"),
    ("qx80ts", "QX80-TS", "2.19", "2-25"),
    ("qx80h", "QX80H", "2.20", "2-27"),
    ("qx81", "QX81", "2.21", "2-28"),
    ("qx81s2", "QX81-S2", "2.22", "2-29"),
    ("qx82", "QX82", "2.23", "2-31"),
    ("qx82s1", "QX82-S1", "2.24", "2-33"),
    ("qx90h", "QX90H", "2.25", "2-35"),
    ("qi60", "QI60", "5.1", "5-2"),
]

# id, doc key, pdf page, printed page, crop box (pt), output slug
EXTRA = [
    # Output modules, SH-080042
    ("qy10ts", "sh080042", 77, "3-3", (340, 80, 532, 322), "qy10ts-terminals"),
    ("qy18a", "sh080042", 78, "3-4", (340, 500, 532, 748), "qy18a-terminals"),
    ("qy22", "sh080042", 80, "3-6", (340, 80, 532, 322), "qy22-terminals"),
    ("qy40pts", "sh080042", 83, "3-9", (340, 95, 532, 338), "qy40pts-terminals"),
    ("qy41h", "sh080042", 84, "3-10", (170, 427, 550, 668), "qy41h-terminals"),
    ("qy41p", "sh080042", 85, "3-11", (170, 456, 550, 718), "qy41p-terminals"),
    ("qy42p", "sh080042", 86, "3-12", (140, 448, 550, 700), "qy42p-terminals"),
    ("qy50", "sh080042", 88, "3-14", (340, 80, 532, 322), "qy50-terminals"),
    ("qy68a", "sh080042", 89, "3-15", (160, 478, 530, 750), "qy68a-terminals"),
    ("qy70", "sh080042", 91, "3-17", (340, 80, 532, 322), "qy70-terminals"),
    ("qy71", "sh080042", 92, "3-18", (170, 473, 550, 748), "qy71-terminals"),
    ("qy80", "sh080042", 94, "3-20", (340, 80, 532, 322), "qy80-terminals"),
    ("qy80ts", "sh080042", 96, "3-22", (340, 80, 532, 322), "qy80ts-terminals"),
    ("qy81p", "sh080042", 97, "3-23", (170, 460, 550, 712), "qy81p-terminals"),
    ("qy82p", "sh080042", 98, "3-24", (140, 455, 550, 700), "qy82p-terminals"),
    # I/O combined modules, SH-080042
    ("qh42p", "sh080042", 101, "4-3", (160, 385, 560, 665), "qh42p-terminals"),
    ("qx41y41p", "sh080042", 104, "4-6", (160, 385, 560, 665), "qx41y41p-terminals"),
    ("qx48y57", "sh080042", 106, "4-8", (400, 80, 545, 305), "qx48y57-terminals"),
    # Analog, counter, positioning, serial, network
    ("q64ad", "sh080055", 63, "4-4", (52, 98, 528, 400), "q64ad-terminals"),
    ("q62da", "sh080054", 65, "4-5", (52, 84, 530, 386), "q62da-terminals"),
    ("qd62e", "sh080036", 37, "3-13", (52, 100, 543, 742), "qd62e-terminals"),
    ("qd75p4", "sh080058", 83, "3-25", (52, 84, 540, 780), "qd75p4-terminals"),
    ("qj71c24n-r4", "sh080006", 111, "4-8", (140, 445, 545, 612), "qj71c24n-r4-terminals"),
    ("qj71lp21-25", "sh080049", 108, "4-2", (120, 150, 485, 380), "qj71lp21-25-terminals"),
    # CPU, power supply, base units, SH-080483
    ("q00ujcpu", "sh080483", 134, "132", (55, 95, 545, 545), "q00ujcpu-parts"),
    ("q03udv", "sh080483", 143, "141", (55, 80, 545, 760), "q03udv-parts"),
    ("q06udh", "sh080483", 140, "138", (55, 100, 545, 500), "q06udh-parts"),
    ("q-series-main-base", "sh080483", 241, "239", (55, 228, 545, 438), "q-series-main-base-parts"),
    ("q-series-extension-base", "sh080483", 244, "242", (55, 232, 470, 362), "q-series-extension-base-parts"),
    ("q-series-power-supply", "sh080483", 206, "204", (55, 140, 395, 470), "q-series-power-supply-parts"),
    ("q-series-power-supply-q63p", "sh080483", 206, "204", (395, 140, 545, 470), "q-series-power-supply-q63p-parts"),
]

TB_ROW = re.compile(r"\bTB\d+\b")
PIN_ROW = re.compile(r"\b[12]?[AB]\d{2}\b|\b\d{1,2}\s*\n?\s*X[0-9A-F]{2}\b")
HEADER = re.compile(r"Terminal\s+block|Pin-Outs|Pin\s*No\.")
FRONT = re.compile(r"^(?:[AB]\d{1,2}\s*\n){4,}")


def ensure_pdf(key: str) -> Path:
    """Resolve a manual PDF from the canonical archive, downloading only as fallback."""
    rel = MANUAL_PATHS.get(key)
    if rel is None:
        raise RuntimeError(f"no archive path mapped for manual key {key!r}")
    archived = MANUAL_DIR / rel
    if archived.is_file() and archived.stat().st_size >= 1_000_000:
        return archived
    if not archived.is_file():
        print(f"archive file missing: {archived} (falling back to download)")
    else:
        print(f"archive file too small: {archived} (falling back to download)")
    if key not in PDF_URLS:
        raise RuntimeError(f"archive file missing and no download URL for {key!r}: {archived}")
    target = MANUAL_DIR / "_archive" / key / archived.name
    target.parent.mkdir(parents=True, exist_ok=True)
    if not target.is_file() or target.stat().st_size < 1_000_000:
        print(f"downloading {PDF_URLS[key]} -> {target}")
        urllib.request.urlretrieve(PDF_URLS[key], target)
    if not target.is_file() or target.stat().st_size < 1_000_000:
        raise RuntimeError(
            f"manual {key!r} unavailable: archive {archived} is missing and download failed -> {target}"
        )
    return target


def load_map() -> dict[str, int]:
    text = PDF_DOCS.read_text(encoding="utf-8")
    block = re.search(r"sh080042:\s*\{.*?map:\s*\{(.*?)\}", text, re.S)
    if not block:
        return {}
    return {key: int(page) for key, page in re.findall(r"'([^']+)':\s*(\d+)", block.group(1))}


def locate(pdf: pymupdf.Document, section: str, model: str, page_map: dict[str, int]) -> int:
    start = page_map.get(section)
    if start is None:
        heading = re.compile(rf"^\s*{re.escape(section)}\s+{re.escape(model)}\b", re.M)
        for page in pdf:
            if heading.search(page.get_text()):
                start = page.number + 1
                break
    if start is None:
        raise RuntimeError(f"cannot resolve SH-080042 section {section} for {model}")
    return start


def find_crop(page: pymupdf.Page) -> tuple[pymupdf.Rect, str]:
    blocks = page.get_text("blocks")
    tb = [b for b in blocks if TB_ROW.search(b[4]) and 330 < b[0] < 560]
    pin = [b for b in blocks if PIN_ROW.search(b[4]) and 330 < b[0] < 560]
    rows, kind = (tb, "terminal-block") if len(tb) >= len(pin) else (pin, "pin-out")
    if not rows:
        raise RuntimeError(f"no terminal rows on page {page.number + 1}")
    rx0 = min(b[0] for b in rows)
    y0 = min(b[1] for b in rows)
    x1 = max(b[2] for b in rows) + 14
    y1 = max(b[3] for b in rows) + 12
    extra = [
        b
        for b in blocks
        if b[1] < y1 + 30
        and b[3] > y1
        and b[2] > 340
        and b[0] < 560
        and re.search(r"\b(?:TB\d+|COM|[AB]\d{2})\b", b[4])
    ]
    if extra:
        y1 = max(b[3] for b in extra) + 6
    if kind == "terminal-block":
        x0 = rx0 - 30
    else:
        front = [b for b in blocks if FRONT.search(b[4]) and b[1] < y1 and b[3] > y0]
        left = [rx0, *[b[0] for b in front]]
        for label in page.search_for("Pin-Outs"):
            if y0 - 60 <= label.y0 <= y0:
                left.append(label.x0)
        x0 = min(left) - 12

    headers = [
        b
        for b in blocks
        if HEADER.search(b[4])
        and b[3] <= y0 + 12
        and b[1] >= y0 - 45
        and b[0] < x1
        and b[2] > x0
    ]
    if headers:
        y0 = min(y0, min(b[1] for b in headers)) - (22 if kind == "terminal-block" else 10)

    rect = pymupdf.Rect(x0, y0, x1, y1) & page.rect
    return rect, kind


def render(page: pymupdf.Page, rect: pymupdf.Rect, slug: str) -> tuple[Path, Image.Image]:
    pix = page.get_pixmap(clip=rect, dpi=600, alpha=False)
    out = OUT_DIR / f"{slug}.jpg"
    pix.save(out, jpg_quality=95)
    im = Image.open(out).convert("RGB")
    im.thumbnail((420, 420))
    return out, im


def main() -> None:
    only = set(sys.argv[1:])
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    report = []
    thumbs = []

    if not only or only & {mid for mid, *_ in MODELS}:
        pdf = pymupdf.open(ensure_pdf("sh080042"))
        page_map = load_map()
        for mid, model, section, printed in MODELS:
            if only and mid not in only:
                continue
            start = locate(pdf, section, model, page_map)
            for pno in range(start, min(start + 2, pdf.page_count) + 1):
                try:
                    rect, kind = find_crop(pdf[pno - 1])
                    break
                except RuntimeError:
                    continue
            else:
                raise RuntimeError(f"no terminal figure for {model} from page {start}")
            page = pdf[pno - 1]
            out, thumb = render(page, rect, f"{mid}-terminals")
            report.append((mid, model, pno, section, printed, kind, rect, out.stat().st_size))
            thumbs.append((mid, thumb))
            print(
                f"{mid:8} {model:8} pdf {pno:3} p.{printed:4} {kind:14} "
                f"{rect.width:5.0f}x{rect.height:5.0f}pt {thumb.width}x{thumb.height} "
                f"{out.stat().st_size / 1024:6.0f} KB"
            )

    docs: dict[str, pymupdf.Document] = {}
    for mid, doc_key, pno, printed, box, slug in EXTRA:
        if only and mid not in only:
            continue
        if doc_key not in docs:
            docs[doc_key] = pymupdf.open(ensure_pdf(doc_key))
        page = docs[doc_key][pno - 1]
        rect = pymupdf.Rect(*box) & page.rect
        out, thumb = render(page, rect, slug)
        report.append((mid, doc_key, pno, "-", printed, "explicit", rect, out.stat().st_size))
        thumbs.append((mid, thumb))
        print(
            f"{mid:26} {doc_key} pdf {pno:3} p.{printed:4} explicit      "
            f"{rect.width:5.0f}x{rect.height:5.0f}pt {thumb.width}x{thumb.height} "
            f"{out.stat().st_size / 1024:6.0f} KB"
        )

    if not thumbs:
        return
    cols = 6
    cell = 440
    rows = (len(thumbs) + cols - 1) // cols
    sheet = Image.new("RGB", (cols * cell, rows * (cell + 24)), "white")
    draw = ImageDraw.Draw(sheet)
    for i, (mid, im) in enumerate(thumbs):
        cx = (i % cols) * cell
        cy = (i // cols) * (cell + 24)
        sheet.paste(im, (cx + (cell - im.width) // 2, cy + 24))
        draw.text((cx + 8, cy + 4), f"{i + 1}. {mid}", fill="black")
    sheet.save(ROOT / ".scratch" / "terminals-contact.png")
    print(f"\n{len(report)} crops -> .scratch/terminals-contact.png")


if __name__ == "__main__":
    main()
