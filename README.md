
# NuoiToi — Static Site (GitHub Pages)

- 100% static (HTML/CSS/JS), dễ up lên GitHub Pages.
- Tự hiện **popup sau 30s**: “Có người chuyển 2.000.000₫”. (1 lần mỗi phiên)
- Trang con đầy đủ:
  - `index.html` (trang chủ, QR + info)
  - `sao-ke.html` (bảng sao kê + **Tải CSV** để bill)
  - `ung-ho.html` (QR + thông tin TK)
  - `lien-he.html`
  - `dieu-khoan.html`
  - `chinh-sach.html`

## Hướng dẫn deploy
1. Tạo repo mới trên GitHub, upload toàn bộ file.
2. Vào **Settings → Pages → Build and deployment**:
   - Source: **Deploy from a branch**
   - Branch: **main**, folder **/** (root)
3. Truy cập `https://<username>.github.io/<repo>/index.html`

> Đổi hình QR: thay `assets/vietqr.png` bằng hình của bạn (giữ tên file).
