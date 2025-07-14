import React, { useEffect, useState } from "react";
import axios from "axios";
import "./style.scss";

const ViewBookingSchedule = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchAllBookings = async () => {
      try {
        const response = await axios.get(
          "https://pettrack.onrender.com/api/Booking?pageIndex=1&pageSize=100",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setBookings(response.data.data.items);
      } catch (error) {
        console.error("❌ Lỗi khi lấy tất cả lịch hẹn:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllBookings();
  }, []);

  return (
    <div className="booking-schedule-container">
      <h2>📋 Danh sách tất cả lịch hẹn</h2>

      {loading ? (
        <div className="loading">⏳ Đang tải dữ liệu...</div>
      ) : bookings.length === 0 ? (
        <div className="no-data">Không có dữ liệu lịch hẹn.</div>
      ) : (
        <table className="booking-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Người dùng</th>
              <th>Gói dịch vụ</th>
              <th>Ngày hẹn</th>
              <th>Giá</th>
              <th>Trạng thái</th>
              <th>Ngày tạo</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{item.userFullName}</td>
                <td>{item.servicePackageName}</td>
                <td>{new Date(item.appointmentDate).toLocaleString("vi-VN")}</td>
                <td>{item.price.toLocaleString("vi-VN", { style: "currency", currency: "VND" })}</td>
                <td>
                  {item.status === "PENDING" && "Đang chờ"}
                  {item.status === "APPROVED" && "Đã duyệt"}
                  {item.status === "REJECTED" && "Từ chối"}
                  {!["PENDING", "APPROVED", "REJECTED"].includes(item.status) && item.status}
                </td>
                <td>{new Date(item.createdTime).toLocaleString("vi-VN")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ViewBookingSchedule;
