import { memo } from "react";
import "./style.scss";
import { Link } from "react-router-dom";
import { AiOutlineFacebook, AiOutlineInstagram, AiOutlineLinkedin } from "react-icons/ai";
import { BiLogoYoutube, BiPhone } from "react-icons/bi";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="row">
          {/* Cột 1: Giới thiệu */}
          <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12">
            <div className="footer_about">
              <h1 className="footer_about_logo">PETTRACK</h1>
              <ul>
                <li><strong>Địa chỉ:</strong> 20/2 Đường 904, Quận 9, TP.HCM</li>
                <li><strong>Điện thoại:</strong> 0363433416</li>
                <li><strong>Email:</strong> PetTrack@gmail.com</li>
              </ul>
            </div>
          </div>

          {/* Cột 2: Liên kết */}
          <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
            <div className="footer_widget">
              <h6>HỆ THỐNG CỬA HÀNG</h6>
              <ul>
                <li>
                  <Link to="">Liên hệ</Link>
                </li>
                <li>
                  <Link to="">Thông tin về chúng tôi</Link>
                </li>
                <li>
                  <Link to="">Sản phẩm của chúng tôi</Link>
                </li>
              </ul>
              <ul>
                <li>
                  <Link to="">Thông tin tài khoản</Link>
                </li>
                <li>
                  <Link to="">Giỏ hàng của bạn</Link>
                </li>
                <li>
                  <Link to="">Danh sách yêu thích</Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Cột 3: Khuyến mãi và mạng xã hội */}
          <div className="col-lg-3 col-md-12 col-sm-12 col-xs-12">
            <div className="footer_widget">
              <h6>Khuyến mãi & Ưu đãi khách hàng</h6>
              <p>Đăng ký để nhận thông tin tại đây</p>
              <form action="#">
                <div className="footer_widget_social">
                  <Link to="https://www.facebook.com/profile.php?id=61560052164888">
                    <AiOutlineFacebook />
                  </Link>
                  <Link to="#">
                    <AiOutlineInstagram />
                  </Link>
                  <Link to="#">
                    <AiOutlineLinkedin />
                  </Link>
                  <Link to="#">
                    <BiPhone />
                  </Link>
                  <Link to="#">
                    <BiLogoYoutube />
                  </Link>
                </div>
              </form>
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default memo(Footer);
