# Đóng góp nội dung

## Quy tắc số liệu

- Mọi địa chỉ buffer memory, dải giá trị và giá trị mặc định phải ghi nguồn `SH-080058` kèm mục/tra bảng trong trường `src` của dòng dữ liệu. Địa chỉ chưa xác minh phải để dạng ký hiệu `U<base>\G<addr>`, không tự thêm chữ số.
- Số liệu dùng chung chỉ định nghĩa một lần trong `docs/.vitepress/data/modules/*.ts`; trang chỉ render qua component, không chép lại số.
- Không dán nguyên trang PDF của hướng dẫn vào repo. Khi cần dẫn, liên kết tới URL chính thức của Mitsubishi Electric.
- `status: verified` chỉ dùng khi có ngày đo thực tế và trang chứa `<VerifiedOn ... date="YYYY-MM-DD">`. Thiếu ngày thì giữ `draft` hoặc `reviewed`.

## Thêm một dòng PLC (6 bước)

1. Thêm entry vào `docs/.vitepress/data/families.ts` với `status: 'planned'`.
2. Tạo `docs/<id>/index.md` và `docs/en/<id>/index.md`, frontmatter có `family: <id>`.
3. (Tuỳ chọn) Thêm `docs/.vitepress/data/modules/<id>-*.ts` cho số liệu module, mọi dòng có `src`.
4. Thêm `ModuleDef` vào `docs/.vitepress/data/modules.ts` — sidebar tự sinh, không sửa tay.
5. Bổ sung khoá hỗ trợ trong `docs/.vitepress/data/capabilities.ts` (chỉ dùng family id đã có).
6. Chạy `npm run check && npm run build`, sửa hết lỗi rồi đổi `status` sang `active`.

Chủ đề dùng chung cho nhiều dòng PLC đặt trong `docs/concepts/`.
