import React from 'react';
import './PaymentInfo.css';

function PaymentInfo({ setCurrentPage, cart = [] }) {
  return (
    <div className="app-container modern-theme">
      {/* HEADER */}
      <header className="main-header">
        <div className="logo-modern" onClick={() => setCurrentPage('home')} style={{ cursor: 'pointer' }}>
          <span className="accent-text">Master</span>CD
        </div>
        <nav className="nav-links">
          <a href="#" onClick={(e) => { e.preventDefault(); setCurrentPage('home'); }}>Trang chủ</a>
          <a href="#" onClick={(e) => { e.preventDefault(); setCurrentPage('products'); }}>Sản phẩm</a>
          <a href="#" className="active" onClick={(e) => e.preventDefault()}>Thông tin thanh toán</a>
          <a href="#" onClick={(e) => { e.preventDefault(); setCurrentPage('contact'); }}>Liên hệ</a>
        </nav>
        <div className="header-icons">
          <button>🔍</button>
          <button onClick={() => setCurrentPage('cart')} style={{ cursor: 'pointer' }}>
            🛒 <span className="cart-badge">{cart.reduce((total, item) => total + item.quantity, 0)}</span>
          </button>
          <button onClick={() => setCurrentPage('login')} className="btn-login" style={{ cursor: 'pointer' }}>Đăng nhập</button>
        </div>
      </header>

      {/* NỘI DUNG CHÍNH */}
      <main className="payment-info-main">
        <h1 className="page-title">Hướng dẫn thanh toán mua hàng tại <span className="accent-text">MasterCD</span></h1>
        
        <div className="guide-steps">
          <div className="step-card">
            <h3>Bước 1: Chọn sản phẩm</h3>
            <p>Truy cập vào trang <strong>Sản phẩm</strong>. Tìm kiếm đĩa CD, Vinyl hoặc thiết bị bạn yêu thích. Bấm nút <strong>"Thêm vào giỏ"</strong>.</p>
          </div>

          <div className="step-card">
            <h3>Bước 2: Kiểm tra giỏ hàng</h3>
            <p>Bấm vào biểu tượng <strong>Giỏ hàng 🛒</strong> ở góc phải màn hình. Kiểm tra lại số lượng và tổng tiền. Sau đó bấm <strong>"Tiến hành thanh toán"</strong>.</p>
          </div>

          <div className="step-card">
            <h3>Bước 3: Điền thông tin giao hàng</h3>
            <p>Tại trang thanh toán, bạn cần điền đầy đủ và chính xác: <strong>Họ tên, Số điện thoại và Địa chỉ nhận hàng chi tiết</strong> để shipper giao đến tận nơi.</p>
          </div>

          <div className="step-card">
            <h3>Bước 4: Chọn phương thức thanh toán & Đặt hàng</h3>
            <p>MasterCD hỗ trợ 3 hình thức thanh toán chính:</p>
            <ul>
              <li><strong>Thanh toán tiền mặt (COD):</strong> Trả tiền cho shipper khi nhận được hàng.</li>
              <li><strong>Chuyển khoản Vietcombank / MoMo:</strong> Quét mã QR hiện ra trên màn hình. Nhớ ghi đúng nội dung chuyển khoản là: <code>MCD - [Số điện thoại của bạn]</code>.</li>
            </ul>
            <p>Sau khi hoàn tất, bấm <strong>"Xác nhận đặt hàng"</strong>.</p>
          </div>
        </div>

        <div className="bank-accounts-section">
          <h2>Thông tin tài khoản ngân hàng chính thức</h2>
          <p className="warning-text">Lưu ý: Chúng tôi chỉ sử dụng các tài khoản dưới đây để nhận thanh toán. Vui lòng kiểm tra kỹ tên chủ tài khoản trước khi chuyển khoản.</p>
          
          <div className="bank-grid">
            <div className="bank-card">
              <div className="bank-name">🏦 Ngân hàng Vietcombank</div>
              <p>Số tài khoản: <strong>00000000000</strong></p>
              <p>Chủ tài khoản: <strong>PHAM GIA PHU</strong></p>
              <p>Chi nhánh: <strong>TP. Hồ Chí Minh</strong></p>
            </div>
            
            <div className="bank-card">
              <div className="bank-name">🟣 Ví điện tử MoMo</div>
              <p>Số điện thoại: <strong>0862098350</strong></p>
              <p>Chủ tài khoản: <strong>PHAM GIA PHU</strong></p>
            </div>
          </div>
        </div>
      </main>

      {/* FOOTER */}
      <footer className="modern-footer">
        <div className="footer-grid">
          <div className="footer-col">
            <h3><span className="accent-text">Master</span>CD.</h3>
            <p>Trải nghiệm âm thanh chất lượng cao nguyên bản dành cho người đam mê thực thụ.</p>
          </div>
          <div className="footer-col">
            <h4>Liên hệ</h4>
            <ul>
              <li>Email:<br/><span className="text-gray-info">2400004862@nttu.edu.vn</span></li>
              <li className="mt-2">Hotline:<br/><span className="text-gray-info">(+84) 0862098350</span></li>
              <li className="mt-2">Địa chỉ:<br/><span className="text-gray-info">331A Đỗ Mười, P. An Phú Đông, TP. HCM</span></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
           <p>© 2026 Nhóm 3 - Lập trình Web. Mọi quyền được bảo lưu.</p>
        </div>
      </footer>
    </div>
  );
}

export default PaymentInfo;