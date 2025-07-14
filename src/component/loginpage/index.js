import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./style.scss";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post("https://pettrack.onrender.com/api/Authentication/login", {
        email,
        password,
      });

      const data = response?.data?.data;

      if (data?.token && data?.userResponse) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.userResponse));
        localStorage.setItem("role", data.userResponse.role);

        const role = data.userResponse.role;
        if (role === "Admin") {
          navigate("/admin/PendingClinicsPage");
        } else if (role === "Clinic") {
          navigate("/clinic/ViewBookingSchedule");
        } else {
          navigate("/");
        }
      } else {
        setError("Đăng nhập thất bại. Vui lòng kiểm tra lại email và mật khẩu!");
      }
    } catch (err) {
      console.error("❌ Lỗi Backend:", err);
      setError("Không thể đăng nhập. Vui lòng thử lại sau!");
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2 className="title">Đăng nhập hệ thống</h2>
        
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            placeholder="Nhập email..."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Mật khẩu:</label>
          <input
            type="password"
            placeholder="Nhập mật khẩu..."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {error && <p className="error-message">{error}</p>}

        <button type="submit" className="submit-btn">Đăng nhập</button>
      </form>
    </div>
  );
};

export default LoginPage;
