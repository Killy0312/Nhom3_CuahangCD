import React, { useState, useEffect } from 'react';
import './Products.css';
import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';

function OrderHistory({ setCurrentPage, cart = [] }) {
  const [orders, setOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedOrderId, setExpandedOrderId] = useState(null);
  const [currentPageNum, setCurrentPageNum] = useState(1);
  const ordersPerPage = 5;

  const [toast, setToast] = useState({ show: false, message: '' });
  const [toastTimer, setToastTimer] = useState(null);

  useEffect(() => {
    // 1. ĐỌC QUYỀN TÀI KHOẢN ĐANG ĐĂNG NHẬP
    const userRole = localStorage.getItem('userRole');

    // 🔥 NẾU LÀ TÀI KHOẢN ADMIN -> KHÔNG CÓ ĐƠN HÀNG CÁ NHÂN (ÉP VỀ MẢNG RỖNG)
    if (userRole === 'admin') {
      setOrders([]);
      return;
    }

    // 2. NẾU LÀ KHÁCH HÀNG -> CHỈ LỌC CÁC ĐƠN HÀNG THUỘC SỞ HỮU CỦA TÀI KHOẢN NÀY
    const currentEmail = localStorage.getItem('userEmail') || '';
    const currentPhone = localStorage.getItem('userPhone') || '';
    const currentName = localStorage.getItem('userName') || '';

    const savedOrders = JSON.parse(localStorage.getItem('userOrders')) ||
                        JSON.parse(localStorage.getItem('orders')) ||
                        JSON.parse(localStorage.getItem('mastercd_orders')) ||
                        [];

    const myOrders = savedOrders.filter(order => {
      if (order.userEmail && currentEmail && order.userEmail.toLowerCase() === currentEmail.toLowerCase()) {
        return true;
      }
      if (order.phone && currentPhone && order.phone === currentPhone) {
        return true;
      }
      if (order.customerName && currentName && order.customerName.toLowerCase() === currentName.toLowerCase()) {
        return true;
      }
      return false;
    });

    setOrders(myOrders);
  }, []);

  const triggerToast = (msg) => {
    if (toastTimer) clearTimeout(toastTimer);
    setToast({ show: true, message: msg });
    const timer = setTimeout(() => setToast({ show: false, message: '' }), 3000);
    setToastTimer(timer);
  };

  // HÀM BÓC TÁCH CHUỖI GIÁ TIỀN (LỌC SẠCH DẤU CHẤM VÀ CHỮ đ)
  const parsePrice = (priceVal) => {
    if (typeof priceVal === 'number') return priceVal;
    if (!priceVal) return 0;
    return parseInt(String(priceVal).replace(/\D/g, '')) || 0;
  };

  // HÀM ĐỊNH DẠNG GIÁ HIỂN THỊ CHUẨN VND
  const formatPrice = (priceVal) => {
    const num = parsePrice(priceVal);
    return num.toLocaleString('vi-VN') + 'đ';
  };

  const toggleExpandOrder = (id) => {
    setExpandedOrderId(expandedOrderId === id ? null : id);
  };

  // LỌC ĐƠN HÀNG THEO TỪ KHÓA TÌM KIẾM
  const filteredOrders = orders.filter(order => {
    const orderIdStr = (order.orderId || order._id || '').toLowerCase();
    const matchId = orderIdStr.includes(searchTerm.toLowerCase());
    const matchProduct = order.items && order.items.some(item => 
      (item.name || '').toLowerCase().includes(searchTerm.toLowerCase())
    );
    return matchId || matchProduct;
  });

  // PHÂN TRANG LỊCH SỬ ĐƠN (5 ĐƠN / TRANG)
  const totalPages = Math.ceil(filteredOrders.length / ordersPerPage) || 1;
  const indexOfLastOrder = currentPageNum * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = filteredOrders.slice(indexOfFirstOrder, indexOfLastOrder);

  return (
    <div className="app-container modern-theme">
      <Header setCurrentPage={setCurrentPage} cart={cart} />

      <main style={{ maxWidth: '1000px', margin: '0 auto', padding: '50px 20px 80px 20px', color: '#fff' }}>
        
        {/* BANNER TIÊU ĐỀ */}
        <div style={{ textAlign: 'center', marginBottom: '40px', borderBottom: '1px solid #1e222a', paddingBottom: '20px' }}>
          <h1 style={{ fontSize: '32px', fontWeight: '800', marginBottom: '10px' }}>
            Lịch sử <span style={{ color: '#00e5ff' }}>Đặt hàng</span>
          </h1>
          <p style={{ color: '#94a3b8', fontSize: '14px' }}>
            Theo dõi danh sách đĩa nhạc và thiết bị âm thanh bạn đã sở hữu tại MasterCD.
          </p>
        </div>

        {/* THANH TÌM KIẾM ĐƠN HÀNG */}
        <div style={{ marginBottom: '30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '20px', flexWrap: 'wrap' }}>
          <div style={{ position: 'relative', flex: '1', minWidth: '280px' }}>
            <input 
              type="text" 
              placeholder="🔍 Tìm theo Mã đơn hàng (VD: #HD...) hoặc Tên đĩa nhạc..." 
              value={searchTerm}
              onChange={(e) => { setSearchTerm(e.target.value); setCurrentPageNum(1); }}
              style={{
                width: '100%',
                backgroundColor: '#14171c',
                border: '1px solid #282d37',
                borderRadius: '10px',
                padding: '12px 18px',
                color: '#fff',
                fontSize: '14px',
                outline: 'none',
                boxSizing: 'border-box'
              }}
            />
          </div>
          <div style={{ fontSize: '13px', color: '#94a3b8' }}>
            Tổng cộng: <strong style={{ color: '#00e5ff' }}>{filteredOrders.length}</strong> đơn hàng
          </div>
        </div>

        {/* DANH SÁCH ĐƠN HÀNG */}
        {currentOrders.length > 0 ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {currentOrders.map((order, idx) => {
              const isExpanded = expandedOrderId === (order.orderId || order._id || idx);
              const displayId = order.orderId || `#HD${100000 + idx}`;
              const orderDate = order.createdAt ? new Date(order.createdAt).toLocaleDateString('vi-VN') : 'Mới đây';

              return (
                <div 
                  key={order.orderId || order._id || idx}
                  style={{
                    backgroundColor: '#14171c',
                    border: '1px solid #1e222a',
                    borderRadius: '14px',
                    overflow: 'hidden',
                    transition: 'all 0.25s ease'
                  }}
                >
                  {/* HEADER ĐƠN HÀNG */}
                  <div 
                    onClick={() => toggleExpandOrder(order.orderId || order._id || idx)}
                    style={{
                      padding: '20px 24px',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      cursor: 'pointer',
                      background: '#1a1d24',
                      borderBottom: isExpanded ? '1px solid #282d37' : 'none',
                      flexWrap: 'wrap',
                      gap: '15px'
                    }}
                  >
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '6px' }}>
                        <span style={{ fontSize: '16px', fontWeight: '800', color: '#00e5ff', fontFamily: 'monospace' }}>
                          {displayId}
                        </span>
                        <span style={{ 
                          background: 'rgba(16, 185, 129, 0.15)', 
                          color: '#10b981', 
                          border: '1px solid rgba(16, 185, 129, 0.3)',
                          fontSize: '11px',
                          fontWeight: '700',
                          padding: '3px 10px',
                          borderRadius: '12px'
                        }}>
                          {order.status || 'Đã xác nhận'}
                        </span>
                      </div>
                      <div style={{ fontSize: '12px', color: '#64748b' }}>
                        Ngày đặt: {orderDate} • PTTT: {order.paymentMethod || 'COD'}
                      </div>
                    </div>

                    <div style={{ textAlign: 'right', display: 'flex', alignItems: 'center', gap: '20px' }}>
                      <div>
                        <span style={{ fontSize: '12px', color: '#94a3b8', display: 'block' }}>Tổng thanh toán:</span>
                        <strong style={{ fontSize: '17px', color: '#00e5ff' }}>{formatPrice(order.totalAmount || order.total)}</strong>
                      </div>
                      <span style={{ color: '#00e5ff', fontSize: '14px', fontWeight: 'bold' }}>
                        {isExpanded ? '▲ Thu gọn' : '▼ Chi tiết'}
                      </span>
                    </div>
                  </div>

                  {/* CHI TIẾT SẢN PHẨM TRONG ĐƠN (ACCORDION) */}
                  {isExpanded && (
                    <div style={{ padding: '20px 24px', background: '#14171c' }}>
                      <h4 style={{ fontSize: '13px', color: '#94a3b8', marginBottom: '15px', textTransform: 'uppercase', letterSpacing: '1px' }}>
                        Sản phẩm đã đặt mua:
                      </h4>

                      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '20px' }}>
                        {order.items && order.items.length > 0 ? (
                          order.items.map((item, itemIdx) => (
                            <div 
                              key={itemIdx}
                              style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                background: '#1e222a',
                                padding: '12px 16px',
                                borderRadius: '10px',
                                gap: '15px'
                              }}
                            >
                              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                                <img 
                                  src={item.img || 'https://via.placeholder.com/60?text=CD'} 
                                  alt={item.name}
                                  style={{ width: '48px', height: '48px', borderRadius: '6px', objectFit: 'cover' }}
                                />
                                <div>
                                  <strong style={{ fontSize: '14px', color: '#fff', display: 'block' }}>{item.name}</strong>
                                  <span style={{ fontSize: '12px', color: '#94a3b8' }}>
                                    Đơn giá: {formatPrice(item.price)}
                                  </span>
                                </div>
                              </div>

                              <div style={{ textAlign: 'right' }}>
                                <span style={{ fontSize: '13px', color: '#cbd5e1', display: 'block' }}>x{item.quantity || 1}</span>
                                <strong style={{ fontSize: '14px', color: '#00e5ff' }}>
                                  {formatPrice(parsePrice(item.price) * (item.quantity || 1))}
                                </strong>
                              </div>
                            </div>
                          ))
                        ) : (
                          <p style={{ color: '#64748b', fontSize: '13px' }}>Chi tiết đĩa nhạc đang được đồng bộ...</p>
                        )}
                      </div>

                      {/* THÔNG TIN NGƯỜI NHẬN */}
                      <div style={{ background: '#1a1d24', padding: '14px 18px', borderRadius: '8px', fontSize: '13px', border: '1px solid #282d37', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px' }}>
                        <div>
                          <span style={{ color: '#64748b' }}>Người nhận: </span>
                          <strong style={{ color: '#fff' }}>{order.customerName || 'Khách hàng'}</strong> ({order.phone || 'N/A'})
                        </div>
                        <div>
                          <span style={{ color: '#64748b' }}>Địa chỉ: </span>
                          <span style={{ color: '#cbd5e1' }}>{order.address || 'Giao tận nơi'}</span>
                        </div>
                      </div>

                      <div style={{ marginTop: '15px', textAlign: 'right' }}>
                        <button 
                          onClick={() => {
                            triggerToast("Đã thêm lại các sản phẩm vào giỏ hàng!");
                            setTimeout(() => setCurrentPage('cart'), 1000);
                          }}
                          style={{
                            background: 'transparent',
                            border: '1px solid #00e5ff',
                            color: '#00e5ff',
                            padding: '8px 18px',
                            borderRadius: '6px',
                            fontWeight: '700',
                            fontSize: '12px',
                            cursor: 'pointer'
                          }}
                        >
                          🔄 Mua lại đơn này
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          /* TRẠNG THÁI CHƯA CÓ ĐƠN HÀNG (DÀNH CHO ADMIN HOẶC KHÁCH MỚI) */
          <div style={{ textAlign: 'center', padding: '80px 20px', background: '#14171c', borderRadius: '16px', border: '1px solid #1e222a' }}>
            <div style={{ fontSize: '48px', marginBottom: '15px' }}></div>
            <h3 style={{ fontSize: '20px', color: '#fff', marginBottom: '8px' }}>Chưa tìm thấy đơn hàng cá nhân nào</h3>
            <p style={{ color: '#94a3b8', fontSize: '14px', marginBottom: '24px' }}>
              {searchTerm ? 'Không có đơn hàng nào khớp với từ khóa tìm kiếm của bạn.' : 'Tài khoản này chưa thực hiện giao dịch mua đĩa nhạc cá nhân nào tại MasterCD.'}
            </p>
            <button 
              onClick={() => setCurrentPage('products')}
              style={{
                background: '#00e5ff',
                color: '#000',
                border: 'none',
                padding: '12px 28px',
                borderRadius: '8px',
                fontWeight: '800',
                fontSize: '13px',
                cursor: 'pointer'
              }}
            >
              KHÁM PHÁ KHO ĐĨA NHẠC NGAY ➔
            </button>
          </div>
        )}

        {/* PHÂN TRANG */}
        {totalPages > 1 && (
          <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginTop: '30px' }}>
            <button 
              disabled={currentPageNum === 1}
              onClick={() => setCurrentPageNum(currentPageNum - 1)}
              style={{ background: '#1e222a', color: '#fff', border: 'none', padding: '8px 14px', borderRadius: '6px', cursor: 'pointer' }}
            >
              &lt;
            </button>
            {[...Array(totalPages)].map((_, i) => (
              <button 
                key={i}
                onClick={() => setCurrentPageNum(i + 1)}
                style={{ 
                  background: currentPageNum === i + 1 ? '#00e5ff' : '#1e222a', 
                  color: currentPageNum === i + 1 ? '#000' : '#fff', 
                  border: 'none', 
                  padding: '8px 14px', 
                  borderRadius: '6px', 
                  fontWeight: 'bold',
                  cursor: 'pointer' 
                }}
              >
                {i + 1}
              </button>
            ))}
            <button 
              disabled={currentPageNum === totalPages}
              onClick={() => setCurrentPageNum(currentPageNum + 1)}
              style={{ background: '#1e222a', color: '#fff', border: 'none', padding: '8px 14px', borderRadius: '6px', cursor: 'pointer' }}
            >
              &gt;
            </button>
          </div>
        )}

      </main>

      {/* TOAST THÔNG BÁO */}
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

export default OrderHistory;