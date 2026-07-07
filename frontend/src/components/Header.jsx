import React, { useState } from 'react';

function Header({ setCurrentPage, cart = [] }) {
  const [showDropdown, setShowDropdown] = useState(false);
  
  const token = localStorage.getItem('token');
  const storedName = localStorage.getItem('userName');

  let userName = "Khách";
  let avatarChar = "U";
  if (storedName && storedName !== "undefined" && storedName !== "null" && storedName.trim() !== "") {
    userName = storedName;
    avatarChar = storedName.charAt(0).toUpperCase();
  }

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
    setShowDropdown(false);
    window.location.reload();
  };

  return (
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
        <a href="#" onClick={(e) => { e.preventDefault(); setCurrentPage('payment-info'); }}>Thông tin thanh toán</a>
        <a href="#" onClick={(e) => { e.preventDefault(); setCurrentPage('contact'); }}>Liên hệ</a>  
      </nav>
      
      <div className="header-icons">
        <button onClick={() => alert('Chức năng tìm kiếm đang được phát triển!')} style={{ cursor: 'pointer' }}>🔍</button>
        
        <button onClick={() => setCurrentPage('cart')} style={{ cursor: 'pointer' }}>
          🛒 <span className="cart-badge">{cart.reduce((total, item) => total + item.quantity, 0)}</span>
        </button>
        
        {token ? (
          <div className="user-menu-container" style={{ position: 'relative' }}>
            <div className="user-avatar-btn" onClick={() => setShowDropdown(!showDropdown)}>
              <div className="avatar-circle">{avatarChar}</div>
              <span className="user-name">{userName}</span>
              <span className="dropdown-arrow">▼</span>
            </div>
            
            {showDropdown && (
              <ul className="dropdown-menu">
                <li onClick={() => { setCurrentPage('profile'); setShowDropdown(false); }}>👤 Thông tin tài khoản</li>
                <li onClick={() => { setCurrentPage('order-history'); setShowDropdown(false); }}>📦 Lịch sử đặt hàng</li>
                <li onClick={() => { setCurrentPage('delivery-status'); setShowDropdown(false); }}>🚚 Tiến độ giao hàng</li>
                <li className="logout-btn" onClick={handleLogout}>🚪 Đăng xuất</li>
              </ul>
            )}
          </div>
        ) : (
          <button onClick={() => setCurrentPage('login')} className="btn-login" style={{ cursor: 'pointer' }}>
            Đăng nhập
          </button>
        )}
      </div>
    </header>
  );
}

export default Header;