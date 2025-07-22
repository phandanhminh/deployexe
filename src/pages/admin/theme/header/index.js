import React, { memo, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineLogout, AiOutlineUser } from "react-icons/ai";
import { ROUTERS } from "utils/router";
import { signOut } from "firebase/auth";
import { auth } from "../../../../firebase";
import "./style.scss";

const Header = () => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const user = localStorage.getItem("user");
    const role = localStorage.getItem("role");
    if (user && role === "Admin") {
      setCurrentUser(JSON.parse(user));
    }
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      localStorage.clear();
      navigate("/");
    } catch (error) {
      console.error("Đăng xuất thất bại:", error);
    }
  };

  return (
    <header className="admin-header">
      <div className="admin-header__container">
        <div className="admin-header__left">
          <h1 className="admin-header__logo">🛠️ Quản trị hệ thống</h1>
          <nav className="admin-header__nav">
            <Link to="/admin/PendingClinicsPage">Phòng khám chờ duyệt</Link>
            <Link to="/admin/DetailAdmin">Quản lý người dùng</Link>
            <Link to="/admin/AdminDashboard">Quản trị người dùng</Link>
            <Link to="/admin/AdminFeedback">Đánh Giá Của Người Dùng</Link>
          </nav>
        </div>
        <div className="admin-header__right">
          {currentUser ? (
            <>
              <div className="admin-header__user">
                <AiOutlineUser className="user-icon" />
                <span>{currentUser.fullName}</span>
              </div>
              <button onClick={handleLogout} className="logout-btn">
                <AiOutlineLogout />
                <span>Đăng xuất</span>
              </button>
            </>
          ) : (
            <span>Chưa đăng nhập</span>
          )}
        </div>
      </div>
    </header>
  );
};

export default memo(Header);
