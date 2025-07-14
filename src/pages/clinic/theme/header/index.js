import React, { memo, useEffect, useState } from "react";
import {
  AiOutlineFacebook,
  AiOutlineInstagram,
  AiOutlineLinkedin,
  AiOutlineMail,
  AiOutlineMenu,
  AiOutlineShoppingCart,
  AiOutlinePhone,
} from "react-icons/ai";
import {
  BiLogoMessenger,
  BiLogoYoutube,
  BiPhone,
  BiUser,
} from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
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
  const [isShowLogin, setIsShowLogin] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      const parsedUser = JSON.parse(user);
      setCurrentUser(parsedUser);
    }
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      setCurrentUser(null);
      navigate("/");
    } catch (error) {
      console.error("Đăng xuất thất bại:", error);
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };

  const menus = currentUser?.role === "Clinic" ? [
    { name: "Lịch hẹn", path: "/clinic/ViewBookingSchedule" },
    { name: "Quản lý lịch làm việc", path: "/clinic/ScheduleManagement" },
    { name: "Gói dịch vụ", path: "/clinic/packages" },
    { name: "Rút tiền", path: "/clinic/withdraw" },
  ] : [];

  return (
    <>
      {/* ======= Menu Hamburger ======= */}
      <div className={`humberger_menu_overlay${isShowHumberger ? " active" : ""}`} onClick={() => setShowHumberger(false)} />
      <div className={`humberger_menu_wrapper${isShowHumberger ? " show" : ""}`}>
        <div className="header_logo"><h1>PETTRACK</h1></div>
        <div className="humberger_menu_cart">
          <div className="header_cart_price">Giỏ hàng: <span>{formatPrice(100)}</span></div>
        </div>
        <div className="humberger_menu_widget">
          <div className="header_top_right_auth">
            {currentUser ? (
              <span>Xin chào, {currentUser.fullName} | <span onClick={handleLogout} style={{ cursor: 'pointer', color: 'red' }}>Đăng xuất</span></span>
            ) : (
              <span onClick={() => setIsShowLogin(true)} style={{ cursor: 'pointer' }}>
                <BiUser /> Đăng nhập
              </span>
            )}
          </div>
        </div>
        <div className="humberger_menu_nav1"><ul><li><Link to={"/"}>Thông tin tài khoản</Link></li></ul></div>
        <div className="humberger_menu_nav"><ul><li><Link to={"/"}>Liên hệ</Link></li></ul></div>
        <div className="header_top_right_social">
          <Link to="https://www.facebook.com/profile.php?id=61560052164888"><AiOutlineFacebook /></Link>
          <Link to="#"><AiOutlineInstagram /></Link>
          <Link to="#"><AiOutlineLinkedin /></Link>
          <Link to="#"><BiLogoYoutube /></Link>
          <Link to="https://www.facebook.com/messages/t/325097017352199" className="icon"><BiLogoMessenger /></Link>
        </div>
        <div className="humberger_menu_contact">
          <ul>
            <li><i className="fa fa-envelope">PetTrack@gmail.com</i></li>
            <li>Miễn phí giao hàng từ {formatPrice(200)}</li>
          </ul>
        </div>
      </div>

      {/* ======= Header Top ======= */}
      <div className="header_top">
        <div className="container">
          <div className="row">
            <div className="col-6 header_top_left">
              <img src={logo} alt="Logo" className="logo" />
              <ul>
                <li className="logo11">
                  <img src={logo1} alt="Logo1" className="logo1" />
                  Hệ thống Showroom
                </li>
                <li><AiOutlineMail /> PetTrack@gmail.com</li>
                <li>Địa chỉ: 20/2 Đường 904, Quận 9, TP. Hồ Chí Minh</li>
              </ul>
            </div>
            <div className="col-6 header_top_right">
              <ul>
                <li><Link to="https://www.facebook.com/phan.danh.minh.2025" className="icon"><AiOutlineFacebook /></Link></li>
                <li><Link to="https://www.facebook.com/messages/e2ee/t/6942009402530335" className="icon"><BiLogoMessenger /></Link></li>
                <li><Link to="#" className="icon"><BiPhone /></Link></li>
                <li><Link to="#" className="icon"><AiOutlineShoppingCart /></Link></li>
                <li>
                  {currentUser ? (
                    <span>
                      Xin chào, {currentUser.fullName} |{" "}
                      <span onClick={handleLogout} style={{ cursor: 'pointer', color: 'red' }}>
                        Đăng xuất
                      </span>
                    </span>
                  ) : (
                    <span onClick={() => setIsShowLogin(true)} style={{ cursor: 'pointer' }}>
                      <BiUser /> Đăng nhập
                    </span>
                  )}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* ======= Header Chính ======= */}
      <div className="color_header">
        <div className="container">
          <div className="row">
            <div className="col-xl-3">
              <div className="header_logo"><h1>PETTRACK</h1></div>
            </div>
            <div className="col-xl-6">
              <nav className="header_menu">
                <ul>
                  {menus?.map((menu, index) => (
                    <li key={index} className={index === 0 ? "header_menu1" : ""}>
                      <Link to={menu.path}>{menu.name}</Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
            <div className="col-lg-3">
              <div className="header_cart">
                {currentUser?.role === "Clinic" ? null : (
                  <>
                    <div className="header_cart_price"><span>{formatPrice(1000)}</span></div>
                    <ul>
                      <li><Link to="#"><AiOutlineShoppingCart /> <span className="sizecart">5</span></Link></li>
                    </ul>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default memo(Header);
