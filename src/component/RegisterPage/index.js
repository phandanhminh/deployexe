import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./style.scss";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    address: "",
    phoneNumber: ""
  });

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  const validate = () => {
    const newErrors = {};
    if (!formData.fullName || /\d/.test(formData.fullName)) {
      newErrors.fullName = "Họ tên không được chứa số.";
    }
    if (!formData.email.includes("@")) {
      newErrors.email = "Email không hợp lệ.";
    }
    if (formData.password.length < 6) {
      newErrors.password = "Mật khẩu phải có ít nhất 6 ký tự.";
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Mật khẩu không khớp.";
      console.log("❌ Mật khẩu không khớp");
    }
    if (!/^\d+$/.test(formData.phoneNumber)) {
      newErrors.phoneNumber = "Số điện thoại chỉ được chứa số.";
    }
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const res = await axios.post("https://pettrack.onrender.com/api/Authentication/register", formData, {
        headers: { "Content-Type": "application/json" },
      });
      console.log("✅ Đăng ký thành công:", res.data);
      setSuccessMessage("Đăng ký thành công! Vui lòng đăng nhập.");
    } catch (error) {
      console.error("❌ Lỗi API:", error);
      if (error.response?.status === 409) {
        setErrors({ email: "Email đã được sử dụng." });
      } else if (error.response?.data) {
        setErrors({ api: error.response.data.message || "Đã xảy ra lỗi." });
      } else {
        setErrors({ api: "Không thể kết nối máy chủ. Vui lòng thử lại sau." });
      }
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleOk = () => {
    setSuccessMessage("");
    navigate("/login");
  };

  return (
    <div className="register-container">
      {successMessage ? (
        <div className="success-message">
          <p>{successMessage}</p>
          <button onClick={handleOk}>Đăng nhập</button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="register-form">
          <h2>Đăng ký tài khoản</h2>

          <input
            type="text"
            name="fullName"
            placeholder="Họ và tên"
            value={formData.fullName}
            onChange={handleChange}
          />
          {errors.fullName && <p className="error">{errors.fullName}</p>}

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <p className="error">{errors.email}</p>}

          <input
            type="password"
            name="password"
            placeholder="Mật khẩu"
            value={formData.password}
            onChange={handleChange}
          />
          {errors.password && <p className="error">{errors.password}</p>}

          <input
            type="password"
            name="confirmPassword"
            placeholder="Nhập lại mật khẩu"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
          {errors.confirmPassword && <p className="error">{errors.confirmPassword}</p>}

          <input
            type="text"
            name="address"
            placeholder="Địa chỉ"
            value={formData.address}
            onChange={handleChange}
          />

          <input
            type="text"
            name="phoneNumber"
            placeholder="Số điện thoại"
            value={formData.phoneNumber}
            onChange={handleChange}
          />
          {errors.phoneNumber && <p className="error">{errors.phoneNumber}</p>}

          {errors.api && <p className="error">{errors.api}</p>}

          <button type="submit">Đăng ký</button>
        </form>
      )}
    </div>
  );
};

export default RegisterPage;
