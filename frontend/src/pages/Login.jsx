import React, { useState } from 'react';
import './Login.css';
import Header from '../components/Header.jsx'; // ĐỒNG BỘ LUÔN HEADER DÙNG CHUNG
import Footer from '../components/Footer.jsx'; 

function Login({ setCurrentPage, cart = [] }) {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });

  // 💡 State quản lý Toast: Hỗ trợ thông báo nhiều trạng thái (Thành công / Thất bại)
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });
  const [toastTimer, setToastTimer] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 💡 Hàm gọi thông báo nổi tùy biến theo loại
  const triggerToast = (msg, type = 'success') => {
    if (toastTimer) clearTimeout(toastTimer);
    setToast({ show: true, message: msg, type: type });
    
    const timer = setTimeout(() => {
      setToast({ show: false, message: '', type: 'success' });
    }, 3000);
    setToastTimer(timer);
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); 
    
    const url = isLogin 
      ? 'http://localhost:5000/api/auth/login' 
      : 'http://localhost:5000/api/auth/register';

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      const data = await response.json();

      if (response.ok) {
        if (isLogin) {
          // Bắt chắc chắn tên từ Backend, dự phòng nếu trống thì lấy tên Phú
          const userName = (data.user && data.user.name) ? data.user.name : "Phú";
          localStorage.setItem('token', data.token || "token_tam_thoi"); 
          localStorage.setItem('userName', userName); 

          // Hiện thông báo thành công xịn xò trước
          triggerToast("🎉 Đăng nhập thành công! Đang chuyển hướng...", "success"); 

          // Delay 1.5 giây cho người dùng nhìn thấy Toast rồi mới chuyển trang + reload
          setTimeout(() => {
            setCurrentPage('home'); 
            window.location.reload();
          }, 1500);

        } else {
          triggerToast("🎉 Đăng ký thành công! Vui lòng đăng nhập lại.", "success");
          setIsLogin(true); 
        }
      } else {
        triggerToast(`❌ Lỗi: ${data.error || "Thông tin không hợp lệ"}`, "error");
      }
    } catch (error) {
      triggerToast("❌ Không thể kết nối tới máy chủ Backend! Hãy kiểm tra cổng 5000.", "error");
    }
  };

  return (
    <div className="app-container modern-theme">
      
      {/* Thay bằng Header dùng chung để Avatar đổi đồng bộ */}
      <Header setCurrentPage={setCurrentPage} cart={cart} />

      <main className="auth-main-content">
        <div className="auth-card">
          <div className="auth-header">
            <h2>{isLogin ? 'Đăng nhập' : 'Đăng ký'}</h2>
            <p>{isLogin ? 'Đăng nhập để tiếp tục trải nghiệm' : 'Tạo tài khoản mới tại MasterCD'}</p>
          </div>

          <form className="auth-form" onSubmit={handleSubmit}>
            {!isLogin && (
              <div className="input-group">
                <label>Họ và Tên</label>
                <input type="text" name="name" placeholder="Nhập tên của bạn" onChange={handleChange} required={!isLogin} />
              </div>
            )}

            <div className="input-group">
              <label>Email</label>
              <input type="email" name="email" placeholder="Nhập địa chỉ email" onChange={handleChange} required />
            </div>

            <div className="input-group">
              <label>Mật khẩu</label>
              <input type="password" name="password" placeholder="Nhập mật khẩu" onChange={handleChange} required />
            </div>

            <button type="submit" className="btn-auth">
              {isLogin ? 'Đăng nhập' : 'Đăng ký ngay'}
            </button>
          </form>

          <div className="auth-toggle">
            <p>
              {isLogin ? 'Chưa có tài khoản? ' : 'Đã có tài khoản? '}
              <span className="toggle-link" onClick={() => setIsLogin(!isLogin)}>
                {isLogin ? 'Đăng ký tại đây' : 'Đăng nhập ngay'}
              </span>
            </p>
          </div>
        </div>
      </main>

      {/* 💡 CỤM TOAST NOTIFICATION THÔNG MINH CHO TRANG LOGIN */}
      <div className={`toast-notification ${toast.type} ${toast.show ? 'show' : ''}`}>
        <div className="toast-content">
          <span className="toast-icon">{toast.type === 'success' ? '🎉' : '⚠️'}</span>
          <span className="toast-text">{toast.message}</span>
        </div>
        <div className="toast-progress-bar"></div>
      </div>

      <Footer setCurrentPage={setCurrentPage} />
    </div>
  );
}

export default Login;