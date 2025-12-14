
# NuoiToi — Static Site v2 (GitHub Pages)

- Trang chủ thiết kế theo yêu cầu, **không dùng ảnh mẫu**; có các section: Lý do, Cam kết, So sánh, Donate, Kế hoạch chi tiêu, **Video YouTube** (link bạn cho).
- **Popup sau 30s**: Random **1–10 triệu**; khi **đóng**, số tiền được **cộng vào "Tiền vào"** và cập nhật Số dư (trong phiên). Mở trang **Sao kê** sẽ thấy 1 dòng IN thêm (demo) và có thể **Tải CSV**.
- Giao diện responsive cho web/mobile, có thanh điều hướng đáy trên mobile.

## Deploy
1. Upload toàn bộ lên repo GitHub (root có `index.html`).  
2. **Settings → Pages → Deploy from a branch**, chọn `main` + `/` (root).  
3. Mở `https://<username>.github.io/<repo>/`.

## Tuỳ chỉnh
- Ảnh QR: thay `assets/vietqr.png` bằng ảnh của bạn.
- Nội dung text: sửa trực tiếp trong `index.html`.
- Nếu muốn popup hiển thị lại: xoá `sessionStorage` (F12 → Application → Session Storage) hoặc mở tab ẩn.
