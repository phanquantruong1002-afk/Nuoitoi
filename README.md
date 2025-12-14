
# NuoiToi — Polished Mobile‑First Static Site

- Không dùng React hay UI libs → chạy ổn trên GitHub Pages.
- Responsive **mobile + desktop** (có bottom bar trên mobile).
- **Popup sau 30s** random **1–10 triệu**; **đóng** popup sẽ cộng vào **Tiền vào** và cập nhật Số dư.
- Trang **Sao kê** tự thêm dòng IN theo số tiền popup (trong phiên), có **Tải CSV** (revoking URL có delay để tránh lỗi).
- Có embed **YouTube** ở cuối trang chủ.

## Deploy (GitHub Pages)
1. Upload toàn bộ lên repo GitHub.
2. Settings → Pages → Deploy from a branch → `main` + `/ (root)`.
3. Mở: `https://<username>.github.io/<repo>/index.html`.

## Tùy chỉnh
- Đổi ảnh QR: thay `assets/vietqr.png`.
- Đổi text: sửa `.html` tương ứng.
- Đổi màu: `assets/style.css`.
