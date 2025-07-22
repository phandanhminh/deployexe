import { memo } from "react";
import "./style.scss";
import thucung2 from "../../../assets/users/images/thucung/thucung2.jpg";
import thucung3 from "../../../assets/users/images/thucung/thucung3.jpg";
import thucung4 from "../../../assets/users/images/thucung/thucung4.jpg";
const HomePage = () => {
  return (
    <section className="home-section">
      <div className="home-row">
        <div className="home-image">
          <img src={thucung2} alt="Theo dõi vị trí thú cưng" />
        </div>
        <div className="home-text">
          <h2>Theo dõi vị trí thú cưng</h2>
          <p>PetTrack giúp bạn xác định vị trí thú cưng mọi lúc, mọi nơi với hệ thống GPS hiện đại, tránh thất lạc và mang lại sự an tâm mỗi ngày.</p>
        </div>
      </div>

      <div className="home-row reverse">
        <div className="home-text">
          <h2>Quản lý lịch chăm sóc</h2>
          <p>Theo dõi lịch tiêm phòng, tắm rửa, ăn uống và khám chữa bệnh cho thú cưng – tất cả trong tầm tay bạn.</p>
        </div>
        <div className="home-image">
          <img src={thucung3} alt="Chăm sóc thú cưng thông minh" />
        </div>
      </div>

      <div className="home-row">
        <div className="home-image">
          <img src={thucung4} alt="Kết nối và chia sẻ" />
        </div>
        <div className="home-text">
          <h2>Kết nối & Chia sẻ</h2>
          <p>Kết nối với cộng đồng yêu thú cưng, chia sẻ những khoảnh khắc đáng yêu và nhận tư vấn từ bác sĩ thú y trực tuyến.</p>
        </div>
      </div>
    </section>
  );
};

export default memo(HomePage);
