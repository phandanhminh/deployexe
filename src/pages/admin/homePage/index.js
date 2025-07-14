import "react-multi-carousel/lib/styles.css";
import "./style.scss";
import thucung2 from "../../../assets/users/images/thucung/thucung2.jpg";

const HomeAdminPage = () => {
  return (
    <section className="home-section">
      <div className="home-row">
        <div className="home-image">
          <img src={thucung2} alt="Theo dõi vị trí thú cưng" />
        </div>
        <div className="home-text">
          <h2>Theo dõi vị trí thú cưng của bạn</h2>
          <p>
            PetTrack giúp bạn định vị thú cưng mọi lúc, mọi nơi với hệ thống GPS hiện đại, tránh thất lạc và mang lại sự yên tâm mỗi ngày.
          </p>
        </div>
      </div>
    </section>
  );
};

export default HomeAdminPage;
