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
          {/* Thông tin liên hệ */}
          <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12">
            <div className="footer_about">
              <h1 className="footer_about_logo">PETTRACK</h1>
              <ul>
                <li>ĐỊA CHỈ: 20/2 Đường 904, Quận 9, TP. Hồ Chí Minh</li>
                <li>ĐIỆN THOẠI: 0363433416</li>
                <li>EMAIL: PetTrack@gmail.com</li>
              </ul>
            </div>
          </div>

          {/* Liên kết nhanh */}
          <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
            <div className="footer_widget">
              <h6>CỬA HÀNG</h6>
              <ul>
                <li>
                  <Link to="">Liên hệ</Link>
                </li>
                <li>
                  <Link to="">Về chúng tôi</Link>
                </li>
                <li>
                  <Link to="">Sản phẩm</Link>
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

          {/* Mạng xã hội */}
          <div className="col-lg-3 col-md-12 col-sm-12 col-xs-12">
            <div className="footer_widget">
              <h6>Khuyến mãi & Ưu đãi khách hàng</h6>
              <p>Đăng ký nhận thông tin tại đây</p>
              <form action="#">
                <div className="footer_widget_social">
                  <div>
                    <a href="https://www.facebook.com/profile.php?id=61560052164888" target="_blank" rel="noopener noreferrer">
                      <AiOutlineFacebook />
                    </a>
                  </div>
                  <div><AiOutlineInstagram /></div>
                  <div><AiOutlineLinkedin /></div>
                  <div><BiPhone /></div>
                  <div><BiLogoYoutube /></div>
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
