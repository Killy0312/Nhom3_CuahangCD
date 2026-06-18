import React, { useState } from 'react';
import './Checkout.css';

function Checkout({ setCurrentPage, cart, clearCart }) {
  const [paymentMethod, setPaymentMethod] = useState('cod');

  const parsePrice = (priceStr) => parseInt(priceStr.replace(/\D/g, '')) || 0;
  const formatPrice = (num) => num.toLocaleString('vi-VN') + 'đ';
  const totalPrice = cart.reduce((total, item) => total + (parsePrice(item.price) * item.quantity), 0);

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    alert('🎉 Đặt hàng thành công! Mã đơn hàng của bạn là: #MCD' + Math.floor(Math.random() * 10000));
    clearCart();
    setCurrentPage('home');
  };

  if (cart.length === 0) {
    return (
      <div className="app-container modern-theme" style={{ textAlign: 'center', padding: '100px' }}>
        <h2>Không có dữ liệu thanh toán</h2>
        <button className="btn-checkout" onClick={() => setCurrentPage('products')} style={{ width: '200px', marginTop: '20px' }}>Quay lại Cửa hàng</button>
      </div>
    );
  }

  return (
    <div className="app-container modern-theme">
      <header className="main-header">
        <div className="logo-modern" onClick={() => setCurrentPage('home')} style={{ cursor: 'pointer' }}>
          <span className="accent-text">Master</span>CD
        </div>
        <nav className="nav-links">
          <a href="#" className="active" onClick={(e) => e.preventDefault()}>Thông tin thanh toán</a>
        </nav>
      </header>

      <main className="checkout-main">
        <form className="checkout-layout" onSubmit={handlePlaceOrder}>
          {/* CỘT TRÁI: ĐỊA CHỈ & PHƯƠNG THỨC */}
          <div className="checkout-form-section">
            <h2 className="section-title">1. Địa chỉ giao hàng</h2>
            <div className="form-grid">
              <div className="input-group">
                <label>Họ và Tên *</label>
                <input type="text" required placeholder="Ví dụ: Phạm Gia Phú" />
              </div>
              <div className="input-group">
                <label>Số điện thoại *</label>
                <input type="tel" required placeholder="Nhập số điện thoại liên hệ" />
              </div>
              <div className="input-group full-width">
                <label>Địa chỉ nhận hàng chi tiết *</label>
                <input type="text" required placeholder="Số nhà, Tên đường, Phường/Xã, Quận/Huyện, Tỉnh/TP" />
              </div>
              <div className="input-group full-width">
                <label>Ghi chú đơn hàng (Tùy chọn)</label>
                <textarea rows="3" placeholder="Ví dụ: Giao hàng giờ hành chính..."></textarea>
              </div>
            </div>

            <h2 className="section-title mt-40">2. Phương thức thanh toán</h2>
            <div className="payment-methods">
              <label className={`payment-option ${paymentMethod === 'cod' ? 'selected' : ''}`}>
                <input type="radio" name="payment" value="cod" checked={paymentMethod === 'cod'} onChange={(e) => setPaymentMethod(e.target.value)} />
                <span className="pay-icon">💵</span>
                Thanh toán tiền mặt khi nhận hàng (COD)
              </label>

              <label className={`payment-option ${paymentMethod === 'vcb' ? 'selected' : ''}`}>
                <input type="radio" name="payment" value="vcb" checked={paymentMethod === 'vcb'} onChange={(e) => setPaymentMethod(e.target.value)} />
                <span className="pay-icon">🏦</span>
                Chuyển khoản Vietcombank
              </label>

              <label className={`payment-option ${paymentMethod === 'momo' ? 'selected' : ''}`}>
                <input type="radio" name="payment" value="momo" checked={paymentMethod === 'momo'} onChange={(e) => setPaymentMethod(e.target.value)} />
                <span className="pay-icon">🟣</span>
                Ví điện tử MoMo
              </label>
            </div>

            {/* HIỂN THỊ MÃ QR CODE DỰA TRÊN LỰA CHỌN */}
            {paymentMethod !== 'cod' && (
              <div className="qr-code-box">
                <h3>Quét mã QR để thanh toán</h3>
                <img 
                  src={paymentMethod === 'vcb' 
                    ? "https://api.vietqr.io/image/970436-00000000000-q0sU9iQ.jpg?accountName=MASTER+CD&amount=" + totalPrice
                    : "https://upload.wikimedia.org/wikipedia/commons/d/d0/QR_code_for_mobile_English_Wikipedia.svg"
                  } 
                  alt="QR Code" 
                  className="qr-img" 
                />
                <p>Nội dung CK: <strong>MCD - [SĐT của bạn]</strong></p>
                <p className="qr-hint">Hệ thống sẽ tự động xác nhận đơn hàng sau khi nhận được thanh toán.</p>
              </div>
            )}
          </div>

          {/* CỘT PHẢI: CHI TIẾT ĐƠN HÀNG */}
          <div className="checkout-summary-section">
            <h2 className="section-title">Đơn hàng của bạn</h2>
            <div className="checkout-items">
              {cart.map(item => (
                <div className="checkout-item" key={item.id}>
                  <img src={item.img} alt={item.name} />
                  <div className="checkout-item-info">
                    <h4>{item.name}</h4>
                    <span>SL: {item.quantity}</span>
                  </div>
                  <div className="checkout-item-price">
                    {formatPrice(parsePrice(item.price) * item.quantity)}
                  </div>
                </div>
              ))}
            </div>
            <hr className="summary-divider" />
            <div className="summary-row"><span>Tạm tính:</span><span>{formatPrice(totalPrice)}</span></div>
            <div className="summary-row"><span>Phí vận chuyển:</span><span>Miễn phí</span></div>
            <div className="summary-row total mt-20">
              <span>Thành tiền:</span><span className="accent-text">{formatPrice(totalPrice)}</span>
            </div>
            
            <button type="submit" className="btn-place-order">XÁC NHẬN ĐẶT HÀNG</button>
            <button type="button" className="btn-back-cart" onClick={() => setCurrentPage('cart')}>Quay lại giỏ hàng</button>
          </div>
        </form>
      </main>
    </div>
  );
}

export default Checkout;