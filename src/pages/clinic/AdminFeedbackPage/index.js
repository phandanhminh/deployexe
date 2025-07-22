import React, { useEffect, useState } from "react";
import axios from "axios";
import "./style.scss";

const ClinicFeedbackPage = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const response = await axios.get(
          "https://pettrack.onrender.com/api/Feedback/feedbacks",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setFeedbacks(response.data.data);
      } catch (error) {
        console.error("Lỗi khi tải feedback:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeedbacks();
  }, []);

  if (loading) return <p className="loading-text">Đang tải phản hồi...</p>;

  return (
    <div className="admin-feedback-page">
      <div className="feedback-header">
        <h2>📋 Quản lý Phản hồi người dùng</h2>
      </div>
      <div className="feedback-table-container">
        <table className="feedback-table">
          <thead>
            <tr>
              <th>👤 Họ tên</th>
              <th>💬 Bình luận</th>
              <th>📅 Ngày gửi</th>
            </tr>
          </thead>
          <tbody>
            {feedbacks.length > 0 ? (
              feedbacks.map((item) => (
                <tr key={item.id}>
                  <td>{item.fullName}</td>
                  <td>{item.comment}</td>
                  <td>
                    {new Date(item.createdTime).toLocaleString("vi-VN", {
                      hour: "2-digit",
                      minute: "2-digit",
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                    })}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3">Không có phản hồi nào.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ClinicFeedbackPage;
