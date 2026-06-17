import React, { useState } from 'react';
import './Products.css';

function Products({ setCurrentPage }) {
  // 1. Dữ liệu ảo (Mock Data) - Sau này Back-end chỉ cần trả API dạng này là xong
  const [products] = useState([
    { id: 1, name: "Motomami", artist: "Rosalía", price: "450.000đ", category: "CD", img: "/images/album01.jpg" },
    { id: 2, name: "Music Has The Right...", artist: "Boards of Canada", price: "850.000đ", category: "Vinyl", img: "/images/Album03.jpg" },
    { id: 3, name: "The Scotts", artist: "Travis Scott", price: "900.000đ", category: "Vinyl", img: "/images/Album04.jpg" },
    { id: 4, name: "Folklore", artist: "Taylor Swift", price: "500.000đ", category: "CD", img: "/images/Album02.jpg" },
    { id: 5, name: "Sony Walkman Retro", artist: "Sony", price: "1.200.000đ", category: "Phụ kiện", img: "/images/mayphat.jpg" },
    { id: 6, name: "Mix Tape Vol.1", artist: "Various Artists", price: "150.000đ", category: "Cassette", img: "/images/cassette.jpg" },
    { id: 7, name: "Abbey Road", artist: "The Beatles", price: "950.000đ", category: "Vinyl", img: "/images/Vinyl01.jpg" },
    { id: 8, name: "Greatest Hits", artist: "Queen", price: "400.000đ", category: "CD", img: "/images/CD01.jpg" },
  ]);

  // State để lưu danh mục đang được chọn (Mặc định là 'Tất cả')
  const [activeCategory, setActiveCategory] = useState('Tất cả');

  // Lọc sản phẩm theo danh mục
  const filteredProducts = activeCategory === 'Tất cả' 
    ? products 
    : products.filter(item => item.category === activeCategory);

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
          <a href="#" className="active" onClick={(e) => e.preventDefault()}>Sản phẩm</a>
          <a href="#" onClick={(e) => e.preventDefault()}>Thông tin thanh toán</a>
          <a href="#" onClick={(e) => e.preventDefault()}>Liên hệ</a>
        </nav>
        <div className="header-icons">
          <button>🔍</button>
          <button>🛒 <span className="cart-badge">0</span></button>
          <button onClick={() => setCurrentPage('login')} className="btn-login" style={{ cursor: 'pointer' }}>Đăng nhập</button>
        </div>
      </header>

      {/* BANNER SẢN PHẨM */}
      <section className="products-banner">
        <h1>Khám phá <span className="accent-text">Kho tàng âm nhạc</span></h1>
        <p>Hơn 1,000+ đĩa CD, Vinyl và Cassette chất lượng cao đang chờ bạn.</p>
      </section>

      {/* PHẦN LỌC & DANH SÁCH SẢN PHẨM */}
      <main className="products-main">
        {/* Bộ lọc */}
        <div className="filter-bar">
          {['Tất cả', 'CD', 'Vinyl', 'Cassette', 'Phụ kiện'].map((cat) => (
            <button 
              key={cat}
              className={`filter-btn ${activeCategory === cat ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Lưới sản phẩm */}
        <div className="products-grid">
          {filteredProducts.map((product) => (
            <div key={product.id} className="product-card">
              <div className="product-img-wrapper">
                {/* Dùng URL ảnh lỗi dự phòng để tránh web bị bể nếu bạn chưa copy ảnh */}
                <img 
                  src={product.img} 
                  alt={product.name} 
                  onError={(e) => { e.target.src = 'https://via.placeholder.com/300x300/1e222a/475569?text=MasterCD' }} 
                />
                <span className="product-category-tag">{product.category}</span>
                <div className="product-overlay">
                  <button className="btn-add-to-cart">Thêm vào giỏ</button>
                </div>
              </div>
              <div className="product-info">
                <h3 className="product-title">{product.name}</h3>
                <p className="product-artist">{product.artist}</p>
                <div className="product-bottom">
                  <span className="product-price">{product.price}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Thông báo nếu không có sản phẩm */}
        {filteredProducts.length === 0 && (
          <div className="no-products">
            <p>Hiện chưa có sản phẩm nào trong danh mục này.</p>
          </div>
        )}
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
              <li><a href="#">Đĩa CD Hi-Res</a></li>
              <li><a href="#">Đĩa Than (Vinyl)</a></li>
              <li><a href="#">Băng Cassette</a></li>
              <li><a href="#">Thiết bị phát</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Hỗ trợ</h4>
            <ul>
              <li><a href="#">Thông tin thanh toán</a></li>
              <li><a href="#">Hướng dẫn mua hàng</a></li>
              <li><a href="#">Chính sách đổi trả</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Dịch vụ</h4>
            <ul>
              <li><a href="#">Câu hỏi thường gặp</a></li>
              <li><a href="#">Theo dõi đơn hàng</a></li>
              <li><a href="#">Bảo mật thông tin</a></li>
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

export default Products;