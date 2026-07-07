import React from 'react';
import './Cart.css';
import Header from '../components/Header.jsx'; 
import Footer from '../components/Footer.jsx'; 

function Cart({ setCurrentPage, cart, updateCartItem }) {
  const parsePrice = (priceStr) => parseInt(priceStr.replace(/\D/g, '')) || 0;
  
  const formatPrice = (num) => num.toLocaleString('vi-VN') + 'đ';

  const totalPrice = cart.reduce((total, item) => total + (parsePrice(item.price) * item.quantity), 0);

  return (
    <div className="app-container modern-theme">
      
      {/* THAY TOÀN BỘ KHỐI HEADER BẰNG DÒNG NÀY */}
      <Header setCurrentPage={setCurrentPage} cart={cart} />

      <main className="cart-main">
        <h1>Giỏ hàng của bạn</h1>
        
        {cart.length === 0 ? (
          <div className="empty-cart">
            <p>Giỏ hàng đang trống.</p>
            <button className="btn-primary mt-2" onClick={() => setCurrentPage('products')}>Tiếp tục mua sắm</button>
          </div>
        ) : (
          <div className="cart-layout">
            <div className="cart-items-section">
              <table className="cart-table">
                <thead>
                  <tr>
                    <th>Sản phẩm</th>
                    <th>Giá</th>
                    <th>Số lượng</th>
                    <th>Tạm tính</th>
                    <th>Xóa</th>
                  </tr>
                </thead>
                <tbody>
                  {cart.map(item => (
                    <tr key={item.id}>
                      <td className="cart-product-cell">
                        <img src={item.img} alt={item.name} className="cart-img" />
                        <div>
                          <strong>{item.name}</strong>
                          <span className="cart-category">{item.category}</span>
                        </div>
                      </td>
                      <td>{item.price}</td>
                      <td>
                        <div className="quantity-control">
                          <button onClick={() => updateCartItem(item.id, item.quantity - 1)}>-</button>
                          <input 
                            type="number" 
                            value={item.quantity} 
                            onChange={(e) => updateCartItem(item.id, parseInt(e.target.value) || 1)}
                            min="1"
                          />
                          <button onClick={() => updateCartItem(item.id, item.quantity + 1)}>+</button>
                        </div>
                      </td>
                      <td className="accent-text font-bold">
                        {formatPrice(parsePrice(item.price) * item.quantity)}
                      </td>
                      <td>
                        <button className="btn-remove" onClick={() => updateCartItem(item.id, 0)}>🗑️</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="cart-summary-section">
              <h2>Tóm tắt đơn hàng</h2>
              <div className="summary-row">
                <span>Tạm tính ({cart.reduce((t, i) => t + i.quantity, 0)} sp):</span>
                <span>{formatPrice(totalPrice)}</span>
              </div>
              <div className="summary-row">
                <span>Phí vận chuyển:</span>
                <span>Miễn phí</span>
              </div>
              <hr className="summary-divider" />
              <div className="summary-row total">
                <span>Tổng cộng:</span>
                <span className="accent-text">{formatPrice(totalPrice)}</span>
              </div>
              <button className="btn-checkout" onClick={() => setCurrentPage('checkout')}>
                Tiến hành thanh toán
              </button>
            </div>
          </div>
        )}
      </main>

      <Footer setCurrentPage={setCurrentPage} />
    </div>
  );
}

export default Cart;