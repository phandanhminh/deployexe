import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./style.scss";

const ViewHomePages = () => {
  const [clinics, setClinics] = useState([]);

  useEffect(() => {
    const fetchClinics = async () => {
      try {
        const res = await axios.get("https://pettrack.onrender.com/api/public/clinics/approved");
        setClinics(res.data.data);
      } catch (error) {
        console.error("Không thể tải danh sách phòng khám đã duyệt", error);
      }
    };

    fetchClinics();
  }, []);

  return (
    <div className="clinic-list-container">
      <h2>Danh sách phòng khám đã duyệt</h2>
      <div className="clinic-grid">
        {Array.isArray(clinics) && clinics.map((clinic) => (
          <div key={clinic.id} className="clinic-card">
            <img
              src={clinic.bannerUrl || "/images/default-clinic.jpg"}
              alt="Hình ảnh phòng khám"
              className="clinic-banner"
            />
            <div className="clinic-info">
              <h3>{clinic.name}</h3>
              <p>{clinic.description}</p>
              <p><strong>Địa chỉ:</strong> {clinic.address}</p>
              <p><strong>SĐT:</strong> {clinic.phoneNumber}</p>
              <div className="view-details">
                <Link to={`/clinics/${clinic.id}`}>Xem chi tiết</Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewHomePages;
