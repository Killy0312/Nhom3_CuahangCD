import React, { useState } from 'react';
import './Checkout.css';
import Footer from '../components/Footer.jsx'; 
import Header from '../components/Header.jsx';

function Checkout({ setCurrentPage, cart, clearCart }) {
  const [paymentMethod, setPaymentMethod] = useState('cod');

  // 💡 State xử lý thông báo nổi Toast thời thượng
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });
  const [toastTimer, setToastTimer] = useState(null);

  const parsePrice = (priceStr) => parseInt(priceStr.replace(/\D/g, '')) || 0;
  const formatPrice = (num) => num.toLocaleString('vi-VN') + 'đ';
  const totalPrice = cart.reduce((total, item) => total + (parsePrice(item.price) * item.quantity), 0);

  // 💡 Hàm gọi Toast Notification
  const triggerToast = (msg, type = 'success') => {
    if (toastTimer) clearTimeout(toastTimer);
    setToast({ show: true, message: msg, type: type });
    
    const timer = setTimeout(() => {
      setToast({ show: false, message: '', type: 'success' });
    }, 3000);
    setToastTimer(timer);
  };

  // 💡 Hàm gửi đơn hàng lên Backend cổng 5000 và kích hoạt trừ kho dữ liệu
  const handlePlaceOrder = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cart: cart }) // Bắn nguyên cái giỏ hàng lên
      });

      const data = await response.json();

      if (response.ok) {
        // Bắn Toast thông báo thành công phát sáng mã đơn hàng xịn xò
        triggerToast(`🎉 Đặt hàng thành công! Mã đơn hàng: #${data.orderId}`, "success");
        
        // Chờ 2 giây cho người dùng nhìn hiệu ứng rồi mới xóa giỏ và đá về trang chủ
        setTimeout(() => {
          clearCart();
          setCurrentPage('home');
        }, 2000);
      } else {
        // Nếu Backend báo lỗi không đủ hàng tồn kho, hiện Toast màu đỏ cảnh báo ngay
        triggerToast(`⚠️ ${data.error}`, "error");
      }
    } catch (error) {
      triggerToast("❌ Thất bại: Không thể kết nối tới máy chủ xử lý kho hàng Backend!", "error");
    }
  };

  return (
    <div className="app-container modern-theme">
      
      {/* ĐÃ SỬA: ĐỒNG BỘ AVATAR CHỮ PHÚ BẰNG COMPONENT DÙNG CHUNG */}
      <Header setCurrentPage={setCurrentPage} cart={cart} />

      {/* KIỂM TRA GIỎ HÀNG */}
      {cart.length === 0 ? (
        <main className="checkout-main" style={{ textAlign: 'center', padding: '100px 20px', minHeight: '50vh' }}>
          <h2>Không có dữ liệu thanh toán</h2>
          <p style={{ color: '#94a3b8', marginTop: '10px' }}>Vui lòng thêm sản phẩm vào giỏ hàng trước khi tiến hành đặt hàng.</p>
          <button 
            className="btn-checkout" 
            onClick={() => setCurrentPage('products')} 
            style={{ width: '250px', margin: '30px auto 0 auto' }}
          >
            Quay lại Cửa hàng
          </button>
        </main>
      ) : (
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
                  <div className="checkout-item" key={item.id || item._id}>
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
      )}

      {/* 💡 THÀNH PHẦN TOAST NOTIFICATION CHO TRANG CHECKOUT */}
      <div className={`toast-notification ${toast.type} ${toast.show ? 'show' : ''}`}>
        <div className="toast-content">
          <span className="toast-icon">{toast.type === 'success' ? '🎉' : '⚠️'}</span>
          <span className="toast-text">{toast.message}</span>
        </div>
        <div className="toast-progress-bar"></div>
      </div>

      <Footer setCurrentPage={setCurrentPage} />
    </div>
  );
}

export default Checkout;