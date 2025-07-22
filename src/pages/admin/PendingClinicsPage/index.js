import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import "./style.scss";

const PendingClinicsPage = () => {
  const [clinics, setClinics] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchPendingClinics = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const response = await axios.get("https://pettrack.onrender.com/api/admin/clinics/paged", {
        params: { status: "Pending", page: 1, pageSize: 20 },
        headers: { Authorization: `Bearer ${token}` },
      });
      setClinics(response.data.data.items || []);
    } catch (error) {
      console.error("Lỗi khi tải danh sách phòng khám:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (clinicId) => {
    const result = await Swal.fire({
      title: "Xác nhận phê duyệt?",
      text: "Bạn có chắc chắn muốn phê duyệt phòng khám này không?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#28a745",
      cancelButtonColor: "#6c757d",
      confirmButtonText: "Phê duyệt",
      cancelButtonText: "Huỷ",
    });

    if (result.isConfirmed) {
      try {
        const token = localStorage.getItem("token");
        await axios.put(`https://pettrack.onrender.com/api/admin/clinics/${clinicId}/approve`, {}, {
          headers: { Authorization: `Bearer ${token}` },
        });
        Swal.fire("Thành công!", "Phòng khám đã được phê duyệt.", "success");
        fetchPendingClinics();
      } catch (error) {
        console.error("Lỗi khi phê duyệt:", error);
        Swal.fire("Lỗi!", "Không thể phê duyệt phòng khám.", "error");
      }
    }
  };

  const handleReject = async (clinicId) => {
    const result = await Swal.fire({
      title: "Xác nhận từ chối?",
      text: "Bạn có chắc chắn muốn từ chối phòng khám này không?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc3545",
      cancelButtonColor: "#6c757d",
      confirmButtonText: "Từ chối",
      cancelButtonText: "Huỷ",
    });

    if (result.isConfirmed) {
      try {
        const token = localStorage.getItem("token");
        await axios.put(`hhttps://pettrack.onrender.com/api/admin/clinics/${clinicId}/reject`, {}, {
          headers: { Authorization: `Bearer ${token}` },
        });
        Swal.fire("Đã từ chối!", "Phòng khám đã bị từ chối.", "success");
        fetchPendingClinics();
      } catch (error) {
        console.error("Lỗi khi từ chối:", error);
        Swal.fire("Lỗi!", "Không thể từ chối phòng khám.", "error");
      }
    }
  };

  useEffect(() => {
    fetchPendingClinics();
  }, []);

  return (
    <div className="container mt-4">
      <h2>Danh sách phòng khám chờ phê duyệt</h2>
      {loading ? (
        <p>⏳ Đang tải dữ liệu...</p>
      ) : (
        <table className="table table-bordered mt-3">
          <thead>
            <tr>
              <th>Tên phòng khám</th>
              <th>Địa chỉ</th>
              <th>Email</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {clinics.length > 0 ? (
              clinics.map((clinic) => (
                <tr key={clinic.id}>
                  <td>{clinic.name}</td>
                  <td>{clinic.address}</td>
                  <td>{clinic.email}</td>
                  <td>
                    <button onClick={() => handleApprove(clinic.id)} className="btn btn-success btn-sm">Duyệt</button>{" "}
                    <button onClick={() => handleReject(clinic.id)} className="btn btn-danger btn-sm">Từ chối</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr><td colSpan="4">Không có phòng khám nào đang chờ.</td></tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default PendingClinicsPage;
