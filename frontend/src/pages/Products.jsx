import React, { useState, useEffect } from 'react'; 
import './Products.css';
import Header from '../components/Header.jsx'; 
import Footer from '../components/Footer.jsx'; 

function Products({ setCurrentPage, addToCart, cart }) {
  const [products, setProducts] = useState([]);
  
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/products');
        
        if (response.ok) {
          const data = await response.json();
          setProducts(data); 
        } else {
          console.error("Lỗi khi tải dữ liệu từ Server");
        }
      } catch (error) {
        console.error("Mất kết nối tới Backend:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []); 

  const [activeCategory, setActiveCategory] = useState('Tất cả');
  const [activePage, setActivePage] = useState(1);
  
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
      
      {/* THAY THẾ TOÀN BỘ KHỐI HEADER CŨ BẰNG 1 DÒNG NÀY */}
      <Header setCurrentPage={setCurrentPage} cart={cart} />

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

        {/* Xử lý hiển thị trong lúc chờ Loading hoặc Database rỗng */}
        {isLoading ? (
          <div className="loading-container" style={{ textAlign: 'center', padding: '50px', color: '#00e5ff' }}>
            <h2>Đang tải kho nhạc từ Server... 🎧</h2>
          </div>
        ) : (
          <>
            {/* Lưới sản phẩm */}
            <div className="products-grid">
              {currentProducts.map((product) => (
                <div key={product._id || product.id} className="product-card"> 
                  {/* Chú ý: MongoDB tự cấp ID có tên là _id, nên thêm _id để tránh lỗi */}
                  
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
                    <div className="product-overlay">
                      <button 
                        className="btn-add-to-cart" 
                        onClick={(e) => { 
                          e.stopPropagation(); 
                          addToCart(product); 
                          alert(`Đã thêm ${product.name} vào giỏ hàng!`); 
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
                      <span className="product-price">{product.price}</span>
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
              <div className="no-products" style={{ textAlign: 'center', padding: '50px', color: '#94a3b8' }}>
                <p>Opps! Chưa có sản phẩm nào trong kho dữ liệu.</p>
              </div>
            )}
          </>
        )}
      </main>

      <Footer setCurrentPage={setCurrentPage} />
    </div>
  );
}

export default Products;