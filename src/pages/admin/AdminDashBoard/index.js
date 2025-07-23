import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  LineChart, Line, AreaChart, Area,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from "recharts";
import "./style.scss";
import SummaryCard from "component/SummaryCard";

const AdminDashboard = () => {
  const [clinics, setClinics] = useState([]);
  const [selectedClinicId, setSelectedClinicId] = useState("");
  const [year, setYear] = useState(new Date().getFullYear());
  const [revenueData, setRevenueData] = useState([]);
  const [bookingData, setBookingData] = useState([]);
  const [platformRevenue, setPlatformRevenue] = useState([]);

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) return;

    axios
      .get("https://pettrack.onrender.com/api/admin/clinics/paged", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        const clinics = res.data.data.items || [];
        setClinics(clinics);
        if (clinics.length > 0) {
          setSelectedClinicId(clinics[0].id);
        }
      })
      .catch((err) => console.error("Lỗi lấy danh sách phòng khám:", err));
  }, [token]);

  useEffect(() => {
    if (!selectedClinicId || !token) return;

    const fetchRevenue = axios.get(
      `https://pettrack.onrender.com/api/Dashboard/revenue-clinic?clinicId=${selectedClinicId}&year=${year}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    const fetchBooking = axios.get(
      `https://pettrack.onrender.com/api/Dashboard/booking-count-clinic?clinicId=${selectedClinicId}&year=${year}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    const fetchPlatform = axios.get(
      `https://pettrack.onrender.com/api/Dashboard/revenue-platform?year=${year}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    Promise.all([fetchRevenue, fetchBooking, fetchPlatform])
      .then(([resRev, resBook, resPlat]) => {
        setRevenueData(Array.isArray(resRev.data.data) ? resRev.data.data : []);
        setBookingData(Array.isArray(resBook.data.data) ? resBook.data.data : []);
        setPlatformRevenue(Array.isArray(resPlat.data.data) ? resPlat.data.data : []);
      })
      .catch((err) => {
        console.error("Dashboard error:", err);
        setRevenueData([]);
        setBookingData([]);
        setPlatformRevenue([]);
      });
  }, [selectedClinicId, year, token]);

  const months = ["Th1", "Th2", "Th3", "Th4", "Th5", "Th6", "Th7", "Th8", "Th9", "Th10", "Th11", "Th12"];

  const renderChartOrEmpty = (data, chart, valueKey) => {
    if (!data || data.length === 0 || data.every((item) => item[valueKey] === 0)) {
      return <div className="no-data">📊 Không có dữ liệu trong năm {year}</div>;
    }
    return chart;
  };

  const sumData = (data, key) => {
    return data.reduce((acc, item) => acc + (item[key] || 0), 0);
  };

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-header">📈 Trang tổng quan quản lý</h1>

      <div className="filter-bar">
        <div className="filter-group">
          <label htmlFor="clinic-select">🏥 Phòng khám</label>
          <select
            id="clinic-select"
            className="styled-select"
            value={selectedClinicId}
            onChange={(e) => setSelectedClinicId(e.target.value)}
          >
            {clinics.map((c) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label htmlFor="year-select">📅 Năm</label>
          <select
            id="year-select"
            className="styled-select"
            value={year}
            onChange={(e) => setYear(Number(e.target.value))}
          >
            {[2022, 2023, 2024, 2025, 2026].map((y) => (
              <option key={y} value={y}>{y}</option>
            ))}
          </select>
        </div>
      </div>
      <div className="summary-grid">
  <SummaryCard
    title="Doanh thu phòng khám"
    value={sumData(revenueData, "revenue")}
    change={5.2} // hoặc lấy từ API nếu có
    icon="💰"
  />
  <SummaryCard
    title="Số lượt đặt"
    value={sumData(bookingData, "count")}
    change={2.1}
    icon="📅"
  />
  <SummaryCard
    title="Doanh thu nền tảng"
    value={sumData(platformRevenue, "revenue")}
    change={3.6}
    icon="📊"
  />
</div>

      <div className="chart-grid">
        <div className="chart-card">
          <h3>Doanh thu phòng khám ({year})</h3>
          <ResponsiveContainer width="100%" height={300}>
            {renderChartOrEmpty(revenueData,
              <AreaChart data={revenueData}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="#e0e0e0" strokeDasharray="5 5" vertical={false} />
                <XAxis dataKey="month" tickFormatter={(m) => months[m - 1]} />
                <YAxis />
                <Tooltip />
                <Legend />
                <Area type="monotone" dataKey="revenue" stroke="#8884d8" fill="url(#colorRevenue)" name="Doanh thu" />
              </AreaChart>,
              "revenue"
            )}
          </ResponsiveContainer>
          <div className="total">Tổng doanh thu: {sumData(revenueData, "revenue").toLocaleString()} VND</div>
        </div>

        <div className="chart-card">
          <h3>Số lượng đặt lịch ({year})</h3>
          <ResponsiveContainer width="100%" height={300}>
            {renderChartOrEmpty(bookingData,
              <AreaChart data={bookingData}>
  <defs>
    <linearGradient id="colorBooking" x1="0" y1="0" x2="0" y2="1">
      <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
      <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
    </linearGradient>
  </defs>
  <CartesianGrid stroke="#e0e0e0" strokeDasharray="5 5" vertical={false} />
  <XAxis dataKey="month" tickFormatter={(m) => months[m - 1]} />
  <YAxis />
  <Tooltip />
  <Legend />
  <Area type="monotone" dataKey="count" stroke="#82ca9d" fill="url(#colorBooking)" name="Lượt đặt lịch" />
</AreaChart>,
              "count"
            )}
          </ResponsiveContainer>
          <div className="total">Tổng lượt đặt: {sumData(bookingData, "count").toLocaleString()}</div>
        </div>
      </div>

      <div className="chart-card">
        <h3>Doanh thu nền tảng PetTrack ({year})</h3>
        <ResponsiveContainer width="100%" height={300}>
          {renderChartOrEmpty(platformRevenue,
            <AreaChart data={platformRevenue}>
              <defs>
                <linearGradient id="colorPlatform" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ffc658" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#ffc658" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid stroke="#e0e0e0" strokeDasharray="5 5" vertical={false} />
              <XAxis dataKey="month" tickFormatter={(m) => months[m - 1]} />
              <YAxis />
              <Tooltip />
              <Legend />
              <Area type="monotone" dataKey="revenue" stroke="#ffc658" fill="url(#colorPlatform)" name="Doanh thu nền tảng" />
            </AreaChart>,
            "revenue"
          )}
        </ResponsiveContainer>
        <div className="total">Tổng doanh thu nền tảng: {sumData(platformRevenue, "revenue").toLocaleString()} VND</div>
      </div>
    </div>
  );
};

export default AdminDashboard;
