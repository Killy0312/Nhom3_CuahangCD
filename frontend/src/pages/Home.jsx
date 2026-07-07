import React from 'react';
import '../App.css';
import Header from '../components/Header.jsx'; 
import Footer from '../components/Footer.jsx';

function Home({ setCurrentPage, cart = [] }) {
  return (
    <div className="app-container modern-theme">
      
      {/* CHỈ CẦN 1 DÒNG NÀY ĐỂ GỌI HEADER DÙNG CHUNG */}
      <Header setCurrentPage={setCurrentPage} cart={cart} />

      {/* BANNER CHÍNH */}
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

      {/* PHÂN LOẠI ĐỊNH DẠNG */}
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

      {/* BẢN PHÁT HÀNH MỚI */}
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

      {/* TRIẾT LÝ SẢN PHẨM */}
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

      <Footer setCurrentPage={setCurrentPage} />
    </div>
  );
}

export default Home;