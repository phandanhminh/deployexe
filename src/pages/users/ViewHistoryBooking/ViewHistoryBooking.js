import React, { useEffect, useState } from "react";
import axios from "axios";
import "./ViewHistoryBooking.scss";

const ViewHistoryBooking = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await axios.get("https://pettrack.onrender.com/api/Booking", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          params: {
            pageIndex: 1,
            pageSize: 10,
            userId: JSON.parse(localStorage.getItem("user")).id,
          },
        });
        setBookings(res.data.data.items);
      } catch (error) {
        console.error("Lỗi khi lấy lịch sử đặt lịch:", error);
      }
    };

    fetchBookings();
  }, []);

  return (
    <div className="view-history-booking">
      <h2>Lịch sử đặt lịch</h2>

      {bookings.length === 0 ? (
        <div className="no-booking">Bạn chưa có lịch sử đặt lịch nào.</div>
      ) : (
        <div className="booking-list">
          {bookings.map((item, index) => (
            <div key={index} className="booking-card">
              <div className="booking-header">
                <h4>{item.clinicName || "Tên phòng khám không xác định"}</h4>
                <span className={`status status-${item.status?.toLowerCase()}`}>
                  {item.status === "PENDING" && "Đang chờ"}
                  {item.status === "APPROVED" && "Đã duyệt"}
                  {item.status === "REJECTED" && "Bị từ chối"}
                  {!["PENDING", "APPROVED", "REJECTED"].includes(item.status) && item.status}
                </span>
              </div>
              <p><strong>Gói dịch vụ:</strong> {item.servicePackageName}</p>
              <p><strong>Ngày hẹn:</strong> {new Date(item.appointmentDate).toLocaleString("vi-VN")}</p>
              <p><strong>Giá:</strong> {item.price.toLocaleString("vi-VN", { style: "currency", currency: "VND" })}</p>
              <p><strong>Ngày tạo:</strong> {new Date(item.createdTime).toLocaleString("vi-VN")}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ViewHistoryBooking;
