# PLC Docs

Sổ tay PLC song ngữ (Việt / English) xây bằng [VitePress](https://vitepress.dev), xuất bản tĩnh trên GitHub Pages.

## Quickstart

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # build tĩnh vào docs/.vitepress/dist
npm run check    # kiểm tra frontmatter và EN counterpart
```

`BASE` có thể đặt khi build cho GitHub Pages project site:

```bash
BASE=/plc-docs/ npm run build
```

## Cấu trúc

```
docs/
  index.md                 Trang chủ
  concepts/                Chủ đề dùng chung
  q/                       MELSEC Q
  compare/                 So sánh dòng PLC
  en/                      Bản tiếng Anh
  .vitepress/
    config.mts             Cấu hình site
    sidebar.ts             Sidebar sinh từ data
    data/                  Nguồn số liệu dùng chung
    theme/                 Component tuỳ biến
  public/img/              Hình tĩnh
scripts/check-content.mjs  Kiểm tra nội dung trước khi build
```

Thêm dòng PLC hoặc sửa số liệu: xem [CONTRIBUTING.md](./CONTRIBUTING.md).
