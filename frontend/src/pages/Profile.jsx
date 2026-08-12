import React, { useState, useEffect } from 'react';
import './Profile.css';
import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';

function Profile({ setCurrentPage, cart = [] }) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [dob, setDob] = useState('');
  const [address, setAddress] = useState('');

  // State lưu thống kê đơn hàng
  const [totalDiscs, setTotalDiscs] = useState(0);
  const [totalSpent, setTotalSpent] = useState(0);

  const [toast, setToast] = useState({ show: false, message: '' });
  const [toastTimer, setToastTimer] = useState(null);

  useEffect(() => {
    // 1. ĐỌC QUYỀN VÀ THÔNG TIN TÀI KHOẢN ĐANG ĐĂNG NHẬP
    const userRole = localStorage.getItem('userRole');
    const isAdmin = userRole === 'admin';

    const storedName = localStorage.getItem('userName');
    const storedEmail = localStorage.getItem('userEmail');
    const storedPhone = localStorage.getItem('userPhone');
    const storedDob = localStorage.getItem('userDob');
    const storedAddress = localStorage.getItem('userAddress');

    let currentName = storedName || (isAdmin ? 'Quản Trị Viên MasterCD' : 'Phạm Gia Phú');
    let currentEmail = storedEmail || (isAdmin ? 'admin@mastercd.vn' : '2400004862@nttu.edu.vn');
    let currentPhone = storedPhone || (isAdmin ? '0900000000' : '0862098350');

    setFullName(currentName);
    setEmail(currentEmail);
    setPhone(currentPhone);
    setDob(storedDob || '2004-05-15');
    setAddress(storedAddress || (isAdmin ? 'Trụ sở Quản trị MasterCD' : '331 Quốc lộ 1A, P. An Phú Đông, Q.12, TP.HCM'));

    // 🔥 NẾU LÀ TÀI KHOẢN ADMIN -> ÉP THẲNG TỔNG CHI TIÊU & ĐĨA ĐÃ MUA VỀ 0
    if (isAdmin) {
      setTotalDiscs(0);
      setTotalSpent(0);
      return;
    }

    // 2. NẾU LÀ KHÁCH HÀNG -> MỚI QUÉT ĐƠN HÀNG ĐỂ TÍNH CHI TIÊU THỰC TẾ
    const savedOrders = JSON.parse(localStorage.getItem('userOrders')) ||
                        JSON.parse(localStorage.getItem('orders')) ||
                        JSON.parse(localStorage.getItem('mastercd_orders')) ||
                        [];
                   
    const myOrders = savedOrders.filter(order => {
      if (order.userEmail && currentEmail && order.userEmail.toLowerCase() === currentEmail.toLowerCase()) {
        return true;
      }
      if (order.phone && currentPhone && order.phone === currentPhone) {
        return true;
      }
      return false;
    });

    let discsCount = 0;
    let spentAmount = 0;

    myOrders.forEach(order => {
      const amount = Number(order.totalAmount) || Number(order.total) || 0;
      spentAmount += amount;

      if (order.items && Array.isArray(order.items)) {
        order.items.forEach(item => {
          discsCount += Number(item.quantity) || 1;
        });
      }
    });

    setTotalDiscs(discsCount);
    setTotalSpent(spentAmount);
  }, []);

  // TỰ ĐỘNG PHÂN HẠNG THÀNH VIÊN DỰA TRÊN TỔNG CHI TIÊU
  const getMembershipRank = (spent) => {
    const userRole = localStorage.getItem('userRole');
    if (userRole === 'admin') {
      return { title: "Quản Trị Viên Hệ Thống", color: "#00e5ff" };
    }
    if (spent >= 15000000) return { title: "Audiophile Kim Cương", color: "#00e5ff" };
    if (spent >= 7000000) return { title: "Audiophile Vàng", color: "#ffd700" };
    if (spent >= 3000000) return { title: "Audiophile Bạc", color: "#e2e8f0" };
    if (spent >= 1000000) return { title: "Audiophile Đồng", color: "#cd7f32" };
    return { title: "Thành viên Mới", color: "#94a3b8" };
  };

  const membership = getMembershipRank(totalSpent);

  const triggerToast = (msg) => {
    if (toastTimer) clearTimeout(toastTimer);
    setToast({ show: true, message: msg });
    const timer = setTimeout(() => setToast({ show: false, message: '' }), 3000);
    setToastTimer(timer);
  };

  const calculateAge = (dobString) => {
    if (!dobString) return 0;
    const birthDate = new Date(dobString);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) age--;
    return age > 0 ? age : 0;
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();
    localStorage.setItem('userName', fullName);
    localStorage.setItem('userEmail', email);
    localStorage.setItem('userPhone', phone);
    localStorage.setItem('userDob', dob);
    localStorage.setItem('userAddress', address);
    triggerToast("Cập nhật thông tin tài khoản thành công!");
  };

  const avatarChar = fullName ? fullName.trim().charAt(0).toUpperCase() : 'Q';
  const formatPrice = (num) => num.toLocaleString('vi-VN') + 'đ';

  return (
    <div className="app-container modern-theme">
      <Header setCurrentPage={setCurrentPage} cart={cart} />

      <main className="profile-main">
        <div className="profile-container">
          
          {/* CỘT TRÁI - SIDEBAR HỒ SƠ */}
          <div className="profile-sidebar-card">
            <div className="profile-avatar-wrapper">
              <div className="profile-avatar-circle">{avatarChar}</div>
              <button 
                type="button"
                className="btn-change-avatar" 
                onClick={() => triggerToast("Chức năng đổi ảnh đại diện đang phát triển!")}
                title="Đổi ảnh đại diện"
              >
                📷
              </button>
            </div>

            <h2 className="profile-user-title">{fullName || 'Người dùng'}</h2>
            <p className="profile-user-role" style={{ color: membership.color, fontWeight: 'bold' }}>
              {membership.title}
            </p>
            
            <div className="profile-quick-stats">
              <div className="stat-box">
                <span className="stat-num">{calculateAge(dob)}</span>
                <span className="stat-label">Tuổi</span>
              </div>
              <div className="stat-box">
                <span className="stat-num">{totalDiscs}</span>
                <span className="stat-label">Đĩa đã mua</span>
              </div>
            </div>

            <div className="total-spent-box">
              <span className="spent-label">Tổng tích lũy chi tiêu:</span>
              <strong className="spent-amount">{formatPrice(totalSpent)}</strong>
            </div>
          </div>

          {/* CỘT PHẢI - FORM CHỈNH SỬA */}
          <div className="profile-form-card">
            <h1 className="profile-section-heading">Thông tin tài khoản</h1>
            <p className="profile-section-sub">Quản lý thông tin cá nhân và xem phân hạng thành viên tích lũy.</p>

            <form onSubmit={handleSaveProfile} className="profile-form">
              <div className="profile-form-grid">
                <div className="form-group full-width">
                  <label>Họ và Tên *</label>
                  <input type="text" required value={fullName} onChange={(e) => setFullName(e.target.value)} />
                </div>

                <div className="form-group">
                  <label>Địa chỉ Email *</label>
                  <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>

                <div className="form-group">
                  <label>Số điện thoại liên lạc *</label>
                  <input type="tel" required value={phone} onChange={(e) => setPhone(e.target.value)} />
                </div>

                <div className="form-group">
                  <label>Ngày tháng năm sinh *</label>
                  <input type="date" required value={dob} onChange={(e) => setDob(e.target.value)} />
                </div>

                <div className="form-group">
                  <label>Tuổi hiện tại</label>
                  <input type="text" disabled value={`${calculateAge(dob)} tuổi`} className="input-disabled" />
                </div>

                <div className="form-group full-width">
                  <label>Địa chỉ nhận hàng mặc định *</label>
                  <textarea rows="3" required value={address} onChange={(e) => setAddress(e.target.value)}></textarea>
                </div>
              </div>

              <div className="profile-form-actions">
                <button type="submit" className="btn-save-profile">LƯU THAY ĐỔI</button>
              </div>
            </form>
          </div>

        </div>
      </main>

      {/* TOAST THÔNG BÁO */}
      <div className={`toast-notification ${toast.show ? 'show' : ''}`}>
        <div className="toast-content">
          <span className="toast-icon">👤</span>
          <span className="toast-text">{toast.message}</span>
        </div>
        <div className="toast-progress-bar"></div>
      </div>

      <Footer setCurrentPage={setCurrentPage} />
    </div>
  );
}

export default Profile;