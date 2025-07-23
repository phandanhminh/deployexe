// components/SummaryCard.jsx
import React from "react";
import "./style.scss";

const SummaryCard = ({ title, value, change, color, icon }) => {
  return (
    <div className="summary-card">
      <div className="card-header">
        <div className="card-title">{icon} {title}</div>
        <div className="card-value">{value.toLocaleString()} VND</div>
      </div>
      <div className={`card-change ${change >= 0 ? "up" : "down"}`}>
        {change >= 0 ? "▲" : "▼"} {Math.abs(change)}%
      </div>
    </div>
  );
};

export default SummaryCard;
