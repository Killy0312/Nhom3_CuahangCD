import React, { useState, useEffect } from 'react';
import './Checkout.css';
import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';

function Checkout({ setCurrentPage, cart = [], clearCart }) {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    address: '',
    note: '',
    paymentMethod: 'COD'
  });

  const [toast, setToast] = useState({ show: false, message: '' });

  useEffect(() => {
    try {
      const savedProfile = JSON.parse(localStorage.getItem('userProfile')) || {};
      const storedName = localStorage.getItem('userName') || '';

      const fullName = savedProfile.fullName || savedProfile.name || storedName || 'Phạm Gia Phú';
      
      const phone = savedProfile.phone || 
                    savedProfile.phoneNumber || 
                    savedProfile.phoneNum || 
                    localStorage.getItem('userPhone') || '0862098350';

      const address = savedProfile.address || 
                      savedProfile.defaultAddress || 
                      savedProfile.shippingAddress || 
                      localStorage.getItem('userAddress') || '331 Quốc lộ 1A, P. An Phú Đông, Q.12, TP.HCM';

      setFormData(prev => ({
        ...prev,
        fullName: fullName,
        phone: phone,
        address: address
      }));
    } catch (error) {
      console.error("Lỗi đọc thông tin Profile:", error);
    }
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const parsePrice = (priceStr) => {
    if (typeof priceStr === 'number') return priceStr;
    return parseInt(String(priceStr).replace(/\D/g, '')) || 0;
  };

  const formatPrice = (num) => num.toLocaleString('vi-VN') + 'đ';

  const totalPrice = cart.reduce((total, item) => total + (parsePrice(item.price) * item.quantity), 0);

  const triggerToast = (msg) => {
    setToast({ show: true, message: msg });
    setTimeout(() => setToast({ show: false, message: '' }), 3000);
  };

  // 🔥 HÀM XỬ LÝ ĐẶT HÀNG KÈM TỰ ĐỘNG TRỪ TỒN KHO TRÊN MONGODB
  const handlePlaceOrder = async (e) => {
    e.preventDefault();

    if (!formData.fullName.trim() || !formData.phone.trim() || !formData.address.trim()) {
      triggerToast("Vui lòng điền đầy đủ Họ tên, Số điện thoại và Địa chỉ giao hàng!");
      return;
    }

    const orderCode = "HD" + Math.floor(100000 + Math.random() * 900000);
    const loggedInEmail = localStorage.getItem('userEmail') || '';

    const newOrder = {
      orderId: orderCode,
      userEmail: loggedInEmail,
      createdAt: new Date().toISOString(),
      customerName: formData.fullName,
      phone: formData.phone,
      address: formData.address,
      note: formData.note,
      paymentMethod: formData.paymentMethod,
      items: cart,
      totalAmount: totalPrice,
      status: 'Đã xác nhận'
    };

    // 1. LƯU ĐƠN HÀNG VÀO LOCALSTORAGE
    try {
      const existingOrders = JSON.parse(localStorage.getItem('userOrders')) || [];
      localStorage.setItem('userOrders', JSON.stringify([newOrder, ...existingOrders]));
    } catch (err) {
      console.error("Lỗi lưu đơn hàng vào LocalStorage:", err);
    }

    // 2. 🔥 TỰ ĐỘNG TRỪ TỒN KHO & BẮN LOG XUẤT KHO LÊN MONGODB FOR EACH ITEM IN CART
    try {
      for (const item of cart) {
        const targetId = item._id || item.id;
        const currentStock = Number(item.stock) || 30;
        const buyQty = Number(item.quantity) || 1;
        const newStock = Math.max(0, currentStock - buyQty); // Tránh âm kho

        // a. Gọi API Cập nhật số lượng tồn mới lên CSDL MongoDB
        if (targetId) {
          await fetch(`http://localhost:5000/api/products/${targetId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ...item, stock: newStock })
          });
        }

        // b. Bắn Nhật ký Xuất kho (EXPORT) vào CSDL MongoDB
        const logData = {
          logId: "LOG_" + Date.now() + "_" + Math.floor(Math.random() * 1000),
          date: new Date().toLocaleDateString('vi-VN') + ' ' + new Date().toLocaleTimeString('vi-VN', {hour: '2-digit', minute:'2-digit'}),
          type: 'EXPORT',
          productName: item.name,
          quantity: buyQty,
          note: `Khách hàng ${formData.fullName} đặt mua đơn #${orderCode}`
        };

        await fetch('http://localhost:5000/api/inventory-logs', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(logData)
        });
      }
    } catch (err) {
      console.error("Lỗi đồng bộ trừ tồn kho MongoDB:", err);
    }

    triggerToast("Đặt hàng thành công! Đã tự động cập nhật kho hàng.");

    setTimeout(() => {
      clearCart();
      setCurrentPage('order-history');
    }, 1500);
  };

  return (
    <div className="app-container modern-theme">
      <Header setCurrentPage={setCurrentPage} cart={cart} />

      <main className="checkout-main">
        <div className="checkout-layout">
          
          {/* CỘT TRÁI - FORM THÔNG TIN GIAO HÀNG */}
          <div className="checkout-form-section">
            <h2 className="section-title">1. Địa chỉ giao hàng</h2>
            
            <form onSubmit={handlePlaceOrder}>
              <div className="form-row">
                <div className="input-group">
                  <label>Họ và Tên *</label>
                  <input 
                    type="text" 
                    name="fullName" 
                    placeholder="Ví dụ: Phạm Gia Phú" 
                    value={formData.fullName} 
                    onChange={handleChange} 
                    required 
                  />
                </div>

                <div className="input-group">
                  <label>Số điện thoại *</label>
                  <input 
                    type="text" 
                    name="phone" 
                    placeholder="Nhập số điện thoại liên hệ" 
                    value={formData.phone} 
                    onChange={handleChange} 
                    required 
                  />
                </div>
              </div>

              <div className="input-group">
                <label>Địa chỉ nhận hàng chi tiết *</label>
                <input 
                  type="text" 
                  name="address" 
                  placeholder="Số nhà, Tên đường, Phường/Xã, Quận/Huyện, Tỉnh/TP" 
                  value={formData.address} 
                  onChange={handleChange} 
                  required 
                />
              </div>

              <div className="input-group">
                <label>Ghi chú đơn hàng (Tùy chọn)</label>
                <textarea 
                  name="note" 
                  rows="3" 
                  placeholder="Ví dụ: Giao hàng giờ hành chính..." 
                  value={formData.note} 
                  onChange={handleChange}
                ></textarea>
              </div>

              <h2 className="section-title mt-40">2. Phương thức thanh toán</h2>
              <div className="payment-methods">
                <label className={`payment-option ${formData.paymentMethod === 'COD' ? 'selected' : ''}`}>
                  <input 
                    type="radio" 
                    name="paymentMethod" 
                    value="COD" 
                    checked={formData.paymentMethod === 'COD'} 
                    onChange={handleChange} 
                  />
                  <span>Thanh toán tiền mặt khi nhận hàng (COD)</span>
                </label>

                <label className={`payment-option ${formData.paymentMethod === 'Bank' ? 'selected' : ''}`}>
                  <input 
                    type="radio" 
                    name="paymentMethod" 
                    value="Bank" 
                    checked={formData.paymentMethod === 'Bank'} 
                    onChange={handleChange} 
                  />
                  <span>Chuyển khoản Vietcombank</span>
                </label>

                <label className={`payment-option ${formData.paymentMethod === 'MoMo' ? 'selected' : ''}`}>
                  <input 
                    type="radio" 
                    name="paymentMethod" 
                    value="MoMo" 
                    checked={formData.paymentMethod === 'MoMo'} 
                    onChange={handleChange} 
                  />
                  <span>Ví điện tử MoMo</span>
                </label>
              </div>
            </form>
          </div>

          {/* CỘT PHẢI - TÓM TẮT ĐƠN HÀNG */}
          <div className="checkout-summary-section">
            <h2 className="section-title">Đơn hàng của bạn</h2>

            <div className="checkout-items">
              {cart.map((item, idx) => (
                <div key={item._id || item.id || idx} className="checkout-item">
                  <img src={item.img} alt={item.name} className="checkout-item-img" />
                  <div className="checkout-item-info">
                    <h4>{item.name}</h4>
                    <span>SL: {item.quantity}</span>
                  </div>
                  <span className="checkout-item-price">
                    {formatPrice(parsePrice(item.price) * item.quantity)}
                  </span>
                </div>
              ))}
            </div>

            <div className="summary-pricing-box">
              <div className="summary-row">
                <span>Tạm tính:</span>
                <span>{formatPrice(totalPrice)}</span>
              </div>
              <div className="summary-row">
                <span>Phí vận chuyển:</span>
                <span>Miễn phí</span>
              </div>
              <hr className="summary-divider" />
              <div className="summary-row total">
                <span>Thành tiền:</span>
                <span className="accent-text">{formatPrice(totalPrice)}</span>
              </div>
            </div>

            <button type="button" className="btn-place-order" onClick={handlePlaceOrder}>
              XÁC NHẬN ĐẶT HÀNG
            </button>

            <button type="button" className="btn-back-cart" onClick={() => setCurrentPage('cart')}>
              Quay lại giỏ hàng
            </button>
          </div>

        </div>
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

export default Checkout;