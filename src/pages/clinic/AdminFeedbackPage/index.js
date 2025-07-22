import React, { useEffect, useState } from "react";
import axios from "axios";
import "./style.scss";
import avatar from "../../../assets/users/images/thucung/a.png"; // ảnh avatar dùng chung

const FeedbackList = () => {
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const response = await axios.get("https://pettrack.onrender.com/api/Feedback/feedbacks", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setFeedbacks(response.data.data);
      } catch (error) {
        console.error("Failed to fetch feedbacks", error);
      }
    };

    fetchFeedbacks();
  }, []);

  return (
    <div className="feedback-container">
      <h2 className="feedback-title">📣 Phản hồi người dùng</h2>
      <div className="feedback-grid">
        {feedbacks.map((item) => (
          <div key={item.id} className="feedback-card">
            <img className="feedback-avatar" src={avatar} alt="avatar" />
            <div className="feedback-name">{item.fullName}</div>
            <div className="feedback-comment">"{item.comment}"</div>
            <div className="feedback-time">
              {new Date(item.createdTime).toLocaleString("vi-VN")}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeedbackList;
