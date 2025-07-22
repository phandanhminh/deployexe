import React, { useEffect, useState } from "react";
import axios from "axios";
import "./style.scss"; // nếu cần style riêng

const AdminFeedbackPage = () => {
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

  if (loading) return <p>Đang tải phản hồi...</p>;

  return (
    <div className="admin-feedback-page">
      <h2>Quản lý Phản hồi người dùng</h2>
      <table>
        <thead>
          <tr>
            <th>Họ tên</th>
            <th>Bình luận</th>
            <th>Ngày gửi</th>
          </tr>
        </thead>
        <tbody>
          {feedbacks.length > 0 ? (
            feedbacks.map((item) => (
              <tr key={item.id}>
                <td>{item.fullName}</td>
                <td>{item.comment}</td>
                <td>{new Date(item.createdTime).toLocaleString()}</td>
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
  );
};

export default AdminFeedbackPage;
