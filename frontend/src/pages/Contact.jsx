import React from 'react';
import './Contact.css';

function Contact({ setCurrentPage }) {
  return (
    <div className="app-container modern-theme">
      {/* HEADER */}
      <header className="main-header">
        <div 
          className="logo-modern" 
          onClick={() => setCurrentPage('home')} 
          style={{ cursor: 'pointer' }}
          title="Về trang chủ"
        >
          <span className="accent-text">Master</span>CD
        </div>
        <nav className="nav-links">
          <a href="#" onClick={(e) => { e.preventDefault(); setCurrentPage('home'); }}>Trang chủ</a>
          <a href="#" onClick={(e) => { e.preventDefault(); setCurrentPage('products'); }}>Sản phẩm</a>
          <a href="#" onClick={(e) => e.preventDefault()}>Thông tin thanh toán</a>
          <a href="#" className="active" onClick={(e) => e.preventDefault()}>Liên hệ</a>
        </nav>
        <div className="header-icons">
          <button>🔍</button>
          <button>🛒 <span className="cart-badge">0</span></button>
          <button onClick={() => setCurrentPage('login')} className="btn-login" style={{ cursor: 'pointer' }}>Đăng nhập</button>
        </div>
      </header>

      {/* BANNER LIÊN HỆ */}
      <section className="contact-banner">
        <h1>Kết nối với <span className="accent-text">MasterCD</span></h1>
        <p>Chúng tôi luôn lắng nghe mọi ý kiến đóng góp từ bạn.</p>
      </section>

      {/* NỘI DUNG CHÍNH (Chia 2 cột: Thông tin + Form) */}
      <main className="contact-main">
        <div className="contact-grid">
          
          {/* CỘT TRÁI: Thông tin & Bản đồ */}
          <div className="contact-info-side">
            <h2>Thông tin cửa hàng</h2>
            <div className="info-list">
              <div className="info-item">
                <span className="info-icon">📍</span>
                <div>
                  <strong>Địa chỉ:</strong>
                  <p>331A-331B Đỗ Mười, P. An Phú Đông, TP. HCM</p>
                </div>
              </div>
              <div className="info-item">
                <span className="info-icon">📞</span>
                <div>
                  <strong>Điện thoại:</strong>
                  <p>(+84) 0862098350</p>
                </div>
              </div>
              <div className="info-item">
                <span className="info-icon">✉️</span>
                <div>
                  <strong>Email:</strong>
                  <p>2400004862@nttu.edu.vn</p>
                </div>
              </div>
              <div className="info-item">
                <span className="info-icon">⏰</span>
                <div>
                  <strong>Giờ hoạt động:</strong>
                  <p>Thứ 2 - Chủ Nhật: 8:00 AM - 10:00 PM</p>
                </div>
              </div>
            </div>

            {/* Google Maps Embed tự động trỏ về Đỗ Mười */}
            <div className="map-container">
              <iframe 
                src="https://maps.google.com/maps?q=331A%20Đỗ%20Mười,%20P.%20An%20Phú%20Đông,%20TP.%20HCM&t=&z=16&ie=UTF8&iwloc=&output=embed" 
                width="100%" 
                height="250" 
                style={{ border: 0, borderRadius: '12px' }} 
                allowFullScreen="" 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="Bản đồ MasterCD"
              ></iframe>
            </div>
          </div>

          {/* CỘT PHẢI: Form Gửi mail */}
          <div className="contact-form-side">
            <h2>Gửi ý kiến phản hồi</h2>
            <p>Hãy để lại lời nhắn, chúng tôi sẽ phản hồi bạn qua email sớm nhất có thể.</p>
            <form 
              className="contact-form" 
              onSubmit={(e) => { 
                e.preventDefault(); 
                alert('Tuyệt vời! Lời nhắn của bạn đã được gửi đến MasterCD.'); 
              }}
            >
              <div className="form-group">
                <label>Họ và Tên *</label>
                <input type="text" placeholder="Nhập tên của bạn" required />
              </div>
              <div className="form-group">
                <label>Email *</label>
                <input type="email" placeholder="Nhập địa chỉ email" required />
              </div>
              <div className="form-group">
                <label>Chủ đề</label>
                <input type="text" placeholder="Bạn cần hỗ trợ về vấn đề gì?" />
              </div>
              <div className="form-group">
                <label>Nội dung *</label>
                <textarea rows="5" placeholder="Nhập lời nhắn của bạn..." required></textarea>
              </div>
              <button type="submit" className="btn-submit-contact">Gửi lời nhắn</button>
            </form>
          </div>

        </div>
      </main>

      {/* FOOTER */}
      <footer className="modern-footer">
        <div className="footer-grid">
          <div className="footer-col">
            <h3><span className="accent-text">Master</span>CD.</h3>
            <p>Trải nghiệm âm thanh chất lượng cao nguyên bản dành cho người đam mê thực thụ.</p>
            <div className="social-links-modern">
              <span>FB</span> <span>IG</span> <span>TW</span>
            </div>
          </div>
          <div className="footer-col">
            <h4>Sản phẩm</h4>
            <ul>
              <li><a href="#" onClick={(e) => { e.preventDefault(); setCurrentPage('products'); }}>Đĩa CD Hi-Res</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); setCurrentPage('products'); }}>Đĩa Than (Vinyl)</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); setCurrentPage('products'); }}>Băng Cassette</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); setCurrentPage('products'); }}>Thiết bị phát</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Hỗ trợ</h4>
            <ul>
              <li><a href="#" onClick={(e) => e.preventDefault()}>Thông tin thanh toán</a></li>
              <li><a href="#" onClick={(e) => e.preventDefault()}>Hướng dẫn mua hàng</a></li>
              <li><a href="#" onClick={(e) => e.preventDefault()}>Chính sách đổi trả</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Dịch vụ</h4>
            <ul>
              <li><a href="#" onClick={(e) => e.preventDefault()}>Câu hỏi thường gặp</a></li>
              <li><a href="#" onClick={(e) => e.preventDefault()}>Theo dõi đơn hàng</a></li>
              <li><a href="#" onClick={(e) => e.preventDefault()}>Bảo mật thông tin</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Liên hệ</h4>
            <ul>
              <li>Email:<br/><span className="text-gray-info">2400004862@nttu.edu.vn</span></li>
              <li className="mt-2">Hotline:<br/><span className="text-gray-info">(+84) 0862098350</span></li>
              <li className="mt-2">Giờ làm việc:<br/><span className="text-gray-info">8:00 AM - 10:00 PM</span></li>
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

export default Contact;