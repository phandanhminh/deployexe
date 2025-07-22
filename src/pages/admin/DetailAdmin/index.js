import React, { useEffect, useState } from "react";
import axios from "axios";
import "./style.scss";
import Swal from "sweetalert2";

const AdminUserManagement = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [editData, setEditData] = useState({ fullName: "", address: "", phoneNumber: "", avatarUrl: "" });
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchUsers();
  }, []);
  const [pageIndex, setPageIndex] = useState(1);
  const [pageSize] = useState(7); // mỗi trang 7 user
  const [totalPages, setTotalPages] = useState(1);

  const fetchUsers = async () => {
  try {
    const response = await axios.get(`https://pettrack.onrender.com/api/admin/users`, {
      headers: { Authorization: `Bearer ${token}` },
      params: {
        PageIndex: pageIndex,
        PageSize: pageSize,
      },
    });
    setUsers(response.data.data.items);
    setTotalPages(response.data.data.totalPages);
  } catch (err) {
    console.error("Lỗi khi lấy danh sách người dùng:", err);
  }
};
useEffect(() => {
    fetchUsers();
  }, [pageIndex]); 

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Xác nhận xoá?",
      text: "Bạn có chắc chắn muốn xoá người dùng này không?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Xoá",
      cancelButtonText: "Huỷ",
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(`http://localhost:5195/api/admin/users/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        await fetchUsers();
        Swal.fire("Đã xoá!", "Người dùng đã được xoá.", "success");
      } catch (err) {
        console.error("Xoá thất bại:", err);
        Swal.fire("Thất bại", "Không thể xoá người dùng.", "error");
      }
    }
  };

  const handleEdit = (user) => {
    setSelectedUser(user);
    setEditData({
      fullName: user.fullName,
      address: user.address,
      phoneNumber: user.phoneNumber,
      avatarUrl: user.avatarUrl || ""
    });
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`http://localhost:5195/api/admin/users/${selectedUser.id}`, editData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSelectedUser(null);
      fetchUsers();
    } catch (err) {
      console.error("Cập nhật thất bại:", err);
    }
  };

  return (
    <div className="admin-user-container">
      <h2>Quản lý người dùng</h2>
      <table className="admin-user-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Họ tên</th>
            <th>Email</th>
            <th>Điện thoại</th>
            <th>Địa chỉ</th>
            <th>Vai trò</th>
            <th>Ngày tạo</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user.id}>
              <td>{index + 1}</td>
              <td>{user.fullName}</td>
              <td>{user.email}</td>
              <td>{user.phoneNumber}</td>
              <td>{user.address}</td>
              <td>{user.role}</td>
              <td>{new Date(user.createdTime).toLocaleString()}</td>
              <td>
                <button onClick={() => handleEdit(user)} className="edit">Sửa</button>
                <button onClick={() => handleDelete(user.id)} className="danger">Xoá</button>
              </td>
            </tr>
          ))}
        </tbody>

      </table>
      <div className="pagination">
           <button
             disabled={pageIndex === 1}
             onClick={() => setPageIndex(prev => Math.max(prev - 1, 1))}
           >
             &laquo; Trước
           </button>
           <span>Trang {pageIndex} / {totalPages}</span>
           <button
             disabled={pageIndex === totalPages}
             onClick={() => setPageIndex(prev => Math.min(prev + 1, totalPages))}
           >
             Sau &raquo;
           </button>
         </div>
      

      {selectedUser && (
        <div className="edit-form">
          <h3>Chỉnh sửa thông tin người dùng</h3>
          <input type="text" placeholder="Họ tên" value={editData.fullName} onChange={(e) => setEditData({ ...editData, fullName: e.target.value })} />
          <input type="text" placeholder="Địa chỉ" value={editData.address} onChange={(e) => setEditData({ ...editData, address: e.target.value })} />
          <input type="text" placeholder="Số điện thoại" value={editData.phoneNumber} onChange={(e) => setEditData({ ...editData, phoneNumber: e.target.value })} />
          <input type="text" placeholder="Link ảnh đại diện" value={editData.avatarUrl} onChange={(e) => setEditData({ ...editData, avatarUrl: e.target.value })} />
          <div className="edit-actions">
            <button onClick={handleUpdate}>Cập nhật</button>
            <button className="danger" onClick={() => setSelectedUser(null)}>Huỷ</button>
          </div>
        </div>
      )}
      
    </div>
    
  );
};

export default AdminUserManagement;
