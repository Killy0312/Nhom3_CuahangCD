import React from 'react';
import './Faqs.css';
import Footer from '../components/Footer.jsx';
import Header from '../components/Header.jsx';

function Faqs({ setCurrentPage, cart = [] }) {
  const faqList = [
    {
      q: "Đĩa CD và Vinyl tại MasterCD có phải hàng chính hãng không?",
      a: "Tất cả các sản phẩm đĩa CD, Vinyl (Đĩa than) và Cassette tại MasterCD đều là hàng nhập khẩu chính hãng 100% từ các hãng đĩa quốc tế, đảm bảo chất lượng thu âm gốc phòng thu độ phân giải cao, nói không với hàng FAKE/F1."
    },
    {
      q: "Đĩa Than (Vinyl) bị cong vênh hoặc trầy xước do vận chuyển có được đổi trả không?",
      a: "Có. MasterCD hỗ trợ đổi mới 1-đổi-1 trong vòng 7 ngày nếu đĩa có lỗi từ nhà sản xuất hoặc bị hư hại, cong vênh do quá trình vận chuyển. Bạn vui lòng quay video mở hộp (unboxing) để được xử lý nhanh nhất."
    },
    {
      q: "Phí vận chuyển được tính như thế nào?",
      a: "Nhằm mang lại trải nghiệm mua sắm tốt nhất cho người yêu âm thanh, MasterCD hiện đang áp dụng chính sách MIỄN PHÍ VẬN CHUYỂN TOÀN QUỐC cho mọi đơn hàng mà không giới hạn giá trị tối thiểu."
    },
    {
      q: "Sau khi chuyển khoản, làm sao để tôi biết đơn hàng đã được xác nhận?",
      a: "Sau khi bạn thực hiện quét mã QR và bấm đặt hàng thành công tại trang thanh toán, hệ thống Backend của chúng tôi sẽ tự động kiểm tra biến động số dư tài khoản. Đơn hàng hợp lệ sẽ được chuyển sang trạng thái 'Đã xác nhận' trong vòng 3 - 5 phút."
    },
    {
      q: "Thời gian nhận hàng dự kiến là bao lâu?",
      a: "Đối với khu vực TP. Hồ Chí Minh, thời gian giao hàng từ 1 - 2 ngày. Đối với các tỉnh thành khác trên toàn quốc, thời gian giao hàng dao động từ 3 - 5 ngày làm việc."
    }
  ];

  return (
    <div className="app-container modern-theme">
      {/* HEADER ĐỒNG BỘ */}
      <header className="main-header">
        <div className="logo-modern" onClick={() => setCurrentPage('home')} style={{ cursor: 'pointer' }}>
          <span className="accent-text">Master</span>CD
        </div>
        <nav className="nav-links">
          <a href="#" onClick={(e) => { e.preventDefault(); setCurrentPage('home'); }}>Trang chủ</a>
          <a href="#" onClick={(e) => { e.preventDefault(); setCurrentPage('products'); }}>Sản phẩm</a>
          <a href="#" onClick={(e) => { e.preventDefault(); setCurrentPage('payment-info'); }}>Thông tin thanh toán</a>
          <a href="#" onClick={(e) => { e.preventDefault(); setCurrentPage('contact'); }}>Liên hệ</a>
        </nav>
        <div className="header-icons">
          <button onClick={() => alert('Chức năng tìm kiếm đang được phát triển!')} style={{ cursor: 'pointer' }}>🔍</button>
          <button onClick={() => setCurrentPage('cart')} style={{ cursor: 'pointer' }}>
            🛒 <span className="cart-badge">{cart.reduce((total, item) => total + item.quantity, 0)}</span>
          </button>
          <button onClick={() => setCurrentPage('login')} className="btn-login" style={{ cursor: 'pointer' }}>Đăng nhập</button>
        </div>
      </header>

      {/* NỘI DUNG CHÍNH */}
      <main className="faqs-main">
        <h1 className="page-title">Câu hỏi <span className="accent-text">thường gặp</span></h1>
        <p className="faqs-subtitle">Giải đáp các thắc mắc phổ biến của khách hàng về sản phẩm và dịch vụ tại MasterCD</p>
        
        <div className="faqs-list">
          {faqList.map((item, index) => (
            <div className="faq-item" key={index}>
              <div className="faq-question">
                <span className="faq-q-icon">Q:</span>
                <h3>{item.q}</h3>
              </div>
              <div className="faq-answer">
                <span className="faq-a-icon">A:</span>
                <p>{item.a}</p>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* FOOTER */}
      <Footer setCurrentPage={setCurrentPage} />
    </div>
  );
}

export default Faqs;