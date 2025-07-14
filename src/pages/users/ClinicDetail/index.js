import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./style.scss";

const ClinicDetail = () => {
  const { id } = useParams();
  const [clinic, setClinic] = useState(null);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [appointmentDate, setAppointmentDate] = useState("");
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchClinic = async () => {
      try {
        const res = await axios.get(`https://pettrack.onrender.com/api/public/clinics/${id}`);
        setClinic(res.data.data);
      } catch (err) {
        console.error("Không thể lấy thông tin phòng khám", err);
      }
    };
    fetchClinic();
  }, [id]);

  const openModal = (pkg) => {
    setSelectedPackage(pkg);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedPackage(null);
    setAppointmentDate("");
  };

  const handleBooking = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.warn("⚠️ Vui lòng đăng nhập trước khi đặt lịch.");
        return;
      }

      await axios.post(
        "http://localhost:5195/api/Booking",
        {
          clinicId: clinic.id,
          servicePackageId: selectedPackage.id,
          appointmentDate: `${appointmentDate}T00:00:00`,
          price: selectedPackage.price,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      toast.success("🎉 Đặt lịch thành công!");
      closeModal();
    } catch (error) {
      console.error("Đặt lịch thất bại:", error);
      toast.error("❌ Đặt lịch thất bại. Vui lòng thử lại.");
    }
  };

  if (!clinic) return <div className="clinic-detail-loading">Đang tải thông tin...</div>;

  return (
    <div className="clinic-detail-container">
      <div className="clinic-detail-card">
        <img
          src={clinic.bannerUrl || "https://via.placeholder.com/800x200.png?text=No+Image"}
          alt="Ảnh phòng khám"
          className="clinic-detail-banner"
        />
        <div className="clinic-detail-info">
          <h1>{clinic.name}</h1>
          <p className="clinic-slogan">"{clinic.slogan}"</p>
          <p><strong>Địa chỉ:</strong> {clinic.address}</p>
          <p><strong>Số điện thoại:</strong> {clinic.phoneNumber}</p>
          <p><strong>Mô tả:</strong> {clinic.description}</p>

          <div className="clinic-packages">
            <h3>Gói dịch vụ</h3>
            <ul>
              {clinic.servicePackages.map((pkg) => (
                <li key={pkg.id}>
                  <strong>{pkg.name}</strong>: {pkg.description} ({pkg.price} VNĐ)
                  <button className="btn-booking" onClick={() => openModal(pkg)}>
                    Đặt lịch
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="clinic-schedules">
            <h3>Lịch làm việc</h3>
            <ul>
              {clinic.schedules.map((schedule, index) => (
                <li key={index}>
                  Thứ {schedule.dayOfWeek}: {schedule.openTime} - {schedule.closeTime}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Đặt lịch gói: {selectedPackage.name}</h2>
            <input
              type="date"
              value={appointmentDate}
              onChange={(e) => setAppointmentDate(e.target.value)}
            />
            <div className="modal-actions">
              <button onClick={handleBooking}>Xác nhận</button>
              <button onClick={closeModal} className="cancel-btn">Hủy</button>
            </div>
          </div>
        </div>
      )}

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default ClinicDetail;
