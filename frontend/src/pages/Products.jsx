import React, { useState, useEffect } from 'react'; 
import './Products.css';
import Header from '../components/Header.jsx'; 
import Footer from '../components/Footer.jsx'; 

function Products({ setCurrentPage, addToCart, cart }) {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [activeCategory, setActiveCategory] = useState('Tất cả');
  const [activeGenre, setActiveGenre] = useState('Tất cả');
  const [activePage, setActivePage] = useState(1);
  
  const [isFormatOpen, setIsFormatOpen] = useState(true);
  const [isGenreOpen, setIsGenreOpen] = useState(true);
  
  const [toast, setToast] = useState({ show: false, message: '' });
  const [toastTimer, setToastTimer] = useState(null);
  
  const itemsPerPage = 12;
  const genresList = ['Tất cả', 'Rock', 'Metal', 'Ambient', 'Jazz', 'Pop', 'Electronic'];

  // 🔥 HÀM TỰ ĐỘNG CHUYỂN SỐ THÔ THÀNH DẠNG 32.000.000đ
  const formatPriceDisplay = (priceVal) => {
    if (!priceVal) return '0đ';
    const str = String(priceVal).trim();
    if (str.endsWith('đ') && str.includes('.')) return str; // Đã đúng định dạng
    const num = parseInt(str.replace(/\D/g, '')) || 0;
    return num.toLocaleString('vi-VN') + 'đ';
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/products');
        let apiProducts = [];
        if (response.ok) {
          apiProducts = await response.json();
        }

        const localCustoms = JSON.parse(localStorage.getItem('customProducts')) || [];

        const mergedProducts = [
          ...localCustoms,
          ...apiProducts.filter(apiItem => 
            !localCustoms.some(localItem => (localItem._id || localItem.id) === (apiItem._id || apiItem.id))
          )
        ];

        setProducts(mergedProducts);
      } catch (error) {
        console.error("Lỗi tải sản phẩm:", error);
        const localCustoms = JSON.parse(localStorage.getItem('customProducts')) || [];
        setProducts(localCustoms);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []); 

  const triggerToast = (msg) => {
    if (toastTimer) clearTimeout(toastTimer);
    setToast({ show: true, message: msg });
    const timer = setTimeout(() => setToast({ show: false, message: '' }), 3000);
    setToastTimer(timer);
  };

  const handleCategoryChange = (cat) => {
    setActiveCategory(cat);
    setActivePage(1); 
  };

  const handleGenreChange = (genre) => {
    setActiveGenre(genre);
    setActivePage(1);
  };

  const filteredProducts = products.filter(item => {
    const matchCategory = activeCategory === 'Tất cả' || item.category === activeCategory;
    const itemGenre = item.genre || 'Khác';
    const matchGenre = activeGenre === 'Tất cả' || itemGenre.toLowerCase() === activeGenre.toLowerCase();
    return matchCategory && matchGenre;
  });

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage); 
  const indexOfLastItem = activePage * itemsPerPage; 
  const indexOfFirstItem = indexOfLastItem - itemsPerPage; 
  const currentProducts = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="app-container modern-theme">
      <Header setCurrentPage={setCurrentPage} cart={cart} />

      <section className="products-banner">
        <h1>Khám phá <span className="accent-text">Kho tàng âm nhạc</span></h1>
        <p>Bộ sưu tập đĩa CD, Vinyl và Cassette chất lượng cao được tuyển chọn khắt khe.</p>
      </section>

      <main className="products-layout-container">
        <aside className="products-sidebar">
          <div className="sidebar-filter-group">
            <h3 onClick={() => setIsFormatOpen(!isFormatOpen)} className="sidebar-toggle-title">
              <span>Định dạng đĩa</span>
              <span className={`arrow-icon ${isFormatOpen ? 'open' : ''}`}>▼</span>
            </h3>
            {isFormatOpen && (
              <ul className="sidebar-filter-list">
                {['Tất cả', 'CD', 'Vinyl', 'Cassette', 'Thiết bị nghe'].map((cat) => (
                  <li 
                    key={cat} 
                    className={activeCategory === cat ? 'active' : ''} 
                    onClick={() => handleCategoryChange(cat)}
                  >
                    {cat}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="sidebar-filter-group">
            <h3 onClick={() => setIsGenreOpen(!isGenreOpen)} className="sidebar-toggle-title">
              <span>Thể loại / Dòng nhạc</span>
              <span className={`arrow-icon ${isGenreOpen ? 'open' : ''}`}>▼</span>
            </h3>
            {isGenreOpen && (
              <ul className="sidebar-filter-list">
                {genresList.map((genre) => (
                  <li 
                    key={genre} 
                    className={activeGenre === genre ? 'active' : ''} 
                    onClick={() => handleGenreChange(genre)}
                  >
                    {genre}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </aside>

        <section className="products-content-right">
          {isLoading ? (
            <div className="loading-container" style={{ textAlign: 'center', padding: '50px', color: '#00e5ff' }}>
              <h2>Đang tải kho nhạc từ Server...</h2>
            </div>
          ) : (
            <>
              <div className="products-grid">
                {currentProducts.map((product) => (
                  <div key={product._id || product.id} className="product-card"> 
                    <div 
                      className="product-img-wrapper" 
                      style={{ cursor: 'pointer' }}
                      onClick={() => setCurrentPage('product-detail', product)}
                    >
                      <img 
                        src={product.img} 
                        alt={product.name} 
                        onError={(e) => { e.target.src = 'https://via.placeholder.com/300x300/1e222a/475569?text=MasterCD' }} 
                      />
                      <span className="product-category-tag">{product.category}</span>
                      {product.genre && product.genre !== 'Thiết bị' && (
                        <span className="product-genre-tag">{product.genre}</span>
                      )}
                      
                      <div className="product-overlay">
                        <button 
                          className="btn-add-to-cart" 
                          onClick={(e) => { 
                            e.stopPropagation(); 
                            
                            const token = localStorage.getItem('token');
                            if (!token) {
                              triggerToast("Bạn cần đăng nhập tài khoản để mua sắm!");
                              setTimeout(() => setCurrentPage('login'), 1200);
                              return;
                            }

                            const success = addToCart(product); 
                            if (success) {
                              triggerToast(`Đã thêm "${product.name}" vào giỏ hàng thành công!`); 
                            }
                          }}
                        >
                          Thêm vào giỏ
                        </button>
                      </div>
                    </div>
                    
                    <div className="product-info">
                      <h3 
                        className="product-title" 
                        style={{ cursor: 'pointer' }}
                        onClick={() => setCurrentPage('product-detail', product)}
                      >
                        {product.name}
                      </h3>
                      <p className="product-artist">{product.artist}</p>
                      <div className="product-bottom">
                        {/* 🔥 HIỂN THỊ GIÁ ĐÃ DỌN ĐỊNH DẠNG CHUẨN ĐẸP */}
                        <span className="product-price">{formatPriceDisplay(product.price)}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
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

              {filteredProducts.length === 0 && (
                <div className="no-products" style={{ textAlign: 'center', padding: '100px 0', color: '#94a3b8' }}>
                  <p style={{ fontSize: '18px' }}>Chưa có sản phẩm nào thuộc mục này trong kho hàng.</p>
                </div>
              )}
            </>
          )}
        </section>
      </main>

      <div className={`toast-notification ${toast.show ? 'show' : ''}`}>
        <div className="toast-content">
          <span className="toast-text">{toast.message}</span>
        </div>
        <div className="toast-progress-bar"></div>
      </div>

      <Footer setCurrentPage={setCurrentPage} />
    </div>
  );
}

export default Products;