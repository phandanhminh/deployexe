import React, { useState } from "react";
import axios from "axios";
import "./style.scss";

const RegisterClinic = () => {
  const [form, setForm] = useState({
    name: "",
    address: "",
    phoneNumber: "",
    slogan: "",
    description: "",
    bannerUrl: "https://via.placeholder.com/800x200.png?text=Clinic+Banner",
    schedules: [{ dayOfWeek: 1, openTime: "08:00", closeTime: "17:00" }],
    servicePackages: [{ name: "", description: "", price: 0 }],
  });

  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    // ✅ VALIDATION
    const price = form.servicePackages[0].price;
    const phone = form.phoneNumber;
    const name = form.name;

    if (price < 10) {
      setError("💰 Giá gói dịch vụ phải ít nhất là 10.");
      return;
    }

    if (/[a-zA-Z]/.test(phone) || phone.trim() === "") {
      setError("📞 Số điện thoại chỉ được chứa chữ số.");
      return;
    }

    if (/^\d+$/.test(name)) {
      setError("🏥 Tên phòng khám không được chỉ là số.");
      return;
    }

    setError(""); // Xóa lỗi cũ

    const formWithFormattedTime = {
      ...form,
      schedules: form.schedules.map((s) => ({
        ...s,
        openTime: s.openTime + ":00",
        closeTime: s.closeTime + ":00",
      })),
    };

    try {
      const response = await axios.post(
        "https://pettrack.onrender.com/api/user/clinics",
        formWithFormattedTime,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setShowSuccess(true);
      console.log(response.data);
    } catch (err) {
      console.error("❌ Lỗi gửi đăng ký:", err.response?.data || err);
      alert("❌ Đăng ký thất bại!");
    }
  };

  return (
    <div className="clinicForm">
      <h2>Đăng ký phòng khám</h2>
      <img src={form.bannerUrl} alt="Ảnh banner" className="banner" />

      {showSuccess && (
        <div className="success-popup">
          <div className="popup-content">
            <h3>🎉 Gửi đăng ký phòng khám thành công!</h3>
            <p>Vui lòng chờ quản trị viên phê duyệt.</p>
            <button onClick={() => setShowSuccess(false)}>OK</button>
          </div>
        </div>
      )}

      {error && (
        <div className="error-popup">
          <div className="popup-content">
            <h4>⚠️ Lỗi xác thực</h4>
            <p>{error}</p>
            <button onClick={() => setError("")}>OK</button>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Tên phòng khám" onChange={handleChange} required />
        <input name="address" placeholder="Địa chỉ" onChange={handleChange} required />
        <input name="phoneNumber" placeholder="Số điện thoại" onChange={handleChange} required />
        <input name="slogan" placeholder="Khẩu hiệu" onChange={handleChange} />
        <input name="description" placeholder="Mô tả" onChange={handleChange} />
        <input name="bannerUrl" placeholder="Đường dẫn ảnh banner (không bắt buộc)" onChange={handleChange} />

        <h4>Lịch làm việc</h4>
        <div className="scheduleRow">
          <input
            type="number"
            min={0}
            max={6}
            value={form.schedules[0].dayOfWeek}
            onChange={(e) =>
              setForm((prev) => ({
                ...prev,
                schedules: [{ ...prev.schedules[0], dayOfWeek: Number(e.target.value) }],
              }))
            }
          />
          <input
            type="time"
            value={form.schedules[0].openTime}
            onChange={(e) =>
              setForm((prev) => ({
                ...prev,
                schedules: [{ ...prev.schedules[0], openTime: e.target.value }],
              }))
            }
          />
          <input
            type="time"
            value={form.schedules[0].closeTime}
            onChange={(e) =>
              setForm((prev) => ({
                ...prev,
                schedules: [{ ...prev.schedules[0], closeTime: e.target.value }],
              }))
            }
          />
        </div>

        <h4>Gói dịch vụ</h4>
        <div className="serviceRow">
          <input
            placeholder="Tên gói"
            value={form.servicePackages[0].name}
            onChange={(e) =>
              setForm((prev) => ({
                ...prev,
                servicePackages: [{ ...prev.servicePackages[0], name: e.target.value }],
              }))
            }
          />
          <input
            placeholder="Mô tả gói"
            value={form.servicePackages[0].description}
            onChange={(e) =>
              setForm((prev) => ({
                ...prev,
                servicePackages: [{ ...prev.servicePackages[0], description: e.target.value }],
              }))
            }
          />
          <input
            type="number"
            placeholder="Giá"
            value={form.servicePackages[0].price}
            onChange={(e) =>
              setForm((prev) => ({
                ...prev,
                servicePackages: [{ ...prev.servicePackages[0], price: Number(e.target.value) }],
              }))
            }
          />
        </div>

        <button type="submit">Đăng ký</button>
      </form>
    </div>
  );
};

export default RegisterClinic;
