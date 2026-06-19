import React from 'react';

function Footer({ setCurrentPage }) {
  return (
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
            <li><a href="#" onClick={(e) => { e.preventDefault(); setCurrentPage('products'); }}>Đĩa CD Hi-Res</a></li>
            <li><a href="#" onClick={(e) => { e.preventDefault(); setCurrentPage('products'); }}>Đĩa Than (Vinyl)</a></li>
            <li><a href="#" onClick={(e) => { e.preventDefault(); setCurrentPage('products'); }}>Băng Cassette</a></li>
            <li><a href="#" onClick={(e) => { e.preventDefault(); setCurrentPage('products'); }}>Thiết bị phát</a></li>
          </ul>
        </div>
        <div className="footer-col">
          <h4>Hỗ trợ</h4>
          <ul>
            <li><a href="#" onClick={(e) => { e.preventDefault(); setCurrentPage('payment-info'); }}>Thông tin thanh toán</a></li>
            <li><a href="#" onClick={(e) => { e.preventDefault(); setCurrentPage('payment-info'); }}>Hướng dẫn mua hàng</a></li>
            <li><a href="#" onClick={(e) => e.preventDefault()}>Chính sách đổi trả</a></li>
          </ul>
        </div>
        <div className="footer-col">
          <h4>Dịch vụ</h4>
          <ul>
            <li><a href="#" onClick={(e) => e.preventDefault()}>Câu hỏi thường gặp</a></li>
            <li><a href="#" onClick={(e) => e.preventDefault()}>Theo dõi đơn hàng</a></li>
            <li><a href="#" onClick={(e) => e.preventDefault()}>Bảo mật thông tin</a></li>
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
  );
}

export default Footer;