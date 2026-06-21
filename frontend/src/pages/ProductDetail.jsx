import React from 'react';
import './ProductDetail.css';
import Footer from '../components/Footer.jsx';

function ProductDetail({ setCurrentPage, product, addToCart, cart = [] }) {
  if (!product) {
    return (
      <div className="app-container modern-theme" style={{ textAlign: 'center', padding: '100px' }}>
        <h2>Không tìm thấy thông tin sản phẩm</h2>
        <button className="btn-primary" onClick={() => setCurrentPage('products')} style={{ marginTop: '20px' }}>Quay lại Cửa hàng</button>
      </div>
    );
  }

  // 1. Danh sách bài hát cho Album LUX - ROSALÍA
  const luxTracklist = [
    { id: 1, title: "Sexo, Violencia y Llantas", artist: "ROSALÍA", duration: "2:20" },
    { id: 2, title: "Reliquia", artist: "ROSALÍA", duration: "3:50" },
    { id: 3, title: "Divinize", artist: "ROSALÍA", duration: "4:03" },
    { id: 4, title: "Porcelana", artist: "ROSALÍA, Dougie F", duration: "4:08" },
    { id: 5, title: "Mio Cristo Piange Diamanti", artist: "ROSALÍA", duration: "4:29" },
    { id: 6, title: "Berghain", artist: "ROSALÍA, Björk, Yves Tumor", duration: "2:58" },
    { id: 7, title: "La Perla", artist: "ROSALÍA, Yahritza Y Su Esencia", duration: "3:15" },
    { id: 8, title: "Mundo Nuevo", artist: "ROSALÍA", duration: "2:20" },
    { id: 9, title: "De Madrugá", artist: "ROSALÍA", duration: "1:44" },
    { id: 10, title: "Dios Es Un Stalker", artist: "ROSALÍA", duration: "2:10" },
    { id: 11, title: "La Yugular", artist: "ROSALÍA", duration: "4:18" },
    { id: 12, title: "Sauvignon Blanc", artist: "ROSALÍA", duration: "2:42" },
    { id: 13, title: "La Rumba Del Perdón", artist: "ROSALÍA, Estrella Morente, Sílvia Pérez Cruz", duration: "4:11" },
    { id: 14, title: "Memória", artist: "ROSALÍA, Carminho", duration: "3:45" },
    { id: 15, title: "Magnolias", artist: "ROSALÍA", duration: "3:14" },
  ];

  // 2. Danh sách bài hát cho Album Music Has The Right to the children
  const boardsOfCanadaTracklist = [
    { id: 1, title: "Wildlife Analysis", artist: "Boards of Canada", duration: "1:15" },
    { id: 2, title: "An Eagle in Your Mind", artist: "Boards of Canada", duration: "6:25" },
    { id: 3, title: "The Color of the Fire", artist: "Boards of Canada", duration: "1:45" },
    { id: 4, title: "Telephasic Workshop", artist: "Boards of Canada", duration: "6:35" },
    { id: 5, title: "Triangles & Rhombuses", artist: "Boards of Canada", duration: "1:50" },
    { id: 6, title: "Sixtyten", artist: "Boards of Canada", duration: "5:48" },
    { id: 7, title: "Turquoise Hexagon Sun", artist: "Boards of Canada", duration: "5:07" },
    { id: 8, title: "Kaini Industries", artist: "Boards of Canada", duration: "0:59" },
    { id: 9, title: "Bocuma", artist: "Boards of Canada", duration: "1:35" },
    { id: 10, title: "Roygbiv", artist: "Boards of Canada", duration: "2:31" },
    { id: 11, title: "Rue the Whirl", artist: "Boards of Canada", duration: "6:39" },
    { id: 12, title: "Aquarius", artist: "Boards of Canada", duration: "5:58" },
    { id: 13, title: "Olson", artist: "Boards of Canada", duration: "1:31" },
    { id: 14, title: "Pete Standing Alone", artist: "Boards of Canada", duration: "6:07" },
    { id: 15, title: "Smokes Quantity", artist: "Boards of Canada", duration: "3:07" },
    { id: 16, title: "Open the Light", artist: "Boards of Canada", duration: "4:25" },
    { id: 17, title: "One Very Important Thought", artist: "Boards of Canada", duration: "1:25" },
  ];

  // 3. Danh sách bài hát cho Album Let God Sort Em Out
  const clipseTracklist = [
    { id: 1, title: "The Birds Don't Sing", artist: "Clipse, John Legend, Voices of Fire", duration: "4:00" },
    { id: 2, title: "Chains & Whips", artist: "Clipse, Kendrick Lamar", duration: "4:03" },
    { id: 3, title: "P.O.V.", artist: "Clipse, Tyler, the Creator", duration: "4:18" },
    { id: 4, title: "So Be It", artist: "Clipse", duration: "3:14" },
    { id: 5, title: "Ace Trumpets", artist: "Clipse", duration: "2:34" },
    { id: 6, title: "All Things Considered", artist: "Clipse, The-Dream, Pharrell Williams", duration: "3:09" },
    { id: 7, title: "M.T.B.T.T.F.", artist: "Clipse", duration: "2:36" },
    { id: 8, title: "E.B.I.T.D.A.", artist: "Clipse, Pharrell Williams", duration: "1:59" },
    { id: 9, title: "F.I.C.O.", artist: "Clipse, Stove God Cooks", duration: "3:21" },
    { id: 10, title: "Inglorious Bastards", artist: "Clipse, Ab-Liva", duration: "2:33" },
    { id: 11, title: "So Far Ahead", artist: "Clipse, Pharrell Williams", duration: "3:22" },
    { id: 12, title: "Let God Sort Em Out / Chandeliers", artist: "Clipse, Nas", duration: "2:32" },
    { id: 13, title: "By the Grace of God", artist: "Clipse, Pharrell Williams", duration: "3:06" },
  ];

  // 4. Danh sách bài hát cho Album Willoughby Tucker, I'll Always Love You
  const ethelCainTracklist = [
    { id: 1, title: "Janie", artist: "Ethel Cain", duration: "5:00" },
    { id: 2, title: "Willoughby's Theme", artist: "Ethel Cain", duration: "4:44" },
    { id: 3, title: "Fuck Me Eyes", artist: "Ethel Cain", duration: "6:04" },
    { id: 4, title: "Nettles", artist: "Ethel Cain", duration: "8:03" },
    { id: 5, title: "Willoughby's Interlude", artist: "Ethel Cain", duration: "7:27" },
    { id: 6, title: "Dust Bowl", artist: "Ethel Cain", duration: "6:26" },
    { id: 7, title: "A Knock at the Door", artist: "Ethel Cain", duration: "5:24" },
    { id: 8, title: "Radio Towers", artist: "Ethel Cain", duration: "5:12" },
    { id: 9, title: "Tempest", artist: "Ethel Cain", duration: "10:00" },
    { id: 10, title: "Waco, Texas", artist: "Ethel Cain", duration: "15:15" },
  ];

  // 5. Danh sách bài hát cho Album moisturizer
  const wetLegTracklist = [
    { id: 1, title: "CPR", artist: "Wet Leg", duration: "2:50" },
    { id: 2, title: "Liquidize", artist: "Wet Leg", duration: "2:27" },
    { id: 3, title: "Catch These Fists", artist: "Wet Leg", duration: "3:08" },
    { id: 4, title: "Davina McCall", artist: "Wet Leg", duration: "3:47" },
    { id: 5, title: "Jennifer's Body", artist: "Wet Leg", duration: "2:26" },
    { id: 6, title: "Mangetout", artist: "Wet Leg", duration: "3:24" },
    { id: 7, title: "Pond Song", artist: "Wet Leg", duration: "2:58" },
    { id: 8, title: "Pokemon", artist: "Wet Leg", duration: "3:26" },
    { id: 9, title: "Pillow Talk", artist: "Wet Leg", duration: "2:56" },
    { id: 10, title: "Don't Speak", artist: "Wet Leg", duration: "3:13" },
    { id: 11, title: "11:21", artist: "Wet Leg", duration: "3:46" },
    { id: 12, title: "U and Me at Home", artist: "Wet Leg", duration: "4:01" },
  ];

  // 6. Danh sách bài hát cho Album Neon Grey Midnight Green
  const nekoCaseTracklist = [
    { id: 1, title: "Destination", artist: "Neko Case", duration: "5:48" },
    { id: 2, title: "Tomboy Gold", artist: "Neko Case", duration: "1:46" },
    { id: 3, title: "Wreck", artist: "Neko Case", duration: "3:10" },
    { id: 4, title: "Winchester Mansion of Sound", artist: "Neko Case", duration: "4:48" },
    { id: 5, title: "An Ice Age", artist: "Neko Case", duration: "3:32" },
    { id: 6, title: "Neon Grey Midnight Green", artist: "Neko Case", duration: "4:30" },
    { id: 7, title: "Oh, Neglect...", artist: "Neko Case", duration: "2:59" },
    { id: 8, title: "Louise", artist: "Neko Case", duration: "4:18" },
    { id: 9, title: "Rusty Mountain", artist: "Neko Case", duration: "3:29" },
    { id: 10, title: "Little Gears", artist: "Neko Case", duration: "4:00" },
    { id: 11, title: "Baby I'm Not (A Werewolf)", artist: "Neko Case", duration: "3:03" },
    { id: 12, title: "Match-Lit", artist: "Neko Case", duration: "5:47" },
  ];

  // 7. Danh sách bài hát cho Album Minh Tinh
  const vanMaiHuongTracklist = [
    { id: 1, title: "Đại Minh Tinh", artist: "Văn Mai Hương, Hứa Kim Tuyền", duration: "4:07" },
    { id: 2, title: "Martini", artist: "Văn Mai Hương, Hứa Kim Tuyền", duration: "3:20" },
    { id: 3, title: "Vườn Địa Đàng", artist: "Văn Mai Hương, Hứa Kim Tuyền", duration: "3:07" },
    { id: 4, title: "A Red Flag", artist: "Văn Mai Hương, Hứa Kim Tuyền", duration: "3:50" },
    { id: 5, title: "Bay Cùng Bay", artist: "Văn Mai Hương, Hứa Kim Tuyền, Tuimi", duration: "4:12" },
    { id: 6, title: "Mưa Tháng Sáu", artist: "Văn Mai Hương, GREY D, Trung Quân", duration: "4:17" },
    { id: 7, title: "Cơn Mưa Rào", artist: "Văn Mai Hương, Negav, Hứa Kim Tuyền", duration: "3:45" },
    { id: 8, title: "Nam Bán Cầu", artist: "Văn Mai Hương, Hứa Kim Tuyền", duration: "3:18" },
  ];

  // Danh sách giả lập cho các Album chưa nhập liệu
  const defaultTracklist = [
    { id: 1, title: "Track 01 - Intro", artist: product.artist, duration: "2:45" },
    { id: 2, title: "Track 02 - The Journey", artist: product.artist, duration: "3:12" },
    { id: 3, title: "Track 03 - Midnight Echoes", artist: product.artist, duration: "4:05" },
    { id: 4, title: "Track 04 - Lost in Translation", artist: product.artist, duration: "3:30" },
    { id: 5, title: "Track 05 - Acoustic Sessions", artist: product.artist, duration: "5:10" },
  ];

  // Logic tự động chọn list nhạc theo tên Album
  let displayTracklist = defaultTracklist;
  if (product.name === "Lux") {
    displayTracklist = luxTracklist;
  } else if (product.name === "Music Has The Right to the children") {
    displayTracklist = boardsOfCanadaTracklist;
  } else if (product.name === "Let God Sort Em Out") {
    displayTracklist = clipseTracklist;
  } else if (product.name === "Willoughby Tucker, I'll Always Love You") {
    displayTracklist = ethelCainTracklist;
  } else if (product.name === "moisturizer") {
    displayTracklist = wetLegTracklist;
  } else if (product.name === "Neon Grey Midnight Green") {
    displayTracklist = nekoCaseTracklist;
  } else if (product.name === "Minh Tinh") {
    displayTracklist = vanMaiHuongTracklist;
  }

  // Tự động sinh Thông số kỹ thuật chuyên sâu nếu là Thiết bị nghe
  const techSpecs = [
    { label: "Thương hiệu", value: product.artist }, 
    { label: "Bảo hành", value: "12 Tháng chính hãng" },
    { label: "Tình trạng", value: "Mới 100% Fullbox" },
    { label: "Giao hàng", value: "Miễn phí vận chuyển hỏa tốc" },
    { label: "Đổi trả", value: "1-đổi-1 trong 7 ngày nếu có lỗi NSX" },
  ];

  return (
    <div className="app-container modern-theme">
      {/* HEADER */}
      <header className="main-header">
        <div className="logo-modern" onClick={() => setCurrentPage('home')} style={{ cursor: 'pointer' }}>
          <span className="accent-text">Master</span>CD
        </div>
        <nav className="nav-links">
          <a href="#" onClick={(e) => { e.preventDefault(); setCurrentPage('home'); }}>Trang chủ</a>
          <a href="#" className="active" onClick={(e) => { e.preventDefault(); setCurrentPage('products'); }}>Sản phẩm</a>
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

      {/* NỘI DUNG CHI TIẾT SẢN PHẨM */}
      <main className="product-detail-main">
        <button className="btn-back" onClick={() => setCurrentPage('products')}>
          &#8592; Quay lại danh sách
        </button>

        <div className="detail-layout">
          {/* CỘT TRÁI: Hình ảnh */}
          <div className="detail-image-section">
            <img 
              src={product.img} 
              alt={product.name} 
              className="detail-main-img"
              onError={(e) => { e.target.src = 'https://via.placeholder.com/500x500/1e222a/475569?text=MasterCD' }} 
            />
          </div>

          {/* CỘT PHẢI: Thông tin & Đặt hàng */}
          <div className="detail-info-section">
            <span className="detail-category">{product.category}</span>
            <h1 className="detail-title">{product.name}</h1>
            <p className="detail-artist">{product.artist}</p>
            
            <div className="detail-price-box">
              <span className="detail-price">{product.price}</span>
              <span className="detail-status">Tình trạng: <span className="text-green">Còn hàng</span></span>
            </div>

            <p className="detail-description">
              {product.category === 'Thiết bị nghe' 
                ? `Thiết bị ${product.name} cao cấp từ thương hiệu ${product.artist}. Giúp khai thác tối đa dải động và chi tiết của các định dạng âm thanh vật lý, mang lại trải nghiệm Hi-Fi chân thực nhất cho người đam mê.`
                : `Sản phẩm ${product.category} chất lượng cao, mang đến trải nghiệm âm thanh nguyên bản không nén. Phù hợp cho những hệ thống âm thanh tiêu chuẩn và người đam mê sưu tầm.`}
            </p>

            <div className="detail-actions">
              <button 
                className="btn-add-to-cart-large"
                onClick={() => {
                  addToCart(product);
                  alert(`Đã thêm ${product.name} vào giỏ hàng!`);
                }}
              >
                THÊM VÀO GIỎ HÀNG
              </button>
              <button 
                className="btn-buy-now"
                onClick={() => {
                  addToCart(product);
                  setCurrentPage('checkout');
                }}
              >
                MUA NGAY
              </button>
            </div>

            {/* KIỂM TRA CATEGORY: NẾU KHÔNG PHẢI THIẾT BỊ NGHE THÌ HIỆN TRACKLIST */}
            {product.category !== 'Thiết bị nghe' ? (
              <div className="tracklist-container">
                <div className="tracklist-header">
                  <span className="th-hash">#</span>
                  <span className="th-title">Title</span>
                  <span className="th-time">🕒</span>
                </div>
                <ul className="tracklist">
                  {displayTracklist.map((track) => (
                    <li key={track.id} className="track-item">
                      <div className="track-left">
                        <span className="track-number">{track.id}</span>
                        <div className="track-info">
                          <span className="track-name">{track.title}</span>
                          <span className="track-artist">{track.artist}</span>
                        </div>
                      </div>
                      <span className="track-duration">{track.duration}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              /* NẾU LÀ THIẾT BỊ NGHE: HIỂN THỊ THÔNG SỐ KỸ THUẬT (SPECS) */
              <div className="tracklist-container specs-container">
                <div className="tracklist-header">
                  <span className="th-title" style={{ paddingLeft: 0 }}>Thông số & Chính sách</span>
                </div>
                <ul className="tracklist">
                  {techSpecs.map((spec, index) => (
                    <li key={index} className="track-item" style={{ padding: '15px 5px' }}>
                      <span className="spec-label" style={{ color: '#94a3b8', width: '120px' }}>{spec.label}:</span>
                      <span className="spec-value" style={{ color: '#fff', fontWeight: '500', flex: 1 }}>{spec.value}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer setCurrentPage={setCurrentPage} />
    </div>
  );
}

export default ProductDetail;