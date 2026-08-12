import React from 'react';
import './PaymentInfo.css';
import Header from '../components/Header.jsx'; 
import Footer from '../components/Footer.jsx'; 

function PaymentInfo({ setCurrentPage, cart = [] }) {
  return (
    <div className="app-container modern-theme">
      
      <Header setCurrentPage={setCurrentPage} cart={cart} />

      <main className="payment-info-main">
        <h1 className="page-title">Hướng dẫn thanh toán mua hàng tại <span className="accent-text">MasterCD</span></h1>
        
        {/* HƯỚNG DẪN CÁC BƯỚC MUA HÀNG */}
        <div className="guide-steps">
          <div className="step-card">
            <h3>Bước 1: Chọn sản phẩm</h3>
            <p>Truy cập vào trang <strong>Sản phẩm</strong>. Tìm kiếm đĩa CD, Vinyl hoặc thiết bị bạn yêu thích. Bấm nút <strong>"Thêm vào giỏ"</strong>.</p>
          </div>

          <div className="step-card">
            <h3>Bước 2: Kiểm tra giỏ hàng</h3>
            <p>Bấm vào biểu tượng <strong>Giỏ hàng 🛒</strong> ở góc phải màn hình. Kiểm tra lại số lượng và tổng tiền. Sau đó bấm <strong>"Tiến hành thanh toán"</strong>.</p>
          </div>

          <div className="step-card">
            <h3>Bước 3: Điền thông tin giao hàng</h3>
            <p>Tại trang thanh toán, bạn cần điền đầy đủ và chính xác: <strong>Họ tên, Số điện thoại và Địa chỉ nhận hàng chi tiết</strong> để shipper giao đến tận nơi.</p>
          </div>

          <div className="step-card">
            <h3>Bước 4: Chọn phương thức thanh toán & Đặt hàng</h3>
            <p>MasterCD hỗ trợ 3 hình thức thanh toán chính:</p>
            <ul>
              <li><strong>Thanh toán tiền mặt (COD):</strong> Trả tiền cho shipper khi nhận được hàng.</li>
              <li><strong>Chuyển khoản Vietcombank / MoMo:</strong> Quét mã QR hiện trên màn hình hoặc bên dưới. Nhớ ghi đúng nội dung chuyển khoản là: <code>MCD - [Số điện thoại của bạn]</code>.</li>
            </ul>
            <p style={{ marginTop: '10px' }}>Sau khi hoàn tất, bấm <strong>"Xác nhận đặt hàng"</strong>.</p>
          </div>
        </div>

        {/* THÔNG TIN TÀI KHOẢN KÈM MÃ QR THỰC TẾ */}
        <div className="bank-accounts-section">
          <h2>Thông tin tài khoản nhận thanh toán chính thức</h2>
          <p className="warning-text">⚠️ Lưu ý: Chúng tôi chỉ sử dụng các tài khoản dưới đây để nhận thanh toán. Vui lòng kiểm tra kỹ tên chủ tài khoản <strong>PHAM GIA PHU</strong> trước khi chuyển khoản.</p>
          
          <div className="bank-grid">
            
            {/* TÀI KHOẢN VIETCOMBANK */}
            <div className="bank-card vcb-card">
              <div className="bank-card-header">
                <div className="bank-name">🏦 Ngân hàng Vietcombank</div>
                <span className="badge-network">VietQR / Napas247</span>
              </div>
              
              <div className="bank-card-content">
                <div className="bank-info-group">
                  <p className="info-row"><span className="label">Số tài khoản:</span> <strong className="highlight-stk">9862098350</strong></p>
                  <p className="info-row"><span className="label">Chủ tài khoản:</span> <strong>PHAM GIA PHU</strong></p>
                  <p className="info-row"><span className="label">Ngân hàng:</span> <strong>Vietcombank (VCB)</strong></p>
                </div>

                <div className="qr-container">
                  <div className="qr-box">
                    <img 
                      src="/images/vcb-qr.jpg" 
                      alt="Mã QR Vietcombank Pham Gia Phu" 
                      className="qr-image"
                      onError={(e) => { e.target.src = 'https://via.placeholder.com/220x300/1e222a/00e5ff?text=Vietcombank+QR'; }}
                    />
                  </div>
                  <span className="qr-caption">Scan mã VietQR Vietcombank</span>
                </div>
              </div>
            </div>
            
            {/* VÍ ĐIỆN TỬ MOMO */}
            <div className="bank-card momo-card">
              <div className="bank-card-header">
                <div className="bank-name momo-title">🟣 Ví điện tử MoMo</div>
                <span className="badge-network momo-badge">MoMo Pay</span>
              </div>

              <div className="bank-card-content">
                <div className="bank-info-group">
                  <p className="info-row"><span className="label">Số điện thoại:</span> <strong className="highlight-stk momo-text">0862098350</strong></p>
                  <p className="info-row"><span className="label">Chủ tài khoản:</span> <strong>PHAM GIA PHU</strong></p>
                  <p className="info-row"><span className="label">Dịch vụ:</span> <strong>Ví MoMo / Chuyển tiền nhanh</strong></p>
                </div>

                <div className="qr-container">
                  <div className="qr-box momo-qr-border">
                    <img 
                      src="/images/momo-qr.jpg" 
                      alt="Mã QR MoMo Pham Gia Phu" 
                      className="qr-image"
                      onError={(e) => { e.target.src = 'https://via.placeholder.com/220x300/1e222a/d946ef?text=MoMo+QR'; }}
                    />
                  </div>
                  <span className="qr-caption momo-caption">Scan mã QR Ví MoMo</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </main>

      <Footer setCurrentPage={setCurrentPage} />
      
    </div>
  );
}

export default PaymentInfo;