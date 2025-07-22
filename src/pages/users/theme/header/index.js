import React, { useEffect, useState } from "react";
import {
  AiOutlineFacebook,
  AiOutlineMenu,
  AiOutlineShoppingCart,
  AiOutlineMail,
  AiOutlinePhone,
} from "react-icons/ai";
import {
  BiLogoMessenger,
  BiPhone,
  BiUser,
} from "react-icons/bi";
import { Link, useNavigate, useLocation} from "react-router-dom";
import logo from './logoHeader.png';
import logo1 from './logo1.webp';
import { ROUTERS } from "utils/router";
import { signOut } from "firebase/auth";
import { auth } from "../../../../firebase";
import "./style.scss";

const Header = () => {
  const navigate = useNavigate();
  const [isShowCategories, setShowCategories] = useState(true);
  const [isShowHumberger, setShowHumberger] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      setCurrentUser(JSON.parse(user));
    }
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.warn("Không thể đăng xuất Firebase:", error.message);
    }
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("role");
    setCurrentUser(null);
    navigate("/");
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };

  const menus = [
    { name: "Trang chủ", path: ROUTERS.USER.HOME },
     { name: "Đăng ký phòng khám", path: ROUTERS.USER.RegisterClinic },
    { name: "Xem phòng khám", path: ROUTERS.USER.ViewHomePages },
    { name: "Lịch sử đặt lịch", path: ROUTERS.USER.ViewHistoryBooking },
    { name: "Tải Ứng Dụng", path: ROUTERS.USER.DownloadApp },
  ];

  return (
    <>
      {/* Thanh trên cùng */}
      <div className="header_top">
        <div className="container">
          <div className="row">
            <div className="col-6 header_top_left">
              <img src={logo} alt="Logo" className="logo" />
              <ul>
                <li className="logo11">
                  <img src={logo1} alt="Logo1" className="logo1" />
                  Hệ thống phòng khám
                </li>
                <li><AiOutlineMail /> PetTrack@gmail.com</li>
                <li>Địa chỉ: 20/2 Đường 904, Quận 9, TP.HCM</li>
              </ul>
            </div>
            <div className="col-6 header_top_right">
              <ul>
                <li><Link to="https://www.facebook.com/phan.danh.minh.2025" className="icon"><AiOutlineFacebook /></Link></li>
                <li><Link to="https://www.facebook.com/messages/e2ee/t/6942009402530335" className="icon"><BiLogoMessenger /></Link></li>
                <li><Link to="" className="icon"><BiPhone /></Link></li>
                <li><Link to="" className="icon"><AiOutlineShoppingCart /></Link></li>
                <li>
                  {currentUser ? (
                    <span>
                      Xin chào, {currentUser.fullName} |{" "}
                      <span onClick={handleLogout} style={{ cursor: 'pointer', color: 'red' }}>
                        Đăng xuất
                      </span>
                    </span>
                  ) : (
                    <span>
                      <span onClick={() => navigate("/login")} style={{ cursor: "pointer", marginRight: 10 }}>
                        <BiUser /> Đăng nhập
                      </span>
                      |
                      <span onClick={() => navigate("/RegisterPage")} style={{ cursor: "pointer", marginLeft: 10 }}>
                        Đăng ký
                      </span>
                    </span>
                  )}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Phần tiêu đề */}
      <div className="color_header">
        <div className="container">
          <div className="row">
            <div className="col-xl-3 col-lg-3 col-md-3">
              <div className="header_logo"><h1>PETTRACK</h1></div>
            </div>
            <div className="col-xl-7 col-lg-7 col-md-7">
              <nav className="header_menu">
                <ul>
                  {menus?.map((menu, index) => (
                    <li
                       key={index}
                       className={location.pathname === menu.path ? "header_menu_active" : ""}
                     >
                       <Link to={menu.path}>{menu.name}</Link>
                     </li>
                  ))}
                </ul>
              </nav>
            </div>
            <div className="col-xl-2">
              <div className="header_cart">
                <ul>
                  <li><Link to="#"><AiOutlineShoppingCart /> <span className="sizecart">5</span></Link></li>
                </ul>
                <div className="listmenu">
                  <AiOutlineMenu onClick={() => setShowHumberger(true)} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Phần hero: tìm kiếm & danh mục */}
      <div className="container">
        <div className="row hero_categories_container">
          <div className="col-lg-3 hero_categories">
            <div className="hero_categories_all" onClick={() => setShowCategories(!isShowCategories)}>
              <AiOutlineMenu /> Danh mục dịch vụ
            </div>
            <ul className={isShowCategories ? "" : "hidden"}>
              <li><Link to="#">Tải Ứng DỤng</Link></li>
              <li><Link to="#">Xem Phòng Khám</Link></li>
            </ul>
          </div>
          <div className="col-lg-9 hero_search_container">
            <div className="hero_search">
              <div className="hero_search_form">
                <form>
                  <input type="text" placeholder="Bạn đang tìm gì?" />
                  <button type="submit">Tìm kiếm</button>
                </form>
              </div>
              <div className="hero_search_phone">
                <div className="hero_search_phone_icon"><AiOutlinePhone /></div>
                <div className="hero_search_phone_text">
                  <p>0363433416</p>
                  <span>Hỗ trợ 24/7</span>
                </div>
              </div>
            </div>
            <div className="hero_item">
              <div className="hero_text">
                <span>PETTRACK</span>
                <h2>Giúp bạn <br /> chăm sóc thú cưng tốt hơn</h2>
                <Link to="" className="primary-btn">Mua dịch vụ</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
