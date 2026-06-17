import React, { useState } from 'react';
import './Products.css';

function Products({ setCurrentPage }) {
  const [products] = useState([
    // ==========================================
    // NHÓM 1: 10 ĐĨA CD (ID: 1 -> 10)
    // ==========================================
    { id: 1, name: "Lux", artist: "Rosalía", price: "380.000đ", category: "CD", img: "/images/album01.jpg" },
    { id: 2, name: "Music Has The Right to the children", artist: "Boards of Canada", price: "200.000đ", category: "CD", img: "/images/Album03.jpg" },
    { id: 3, name: "Let God Sort Em Out", artist: "Clipse", price: "300.000đ", category: "CD", img: "/images/Album04.jpg" },
    { id: 4, name: "Willoughby Tucker, I'll Always Love You", artist: "Ethel Cain", price: "500.000đ", category: "CD", img: "/images/Album02.jpg" },
    { id: 5, name: "moisturizer", artist: "Wet Leg", price: "300.000đ", category: "CD", img: "/images/Album05.jpg" },
    { id: 6, name: "Neon Grey Midnight Green", artist: "Neko Case", price: "300.000đ", category: "CD", img: "/images/Allbum06.jpg" },
    { id: 7, name: "Minh Tinh", artist: "Văn Mai Hương", price: "300.000đ", category: "CD", img: "/images/Album07.png" },
    { id: 8, name: "My Home Is Not In This World", artist: "Natalie Bergman", price: "300.000đ", category: "CD", img: "/images/Album08.jpg" },
    { id: 9, name: "An Undying Love for a Burning World", artist: "Neurosis", price: "400.000đ", category: "CD", img: "/images/Album09.jpg" },
    { id: 10, name: "Giai nhân", artist: "Văn Mai Hương", price: "600.000đ", category: "CD", img: "/images/Album10.jpeg" },
    // NHÓM 2: 6 ĐĨA VINYL (ID: 11 -> 16)
    { id: 11, name: "Abbey Road", artist: "The Beatles", price: "950.000đ", category: "Vinyl", img: "/images/Vinyl01.jpg" },
    { id: 12, name: "Greatest Hits", artist: "Queen", price: "400.000đ", category: "Vinyl", img: "/images/CD01.jpg" },
    { id: 13, name: "LINK (A Side B Side Colored Gatefold Vinyl LP)", artist: "Hoàng Thuỳ Linh", price: "800.000đ", category: "Vinyl", img: "/images/Vinyl02.jpg" },
    { id: 14, name: "Maladroit", artist: "Weezer", price: "1.300.000đ", category: "Vinyl", img: "/images/Vinyl03.jpg" },
    { id: 15, name: "Midnights (Moonstone Blue Edition Vinyl)", artist: "Taylor Swift", price: "1.800.000đ", category: "Vinyl", img: "/images/Vinyl04.jpeg" },
    { id: 16, name: "SOS", artist: "SZA", price: "2.000.000đ", category: "Vinyl", img: "/images/Vinyl05.jpeg" },
    // NHÓM 3: 4 BĂNG CASSETTE (ID: 17 -> 20)
    { id: 17, name: "Những Con Sông Ngón Tay", artist: "Hà Trần", price: "350.000đ", category: "Cassette", img: "/images/Cs01.jpg" },
    { id: 18, name: "Justice", artist: "Justin Bieber", price: "200.000đ", category: "Cassette", img: "/images/Cs2.webp" },
    { id: 19, name: "Madame X (Deluxe/ Black)", artist: "Madonna", price: "680.000đ", category: "Cassette", img: "/images/Cs3.jpeg" },
    { id: 20, name: "Honeybee", artist: "Olivia Rodrigo", price: "400.000đ", category: "Cassette", img: "/images/CS4.webp" },
    // NHÓM 4: 5 THIẾT BỊ NGHE (ID: 21 -> 25)
    { id: 21, name: "Sony Walkman Retro", artist: "Sony", price: "1.200.000đ", category: "Thiết bị nghe", img: "/images/mayphat.jpg" },
    { id: 22, name: "Máy pháy băng casset Bauhaus Staircase", artist: "OMD ", price: "1.500.000đ", category: "Thiết bị nghe", img: "/images/TB02.png" },
    { id: 23, name: "Cyrus CD40", artist: "Cyrys", price: "35.500.000đ", category: "Thiết bị nghe", img: "/images/CD03.avif" },
    { id: 24, name: "Cyrus CDi", artist: "Cyrus", price: "27.500.000đ", category: "Thiết bị nghe", img: "/images/TB03.webp" },
    { id: 25, name: "iFi Go Link Max", artist: "iFi", price: "5.500.000đ", category: "Thiết bị nghe", img: "/images/TB04.webp" },
  ]);

  const [activeCategory, setActiveCategory] = useState('Tất cả');
  const [activePage, setActivePage] = useState(1);
  
  // Vẫn giữ hiển thị 12 sản phẩm/trang để duy trì lưới 3 hàng 4 cột chuẩn đẹp
  const itemsPerPage = 12;

  const handleCategoryChange = (cat) => {
    setActiveCategory(cat);
    setActivePage(1); 
  };

  const filteredProducts = activeCategory === 'Tất cả' 
    ? products 
    : products.filter(item => item.category === activeCategory);

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage); 
  const indexOfLastItem = activePage * itemsPerPage; 
  const indexOfFirstItem = indexOfLastItem - itemsPerPage; 
  
  const currentProducts = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="app-container modern-theme">
      {/* HEADER */}
      <header className="main-header">
        <div className="logo-modern" onClick={() => setCurrentPage('home')} style={{ cursor: 'pointer' }}>
          <span className="accent-text">Master</span>CD
        </div>
        <nav className="nav-links">
          <a href="#" onClick={(e) => { e.preventDefault(); setCurrentPage('home'); }}>Trang chủ</a>
          <a href="#" className="active" onClick={(e) => e.preventDefault()}>Sản phẩm</a>
          <a href="#" onClick={(e) => e.preventDefault()}>Thông tin thanh toán</a>
          <a href="#" onClick={(e) => { e.preventDefault(); setCurrentPage('contact'); }}>Liên hệ</a>  
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
        <p>Bộ sưu tập đĩa CD, Vinyl và Cassette chất lượng cao được tuyển chọn khắt khe.</p>
      </section>

      {/* PHẦN LỌC & DANH SÁCH SẢN PHẨM */}
      <main className="products-main">
        {/* Bộ lọc */}
        <div className="filter-bar">
          {['Tất cả', 'CD', 'Vinyl', 'Cassette', 'Thiết bị nghe'].map((cat) => (
            <button 
              key={cat}
              className={`filter-btn ${activeCategory === cat ? 'active' : ''}`}
              onClick={() => handleCategoryChange(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Lưới sản phẩm */}
        <div className="products-grid">
          {currentProducts.map((product) => (
            <div key={product.id} className="product-card">
              
              {/* Vùng hình ảnh có sự kiện click để nhảy sang trang chi tiết */}
              <div 
                className="product-img-wrapper" 
                style={{ cursor: 'pointer' }}
                onClick={() => alert(`Bấm vào đây sẽ mở trang chi tiết của sản phẩm: ${product.name}`)}
              >
                <img 
                  src={product.img} 
                  alt={product.name} 
                  onError={(e) => { e.target.src = 'https://via.placeholder.com/300x300/1e222a/475569?text=MasterCD' }} 
                />
                <span className="product-category-tag">{product.category}</span>
                <div className="product-overlay">
                  <button className="btn-add-to-cart" onClick={(e) => { e.stopPropagation(); alert('Đã thêm vào giỏ hàng!'); }}>
                    Thêm vào giỏ
                  </button>
                </div>
              </div>

              <div className="product-info">
                <h3 
                  className="product-title" 
                  style={{ cursor: 'pointer' }}
                  onClick={() => alert(`Bấm vào tên cũng mở trang chi tiết của: ${product.name}`)}
                >
                  {product.name}
                </h3>
                <p className="product-artist">{product.artist}</p>
                <div className="product-bottom">
                  <span className="product-price">{product.price}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* THANH PHÂN TRANG */}
        {totalPages > 1 && (
          <div className="pagination-container">
            <button 
              className="page-btn nav-btn" 
              disabled={activePage === 1}
              onClick={() => setActivePage(activePage - 1)}
            >
              &lt;
            </button>

            {[...Array(totalPages)].map((_, index) => {
              const pageNumber = index + 1;
              return (
                <button 
                  key={pageNumber}
                  className={`page-btn ${activePage === pageNumber ? 'active' : ''}`}
                  onClick={() => setActivePage(pageNumber)}
                >
                  {pageNumber}
                </button>
              );
            })}

            <button 
              className="page-btn nav-btn" 
              disabled={activePage === totalPages}
              onClick={() => setActivePage(activePage + 1)}
            >
              &gt;
            </button>
          </div>
        )}

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