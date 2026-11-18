---
title: Danh mục module MELSEC Q
family: q
module: q-series
status: draft
source: SH-080483, SH-080042, SH-080055, SH-080054, SH-080036
---

# Danh mục module MELSEC Q

<ModuleMatrix />

Danh mục này gom các module Q-series mà cẩm nang có thể mô tả trực tiếp từ manual hãng đang lưu trên đĩa, xếp theo nhóm chức năng: CPU, nguồn, base, vào/ra số, tương tự, đếm xung, truyền thông và chuyển động. Mỗi dòng nêu một điểm chính đáng nhớ kèm đơn vị, và cột Trang trỏ tới trang chi tiết tương ứng. Dòng gắn nhãn "dự kiến" là module chưa xác minh được thông số từ manual trên đĩa, nên chỉ giữ mô tả định tính.

## Cách thêm module

1. Thêm một phần tử vào `docs/.vitepress/data/modules/qseries.ts` với `id`, `model`, `kind`, `role`, `keySpec`, `manual` và `page`.
2. Tạo trang chi tiết (hoặc thêm mục vào trang đã có) rồi trỏ trường `page` về đường dẫn đó.
3. Chạy `npm run check` và `BASE=/plc-docs/ npx vitepress build docs` để bắt liên kết chết trước khi đẩy lên.

`manual.doc` phải là một khoá đã có trong `docs/.vitepress/data/pdfDocs.ts`; nếu chưa có manual, khai báo mục đó với `status: 'planned'` thay vì đoán số liệu.
