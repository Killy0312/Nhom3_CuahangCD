import React, { useState } from 'react';
import './Login.css';
import Footer from '../components/Footer.jsx'; 

function Login({ setCurrentPage, cart = [] }) {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="app-container modern-theme">
      {/* HEADER ĐỒNG BỘ */}
      <header className="main-header">
        <div 
          className="logo-modern" 
          onClick={() => setCurrentPage('home')}
          style={{ cursor: 'pointer' }}
        >
          <span className="accent-text">Master</span>CD
        </div>
        <nav className="nav-links">
          <a href="#" onClick={(e) => { e.preventDefault(); setCurrentPage('home'); }}>Trang chủ</a>
          <a href="#" onClick={(e) => { e.preventDefault(); setCurrentPage('products'); }}>Sản phẩm</a>
          {/* Đã sửa link Thông tin thanh toán */}
          <a href="#" onClick={(e) => { e.preventDefault(); setCurrentPage('payment-info'); }}>Thông tin thanh toán</a>
          <a href="#" onClick={(e) => { e.preventDefault(); setCurrentPage('contact'); }}>Liên hệ</a>
        </nav>
        <div className="header-icons">
          <button onClick={() => alert('Chức năng tìm kiếm đang được phát triển!')} style={{ cursor: 'pointer' }}>🔍</button>
          
          <button onClick={() => setCurrentPage('cart')} style={{ cursor: 'pointer' }}>
            🛒 <span className="cart-badge">{cart.reduce((total, item) => total + item.quantity, 0)}</span>
          </button>
          
          <button onClick={() => setCurrentPage('login')} className="btn-login" style={{ cursor: 'pointer', border: '1px solid #00e5ff', color: '#00e5ff' }}>
            Đăng nhập
          </button>
        </div>
      </header>

      <main className="auth-main-content">
        <div className="auth-card">
          <div className="auth-header">
            <h2>{isLogin ? 'Đăng nhập' : 'Đăng ký'}</h2>
            <p>{isLogin ? 'Đăng nhập để tiếp tục trải nghiệm' : 'Tạo tài khoản mới tại MasterCD'}</p>
          </div>

          <form className="auth-form" onSubmit={(e) => e.preventDefault()}>
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

      {/* GỌI COMPONENT FOOTER DÙNG CHUNG */}
      <Footer setCurrentPage={setCurrentPage} />
    </div>
  );
}

export default Login;