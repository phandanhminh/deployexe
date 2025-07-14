import React, { useState } from "react";
import axios from "axios";
import { memo } from "react";
import "react-multi-carousel/lib/styles.css";
import "./style.scss";

const ServicePage = () => {
  const [clinic, setClinic] = useState({
    name: "",
    address: "",
    phoneNumber: "",
    slogan: "",
    description: "",
    bannerUrl: "",
    schedules: [
      { dayOfWeek: 0, openTime: "", closeTime: "" }
    ],
    servicePackages: [
      { name: "", description: "", price: 0 }
    ]
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setClinic({ ...clinic, [e.target.name]: e.target.value });
  };

  const handleScheduleChange = (index, field, value) => {
    const newSchedules = [...clinic.schedules];
    newSchedules[index][field] = value;
    setClinic({ ...clinic, schedules: newSchedules });
  };

  const handleServicePackageChange = (index, field, value) => {
    const newPackages = [...clinic.servicePackages];
    newPackages[index][field] = field === "price" ? Number(value) : value;
    setClinic({ ...clinic, servicePackages: newPackages });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const response = await axios.post(
        "https://pettrack.onrender.com/api/user/clinics",
        clinic
      );
      console.log("✅ Phản hồi:", response.data);
      setMessage("🎉 Tạo phòng khám thành công!");
    } catch (error) {
      console.error("❌ Lỗi:", error);
      setMessage("❌ Có lỗi xảy ra. Vui lòng thử lại!");
    }
  };

  return (
    <div className="service-page">
      <h1>Đăng ký phòng khám</h1>
      <form onSubmit={handleSubmit} style={{ maxWidth: "600px" }}>
        <label>Tên phòng khám:</label>
        <input name="name" value={clinic.name} onChange={handleChange} required />

        <label>Địa chỉ:</label>
        <input name="address" value={clinic.address} onChange={handleChange} required />

        <label>Số điện thoại:</label>
        <input name="phoneNumber" value={clinic.phoneNumber} onChange={handleChange} required />

        <label>Khẩu hiệu:</label>
        <input name="slogan" value={clinic.slogan} onChange={handleChange} />

        <label>Mô tả:</label>
        <textarea name="description" value={clinic.description} onChange={handleChange} />

        <label>URL ảnh banner:</label>
        <input name="bannerUrl" value={clinic.bannerUrl} onChange={handleChange} />

        <h3>Lịch làm việc</h3>
        {clinic.schedules.map((schedule, index) => (
          <div key={index}>
            <label>Thứ trong tuần (0: CN - 6: Thứ 7):</label>
            <input
              type="number"
              min="0"
              max="6"
              value={schedule.dayOfWeek}
              onChange={(e) => handleScheduleChange(index, "dayOfWeek", Number(e.target.value))}
            />
            <label>Giờ mở cửa:</label>
            <input
              type="time"
              value={schedule.openTime}
              onChange={(e) => handleScheduleChange(index, "openTime", e.target.value)}
            />
            <label>Giờ đóng cửa:</label>
            <input
              type="time"
              value={schedule.closeTime}
              onChange={(e) => handleScheduleChange(index, "closeTime", e.target.value)}
            />
          </div>
        ))}

        <h3>Gói dịch vụ</h3>
        {clinic.servicePackages.map((pkg, index) => (
          <div key={index}>
            <label>Tên gói dịch vụ:</label>
            <input
              value={pkg.name}
              onChange={(e) => handleServicePackageChange(index, "name", e.target.value)}
            />
            <label>Mô tả:</label>
            <input
              value={pkg.description}
              onChange={(e) => handleServicePackageChange(index, "description", e.target.value)}
            />
            <label>Giá:</label>
            <input
              type="number"
              value={pkg.price}
              onChange={(e) => handleServicePackageChange(index, "price", e.target.value)}
            />
          </div>
        ))}

        <button type="submit" style={{ marginTop: "10px" }}>Tạo phòng khám</button>
      </form>

      {message && (
        <p style={{ color: message.includes("thành công") ? "green" : "red" }}>
          {message}
        </p>
      )}
    </div>
  );
};

export default memo(ServicePage);
