import React, { useState } from 'react';
import './Login.css';

function Login({ setCurrentPage }) {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h2 
            className="logo-modern" 
            onClick={() => setCurrentPage('home')}
            style={{ cursor: 'pointer', display: 'inline-block' }}
            title="Quay về trang chủ"
          >
            <span className="accent-text">Master</span>CD.
          </h2>
          <p>{isLogin ? 'Đăng nhập để tiếp tục' : 'Tạo tài khoản mới'}</p>
        </div>

        <form className="auth-form">
          {!isLogin && (
            <div className="input-group">
              <label>Họ và Tên</label>
              <input type="text" placeholder="Nhập tên của bạn" />
            </div>
          )}

          <div className="input-group">
            <label>Email</label>
            <input type="email" placeholder="Nhập địa chỉ email" />
          </div>

          <div className="input-group">
            <label>Mật khẩu</label>
            <input type="password" placeholder="Nhập mật khẩu" />
          </div>

          {/* Đã xóa hoàn toàn nút Quên mật khẩu ở vị trí này */}

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
    </div>
  );
}

export default Login;