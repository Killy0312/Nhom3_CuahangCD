import React from 'react';
import './Contact.css';
import Header from '../components/Header.jsx'; 
import Footer from '../components/Footer.jsx'; 

function Contact({ setCurrentPage, cart = [] }) {
  return (
    <div className="app-container modern-theme">
      
      <Header setCurrentPage={setCurrentPage} cart={cart} />

      <section className="contact-banner">
        <h1>Kết nối với <span className="accent-text">MasterCD</span></h1>
        <p>Chúng tôi luôn lắng nghe mọi ý kiến đóng góp từ bạn.</p>
      </section>

      <main className="contact-main">
        <div className="contact-grid">
          
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

      <Footer setCurrentPage={setCurrentPage} />
    </div>
  );
}

export default Contact;