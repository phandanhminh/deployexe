import React from "react";
import "./style.scss"; // style tách riêng

const DownloadApp = () => {
  return (
    <div className="download-page">
  <div className="divider-line" /> {/* ✅ Đường kẻ thêm vào đây */}
  
  <div className="card">
    <h1>🐾 Ứng dụng chăm sóc thú cưng</h1>
    <p>Quản lý lịch tiêm, chăm sóc, thức ăn và sức khỏe cho thú cưng của bạn.</p>

    <img
      src="/logoHeader.png"
      alt="Pet Care App"
      className="app-image"
    />

    <a href="/petcare-app.apk.rar" download>
      <button className="download-btn">⬇️ Tải Ứng Dụng Chăm Sóc Thú Cưng</button>
    </a>
  </div>
</div>
  );
};

export default DownloadApp;
