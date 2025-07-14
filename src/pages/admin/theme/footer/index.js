import React, { memo } from "react";
import "./style.scss";

const Footer = () => {
  return (
    <footer className="admin-footer">
      <div className="admin-footer__container">
        <p>© 2025 Cổng thông tin quản trị PETTRACK. Mọi quyền được bảo lưu.</p>
      </div>
    </footer>
  );
};

export default memo(Footer);