import React, { useState, useEffect } from 'react';

function Header({ setCurrentPage, cart = [] }) {
  const [showDropdown, setShowDropdown] = useState(false);
  
  const [theme, setTheme] = useState(() => localStorage.getItem('appTheme') || 'light');

  const [toast, setToast] = useState({ show: false, message: '' });
  const [toastTimer, setToastTimer] = useState(null);
  
  const token = localStorage.getItem('token');
  const storedName = localStorage.getItem('userName');
  const userRole = localStorage.getItem('userRole');

  let userName = "Khách";
  let avatarChar = "U";
  if (storedName && storedName !== "undefined" && storedName !== "null" && storedName.trim() !== "") {
    userName = storedName;
    avatarChar = storedName.charAt(0).toUpperCase();
  }

  useEffect(() => {
    document.body.className = theme === 'light' ? 'light-mode' : 'dark-mode';
    localStorage.setItem('appTheme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  const triggerToast = (msg) => {
    if (toastTimer) clearTimeout(toastTimer);
    setToast({ show: true, message: msg });
    const timer = setTimeout(() => setToast({ show: false, message: '' }), 3000);
    setToastTimer(timer);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
    localStorage.removeItem('userRole');
    setShowDropdown(false);

    triggerToast("Đăng xuất tài khoản thành công! Hẹn gặp lại bạn.");

    setTimeout(() => {
      window.location.reload();
    }, 1500);
  };

  const handleNav = (pageName) => {
    setCurrentPage(pageName);
    setShowDropdown(false);
  };

  return (
    <>
      <header className="main-header">
        <div 
          className="logo-modern" 
          onClick={() => handleNav('home')}
          style={{ cursor: 'pointer' }}
        >
          <span className="accent-text">Master</span>CD
        </div>
        
        <nav className="nav-links">
          <a href="#home" onClick={(e) => { e.preventDefault(); handleNav('home'); }}>Trang chủ</a>
          <a href="#store-info" onClick={(e) => { e.preventDefault(); handleNav('store-info'); }}>Thông tin cửa hàng</a>
          <a href="#products" onClick={(e) => { e.preventDefault(); handleNav('products'); }}>Sản phẩm</a>
          <a href="#payment-info" onClick={(e) => { e.preventDefault(); handleNav('payment-info'); }}>Thông tin thanh toán</a>
          <a href="#contact" onClick={(e) => { e.preventDefault(); handleNav('contact'); }}>Liên hệ</a>  
        </nav>
        
        <div className="header-icons">
          {/* NÚT CHUYỂN THEME SÁNG / TỐI */}
          <button 
            className="btn-theme-toggle" 
            onClick={toggleTheme} 
            title="Chuyển chế độ Sáng / Tối"
            style={{ cursor: 'pointer', fontSize: '18px', background: 'none', border: 'none', padding: '6px' }}
          >
            {theme === 'light' ? '🌙' : '☀️'}
          </button>

          {/* NÚT GIỎ HÀNG */}
          <button onClick={() => handleNav('cart')} style={{ cursor: 'pointer', position: 'relative' }}>
            🛒 Giỏ hàng <span className="cart-badge">{cart.reduce((total, item) => total + item.quantity, 0)}</span>
          </button>
          
          {token ? (
            <div className="user-menu-container" style={{ position: 'relative' }}>
              <div className="user-avatar-btn" onClick={() => setShowDropdown(!showDropdown)} style={{ cursor: 'pointer' }}>
                <div className="avatar-circle">{avatarChar}</div>
                <span className="user-name">{userName}</span>
                <span className="dropdown-arrow">▼</span>
              </div>
              
              {/* MENU DROPDOWN TÀI KHOẢN */}
              {showDropdown && (
                <ul className="dropdown-menu">
                  {userRole === 'admin' && (
                    <li 
                      style={{ color: '#00e5ff', fontWeight: 'bold', cursor: 'pointer' }} 
                      onClick={() => handleNav('admin-dashboard')}
                    >
                      Bảng Quản Trị Admin
                    </li>
                  )}
                  <li onClick={() => handleNav('profile')} style={{ cursor: 'pointer' }}>
                    Thông tin tài khoản
                  </li>
                  <li onClick={() => handleNav('order-history')} style={{ cursor: 'pointer' }}>
                    Lịch sử đặt hàng
                  </li>
                  <li className="logout-btn" onClick={handleLogout} style={{ cursor: 'pointer' }}>
                    Đăng xuất
                  </li>
                </ul>
              )}
            </div>
          ) : (
            <button onClick={() => handleNav('login')} className="btn-login" style={{ cursor: 'pointer' }}>
              Đăng nhập
            </button>
          )}
        </div>
      </header>

      <div className={`header-toast-notification ${toast.show ? 'show' : ''}`}>
        <div className="header-toast-content">
          <span className="header-toast-text">{toast.message}</span>
        </div>
        <div className="header-toast-bar"></div>
      </div>
    </>
  );
}

export default Header;