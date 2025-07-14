import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ScheduleManagement.scss';

const days = ['Chủ nhật', 'Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7'];

export default function ScheduleManagement({ clinicId }) {
  const [schedules, setSchedules] = useState([]);
  const [editingSchedule, setEditingSchedule] = useState(null);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    dayOfWeek: 0,
    openTime: '08:00',
    closeTime: '17:00'
  });

  const token = localStorage.getItem('token');

  const fetchSchedules = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`https://pettrack.onrender.com/api/public/clinics/${clinicId}/schedules`);
      setSchedules(res.data);
    } catch (err) {
      console.error("❌ Lỗi khi lấy lịch:", err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchSchedules();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      if (editingSchedule) {
        await axios.put(`/api/user/clinics/schedules/${editingSchedule.id}`, form, {
          headers: { Authorization: `Bearer ${token}` },
        });
        alert("✅ Cập nhật lịch thành công!");
      } else {
        await axios.post(`/api/user/clinics/${clinicId}/schedules`, form, {
          headers: { Authorization: `Bearer ${token}` },
        });
        alert("✅ Thêm lịch thành công!");
      }
      setForm({ dayOfWeek: 0, openTime: '08:00', closeTime: '17:00' });
      setEditingSchedule(null);
      fetchSchedules();
    } catch (err) {
      alert("❌ Lỗi: " + (err.response?.data?.message || err.message));
    }
  };

  const handleEdit = (schedule) => {
    setEditingSchedule(schedule);
    setForm({
      dayOfWeek: schedule.dayOfWeek,
      openTime: schedule.openTime,
      closeTime: schedule.closeTime,
    });
  };

  const handleDelete = async (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xoá lịch này không?")) {
      try {
        await axios.delete(`/api/user/clinics/schedules/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        alert("🗑️ Đã xoá lịch!");
        fetchSchedules();
      } catch (err) {
        alert("❌ Lỗi khi xoá lịch: " + (err.response?.data?.message || err.message));
      }
    }
  };

  return (
    <div className="schedule-container">
      <div className="header">
        <h2>🗓️ Quản lý lịch làm việc phòng khám</h2>
        <button onClick={fetchSchedules}>🔄 Làm mới</button>
      </div>

      <div className="form">
        <label>Ngày trong tuần:</label>
        <select name="dayOfWeek" value={form.dayOfWeek} onChange={handleChange}>
          {days.map((d, i) => (
            <option key={i} value={i}>{d}</option>
          ))}
        </select>

        <label>Giờ mở cửa:</label>
        <input type="time" name="openTime" value={form.openTime} onChange={handleChange} />

        <label>Giờ đóng cửa:</label>
        <input type="time" name="closeTime" value={form.closeTime} onChange={handleChange} />

        <button className="submit" onClick={handleSubmit}>
          {editingSchedule ? '✅ Cập nhật lịch' : '➕ Thêm lịch mới'}
        </button>
      </div>

      <table className="schedule-table">
        <thead>
          <tr>
            <th>Thứ</th>
            <th>Giờ mở cửa</th>
            <th>Giờ đóng cửa</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr><td colSpan={4}>⏳ Đang tải dữ liệu...</td></tr>
          ) : schedules.length === 0 ? (
            <tr><td colSpan={4}>📭 Chưa có lịch làm việc nào.</td></tr>
          ) : (
            schedules.map(s => (
              <tr key={s.id}>
                <td>{days[s.dayOfWeek]}</td>
                <td>{s.openTime}</td>
                <td>{s.closeTime}</td>
                <td>
                  <button className="edit" onClick={() => handleEdit(s)}>✏️ Sửa</button>
                  <button className="delete" onClick={() => handleDelete(s.id)}>🗑️ Xoá</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
