---
title: Danh mục module MELSEC Q
family: q
module: q-series
status: draft
source: SH-080483, SH-080042, SH-080055, SH-080054, SH-080036
---

# Danh mục module MELSEC Q

<ModuleSectionNav />

Danh mục này gom các module Q-series mà cẩm nang mô tả trực tiếp từ manual hãng đang lưu trên đĩa. Bắt đầu ở [Ghép module](/q/modules/assembly) để xếp CPU, base, nguồn và module vào khe; mở [Hướng dẫn các module](/q/modules/guides) để tra từng model; đọc [Cách dùng](/q/modules/usage) nếu mới vào lần đầu. Ảnh sản phẩm bên dưới dẫn tới trang riêng của từng model. Dòng gắn nhãn "dự kiến" là module chưa xác minh được thông số từ manual trên đĩa, nên chỉ giữ mô tả định tính.

## Ảnh sản phẩm

Ảnh sản phẩm thuộc bản quyền Mitsubishi Electric, dùng cho mục đích học tập; nguồn (trang FASpec của Mitsubishi) ghi ở trang chi tiết từng model. Model chưa có ảnh hãng được liệt kê ở cuối lưới.

<ModuleGallery />

## Cách thêm module

1. Thêm một phần tử vào `docs/.vitepress/data/modules/qseries.ts` với `id`, `model`, `kind`, `role`, `keySpec`, `manual` và `page`.
2. Tạo trang chi tiết (hoặc thêm mục vào trang đã có) rồi trỏ trường `page` về đường dẫn đó.
3. Chạy `npm run check` và `BASE=/plc-docs/ npx vitepress build docs` để bắt liên kết chết trước khi đẩy lên.

`manual.doc` phải là một khoá đã có trong `docs/.vitepress/data/pdfDocs.ts`; nếu chưa có manual, khai báo mục đó với `status: 'planned'` thay vì đoán số liệu.
