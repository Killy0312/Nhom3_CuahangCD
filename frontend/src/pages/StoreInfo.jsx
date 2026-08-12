import React from 'react';
import './StoreInfo.css';
import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';

function StoreInfo({ setCurrentPage, cart = [] }) {
  return (
    <div className="app-container modern-theme">
      <Header setCurrentPage={setCurrentPage} cart={cart} />

      <main className="store-info-main">
        {/* 1. HERO BANNER GIỚI THIỆU SANG TRỌNG */}
        <section className="store-hero-section">
          <div className="store-hero-overlay"></div>
          <div className="store-hero-content">
            <span className="store-badge">CÂU CHUYỆN THƯƠNG HIỆU MASTERCD</span>
            <h1>Bảo Tồn & Lan Tỏa <br/><span className="accent-text">Chất Âm Nguyên Bản</span></h1>
            <p>
              Hành trình mang trải nghiệm âm thanh phòng thu Hi-Fi chuẩn mực thông qua các ấn bản đĩa vật lý CD, Vinyl đĩa than và Cassette tuyển chọn khắt khe.
            </p>
          </div>
        </section>

        <div className="store-container">
          
          {/* 2. KHU VỰC SỨ MỆNH & HÌNH ẢNH MINH HỌA NỔI BẬT */}
          <section className="store-about-grid">
            <div className="store-text-card">
              <span className="sub-title-accent">TRIẾT LÝ PHÁT TRIỂN</span>
              <h2>Sứ Mệnh Với Âm Thanh Hi-End</h2>
              <p>
                Trong kỷ nguyên của nhạc số nén và tai nghe Bluetooth tiện lợi nhưng hạn chế dải tần, <strong>MasterCD</strong> được thành lập nhằm giữ gìn nguyên vẹn giá trị của âm thanh thuần khiết. Mỗi chiếc đĩa CD hay đĩa Than Vinyl tại đây đều được đúc từ bản Master phòng thu không nén, đem đến âm hình độ phân giải cao nhất cho hệ thống âm thanh của bạn.
              </p>
              <p className="highlight-quote">
                "Chúng tôi không đơn thuần bán đĩa nhạc – chúng tôi trao gửi những tác phẩm nghệ thuật vật lý trường tồn theo thời gian."
              </p>
            </div>

            {/* HÌNH ẢNH SHOWROOM VỚI CÁC Ô THỐNG KÊ NỔI (FLOATING STATS) */}
            <div className="store-visual-stats-card">
              <div className="visual-img-wrapper">
                <img 
                  src="https://images.unsplash.com/photo-1539375665275-f9de415ef9ac?q=80&w=1000&auto=format&fit=crop" 
                  alt="Không gian nghe nhạc MasterCD" 
                  onError={(e) => { e.target.src = 'https://via.placeholder.com/600x400/1e222a/00e5ff?text=MasterCD+Audio+Space'; }}
                />
                <div className="img-dark-gradient"></div>
              </div>

              <div className="stats-floating-overlay">
                <div className="stat-pill-item">
                  <span className="stat-num">100%</span>
                  <span className="stat-lbl">Đĩa gốc nhập khẩu</span>
                </div>
                <div className="stat-pill-item">
                  <span className="stat-num">5.000+</span>
                  <span className="stat-lbl">Album CD & Vinyl</span>
                </div>
                <div className="stat-pill-item">
                  <span className="stat-num">10.000+</span>
                  <span className="stat-lbl">Audiophile tin tưởng</span>
                </div>
              </div>
            </div>
          </section>

          {/* 3. KHU VỰC 4 GIÁ TRỊ CỐT LÕI (DÙNG VECTOR SVG CAO CẤP) */}
          <section className="store-values-section">
            <div className="section-title-box">
              <span className="sub-title-accent">CAM KẾT THƯƠNG HIỆU</span>
              <h2 className="section-title-center">Vì Sao Chọn <span className="accent-text">MasterCD</span>?</h2>
            </div>
            
            <div className="values-grid">
              
              {/* CARD 1 */}
              <div className="value-card">
                <div className="value-icon-box">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#00e5ff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <circle cx="12" cy="12" r="3"></circle>
                    <path d="M12 2a10 10 0 0 1 10 10"></path>
                  </svg>
                </div>
                <h3>Chất Lượng Master 100%</h3>
                <p>Đĩa nhạc đúc chuẩn dải tần gốc, bảo toàn toàn vẹn tín hiệu âm thanh master không nén từ phòng thu.</p>
              </div>

              {/* CARD 2 */}
              <div className="value-card">
                <div className="value-icon-box">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#00e5ff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                    <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
                    <line x1="12" y1="22.08" x2="12" y2="12"></line>
                  </svg>
                </div>
                <h3>Bảo Quản Chuyên Dụng</h3>
                <p>Đóng gói 3 lớp chống ẩm, xốp bóng khí bong bóng va đập và khung giữ chống cong vênh vỏ đĩa tối đa.</p>
              </div>

              {/* CARD 3 */}
              <div className="value-card">
                <div className="value-icon-box">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#00e5ff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                    <polyline points="9 11 12 14 22 4"></polyline>
                  </svg>
                </div>
                <h3>Bảo Hành 1-Đổi-1</h3>
                <p>Cam kết 1-đổi-1 lập tức trong 7 ngày nếu đĩa dính lỗi kỹ thuật, trầy xước từ nhà sản xuất hoặc đĩa bị vấp.</p>
              </div>

              {/* CARD 4 */}
              <div className="value-card">
                <div className="value-icon-box">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#00e5ff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 18v-6a9 9 0 0 1 18 0v6"></path>
                    <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"></path>
                  </svg>
                </div>
                <h3>Phòng Nghe Hi-End</h3>
                <p>Showroom được thiết kế cách âm tiêu chuẩn, trang bị các bộ đầu phát và dàn loa Hi-Fi đỉnh cao để khách hàng thử đĩa.</p>
              </div>

            </div>
          </section>

          {/* 4. KHU VỰC KHÔNG GIAN SHOWROOM & LIÊN HỆ ĐỊA CHỈ */}
          <section className="store-showroom-section">
            <div className="showroom-info-col">
              <span className="sub-title-accent">ĐIỂM HẸN AUDIOPHILE</span>
              <h2>Ghé Thăm Showroom MasterCD</h2>
              <p className="showroom-desc">
                Trải nghiệm trực tiếp hàng ngàn tựa đĩa CD, Vinyl độc bản trong không gian âm thanh chuẩn mực tại showroom của chúng tôi.
              </p>

              <div className="contact-details-list">
                <div className="contact-item">
                  <div className="c-icon">📍</div>
                  <div>
                    <strong>Địa chỉ Showroom:</strong>
                    <p>331 Quốc lộ 1A, phường An Phú Đông, Quận 12, TP. Hồ Chí Minh</p>
                  </div>
                </div>

                <div className="contact-item">
                  <div className="c-icon">📞</div>
                  <div>
                    <strong>Hotline Tư vấn & Đặt đĩa:</strong>
                    <p>(+84) 0862098350</p>
                  </div>
                </div>

                <div className="contact-item">
                  <div className="c-icon">✉️</div>
                  <div>
                    <strong>Email Hỗ trợ Khách hàng:</strong>
                    <p>2400004862@nttu.edu.vn</p>
                  </div>
                </div>

                <div className="contact-item">
                  <div className="c-icon">🕒</div>
                  <div>
                    <strong>Giờ mở cửa đón khách:</strong>
                    <p>08:00 AM – 22:00 PM (Tất cả các ngày trong tuần)</p>
                  </div>
                </div>
              </div>

              <button className="btn-explore-catalog" onClick={() => setCurrentPage('products')}>
                KHÁM PHÁ KHO ĐĨA NHẠC NGAY ➔
              </button>
            </div>

            <div className="showroom-gallery-col">
              <div className="gallery-main-frame">
                <img 
                  src="/images/mayphat.jpg" 
                  alt="Thiết bị đầu phát MasterCD" 
                  onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1545454675-3531b543be5d?q=80&w=800&auto=format&fit=crop'; }} 
                />
                <div className="frame-badge">Đầu Phát & Amply Âm Thanh Hi-Fi</div>
              </div>
            </div>
          </section>

        </div>
      </main>

      <Footer setCurrentPage={setCurrentPage} />
    </div>
  );
}

export default StoreInfo;