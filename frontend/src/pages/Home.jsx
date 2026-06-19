import '../App.css';
import Footer from '../components/Footer.jsx';

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
          {/* Đã thêm thông báo (Alert) cho nút Kính lúp */}
          <button onClick={() => alert('Chức năng tìm kiếm đang được phát triển!')} style={{ cursor: 'pointer' }}>🔍</button>
          
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

      {/* Đã xóa toàn bộ HTML Footer cũ và gọi Component Footer mới ra dùng */}
      <Footer setCurrentPage={setCurrentPage} />
      
    </div>
  );
}

export default Home;