import '../App.css';
function Home({ setCurrentPage, cart = [] }) {
  return (
    <div className="app-container modern-theme">
      <header className="main-header">
        <div 
          className="logo-modern" 
          onClick={() => setCurrentPage('home')}
          style={{ cursor: 'pointer' }}
        >
          <span className="accent-text">Master</span>CD
        </div>
        <nav className="nav-links">
          <a href="#" className="active" onClick={(e) => { e.preventDefault(); setCurrentPage('home'); }}>Trang chủ</a>
          <a href="#" onClick={(e) => { e.preventDefault(); setCurrentPage('products'); }}>Sản phẩm</a>
          
          <a href="#" onClick={(e) => { e.preventDefault(); setCurrentPage('payment-info'); }}>Thông tin thanh toán</a>
          <a href="#" onClick={(e) => { e.preventDefault(); setCurrentPage('contact'); }}>Liên hệ</a>  
        </nav>
        <div className="header-icons">
          <button>🔍</button>
          <button onClick={() => setCurrentPage('cart')} style={{ cursor: 'pointer' }}>
            🛒 <span className="cart-badge">{cart.reduce((total, item) => total + item.quantity, 0)}</span>
          </button>
          <button onClick={() => setCurrentPage('login')} className="btn-login" style={{ cursor: 'pointer' }}>
            Đăng nhập
          </button>
        </div>
      </header>

      <section className="hero-banner">
        <div className="hero-content">
          <span className="badge">Chất lượng 16-bit,44.1kHz</span>
          <h1>Trải nghiệm âm thanh <br/><span className="accent-text">nguyên bản.</span></h1>
          <p>
            Bộ sưu tập đĩa CD vật lý với chất lượng thu âm phòng thu. <br/>
            Dành riêng cho đôi tai khắt khe nhất.
          </p>
          <div className="hero-buttons">
            <button className="btn-primary" onClick={() => setCurrentPage('products')}>Mua sắm ngay</button>
            <button className="btn-outline" onClick={() => setCurrentPage('products')}>Xem bộ sưu tập</button>
          </div>
        </div>
        <div className="hero-image">
           <div className="vinyl-placeholder">
             <img src="/images/CD.png" alt="Đĩa CD" className="spinning-cd-img" />
           </div>
        </div>
      </section>

      <section className="categories-section">
        <h2>Phân loại định dạng</h2>
        <div className="category-grid">
          <div className="category-card" onClick={() => setCurrentPage('products')} style={{ cursor: 'pointer' }}>
            <img src="/images/CD01.jpg" alt="CD" className="category-img-circle" style={{ objectFit: 'cover' }} />
            <h3>CD</h3>
          </div>
          <div className="category-card" onClick={() => setCurrentPage('products')} style={{ cursor: 'pointer' }}>
            <img src="/images/Vinyl01.jpg" alt="Vinyl (Đĩa than)" className="category-img-circle" style={{ objectFit: 'cover' }} />
            <h3>Vinyl (Đĩa than)</h3>
          </div>
          <div className="category-card" onClick={() => setCurrentPage('products')} style={{ cursor: 'pointer' }}>
            <img src="/images/cassette.jpg" alt="Cassette" className="category-img-circle" style={{ objectFit: 'cover' }} />
            <h3>Cassette</h3>
          </div>
          <div className="category-card" onClick={() => setCurrentPage('products')} style={{ cursor: 'pointer' }}>
            <img src="/images/mayphat.jpg" alt="Phụ kiện" className="category-img-circle" style={{ objectFit: 'cover' }} />
            <h3>Thiết bị nghe</h3>
          </div>
        </div>
      </section>

      <section className="new-release-section">
        <div className="section-header">
          <h2>Bản phát hành mới nhất</h2>
          <a href="#" className="view-all" onClick={(e) => { e.preventDefault(); setCurrentPage('products'); }}>Xem tất cả ➔</a>
        </div>
        <div className="release-horizontal">
          <img src="/images/album01.jpg" alt="Album 1" className="release-card" style={{ objectFit: 'cover', cursor: 'pointer' }} onClick={() => setCurrentPage('products')} />
          <img src="/images/Album02.jpg" alt="Album 2" className="release-card" style={{ objectFit: 'cover', cursor: 'pointer' }} onClick={() => setCurrentPage('products')} />
          <img src="/images/Album03.jpg" alt="Album 3" className="release-card" style={{ objectFit: 'cover', cursor: 'pointer' }} onClick={() => setCurrentPage('products')} />
          <img src="/images/Album04.jpg" alt="Album 4" className="release-card" style={{ objectFit: 'cover', cursor: 'pointer' }} onClick={() => setCurrentPage('products')} />
        </div>
      </section>

      <section className="story-section reverse">
        <div className="story-text">
          <span className="subtitle">Triết lý âm thanh</span>
          <h2>Không nén. Không thỏa hiệp.</h2>
          <p>
            Trong thời đại của nhạc số nén và tai nghe bluetooth tiện lợi, chúng tôi giữ lại giá trị của âm thanh thuần khiết. Mỗi chiếc đĩa CD tại đây đều được tinh tuyển để mang lại trải nghiệm độ phân giải cao nhất cho hệ thống âm thanh của bạn.
          </p>
        </div>
        <img src="/images/quality01.png" alt="Hệ thống loa" className="story-img-placeholder" style={{ objectFit: 'contain' }} />
      </section>

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
              {/* ĐÃ FIX LỖI: Gắn lệnh chuyển sang trang Checkout ở Footer */}
              <li><a href="#" onClick={(e) => { e.preventDefault(); setCurrentPage('checkout'); }}>Thông tin thanh toán</a></li>
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

export default Home;