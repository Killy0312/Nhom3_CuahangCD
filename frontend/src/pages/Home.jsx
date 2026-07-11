import React from 'react';
import '../App.css';
import Header from '../components/Header.jsx'; 
import Footer from '../components/Footer.jsx';

function Home({ setCurrentPage, cart = [] }) {
  // Mảng dữ liệu cứng giả lập cho đĩa bán chạy để trang chủ sinh động hơn
  const bestSellers = [
    { id: 'bs1', name: 'Abbey Road', artist: 'The Beatles', price: '950.000đ', img: '/images/Vinyl01.jpg', tag: 'Bán chạy #1' },
    { id: 'bs2', name: 'Greatest Hits', artist: 'Queen', price: '400.000đ', img: '/images/CD01.jpg', tag: 'Hot Trend' },
    { id: 'bs3', name: 'Minh Tinh', artist: 'Văn Mai Hương', price: '300.000đ', img: '/images/Album07.png', tag: 'Đĩa Việt hot' }, // Chú ý chữ A viết hoa
    { id: 'bs4', name: 'Lux', artist: 'Rosalía', price: '380.000đ', img: '/images/album01.jpg', tag: 'Nhập khẩu' }
  ];

  return (
    <div className="app-container modern-theme">
      
      <Header setCurrentPage={setCurrentPage} cart={cart} />

      {/* BANNER CHÍNH HERO */}
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

      {/* 🆕 SECTION MỚI 1: ĐẶC QUYỀN TẠI MASTERCD (FEATURES BLOCK) */}
      <section className="features-section">
        <div className="features-grid">
          <div className="feature-card">
            <span className="feature-icon">🎧</span>
            <h4>Âm thanh chuẩn Hi-Res</h4>
            <p>Cam kết 100% đĩa gốc không nén âm tầng, giữ trọn vẹn dải tần thu âm.</p>
          </div>
          <div className="feature-card">
            <span className="feature-icon">📦</span>
            <h4>Đóng gói chuyên dụng</h4>
            <p>Hộp carton cứng bọc xốp bong bóng 3 lớp chống móp méo vỏ đĩa tối đa.</p>
          </div>
          <div className="feature-card">
            <span className="feature-icon">🚚</span>
            <h4>Giao hàng hỏa tốc</h4>
            <p>Nhận hàng siêu tốc trong vòng 2 giờ đối với các đơn hàng nội thành.</p>
          </div>
          <div className="feature-card">
            <span className="feature-icon">🔄</span>
            <h4>Đổi trả an tâm</h4>
            <p>Hỗ trợ đổi mới 1-1 trong 7 ngày nếu đĩa gặp lỗi kỹ thuật từ nhà sản xuất.</p>
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

      {/* BẢN PHÁT HÀNH MỚI NHẤT */}
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

      {/* 🆕 SECTION MỚI 2: ĐĨA NHẠC BÁN CHẠY (BEST SELLERS GRID) */}
      <section className="best-sellers-section">
        <div className="section-header">
          <h2>Đĩa nhạc bán chạy tuần này</h2>
          <span className="section-subtitle">Bảng xếp hạng dựa trên số lượng đơn hàng thực tế</span>
        </div>
        
        <div className="home-products-grid">
          {bestSellers.map((item) => (
            <div key={item.id} className="home-product-card" onClick={() => setCurrentPage('products')}>
              <div className="home-img-wrapper">
                <img src={item.img} alt={item.name} onError={(e) => { e.target.src = 'https://via.placeholder.com/300x300/1e222a/475569?text=MasterCD' }} />
                <span className="home-card-badge">{item.tag}</span>
              </div>
              <div className="home-card-info">
                <h4>{item.name}</h4>
                <p>{item.artist}</p>
                <span className="home-card-price">{item.price}</span>
              </div>
            </div>
          ))}
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