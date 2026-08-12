import React, { useState, useEffect } from 'react';
import './AdminDashboard.css';
import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';

function AdminDashboard({ setCurrentPage, cart = [] }) {
  const [activeTab, setActiveTab] = useState('analytics');
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [inventoryLogs, setInventoryLogs] = useState([]);
  const [selectedCustomerOrders, setSelectedCustomerOrders] = useState(null);

  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: '', artist: '', price: '', category: 'CD', genre: 'Rock', stock: 20, img: '/images/album01.jpg'
  });

  const [toast, setToast] = useState({ show: false, message: '' });

  // 🔥 HÀM ĐỊNH DẠNG NGÀY GIỜ ĐẸP CHUẨN VIỆT NAM (VD: 12/08/2026 - 09:44)
  const formatDate = (dateStr) => {
    if (!dateStr) return 'Mới đây';
    try {
      const d = new Date(dateStr);
      if (isNaN(d.getTime())) return dateStr;
      const date = d.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' });
      const time = d.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' });
      return `${date} - ${time}`;
    } catch (e) {
      return dateStr;
    }
  };

  // 🔥 HÀM TỰ ĐỘNG BIẾN ĐỔI CHUỖI SỐ THÔ THÀNH DẠNG 32.000.000đ
  const formatPriceInput = (priceVal) => {
    if (!priceVal) return '0đ';
    const str = String(priceVal).trim();
    if (str.endsWith('đ') && str.includes('.')) return str;
    const num = parseInt(str.replace(/\D/g, '')) || 0;
    return num.toLocaleString('vi-VN') + 'đ';
  };

  const parsePrice = (priceStr) => {
    if (typeof priceStr === 'number') return priceStr;
    return parseInt(String(priceStr).replace(/\D/g, '')) || 0;
  };

  const formatPrice = (num) => num.toLocaleString('vi-VN') + 'đ';

  // 1. TẢI DỮ LIỆU CHÍNH CHỦ TỪ MONGODB API
  const fetchProducts = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/products');
      if (res.ok) {
        const data = await res.json();
        setProducts(data);
      }
    } catch (err) {
      console.error("Lỗi kết nối Backend products:", err);
    }
  };

  const fetchLogs = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/inventory-logs');
      if (res.ok) {
        const data = await res.json();
        setInventoryLogs(data);
      }
    } catch (err) {
      console.error("Lỗi lấy nhật ký kho:", err);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchLogs();

    try {
      const savedOrders = JSON.parse(localStorage.getItem('userOrders')) ||
                          JSON.parse(localStorage.getItem('orders')) ||
                          [];
      if (Array.isArray(savedOrders)) setOrders(savedOrders);
      else setOrders([]);
    } catch (e) {
      setOrders([]);
    }
  }, []);

  const triggerToast = (msg) => {
    setToast({ show: true, message: msg });
    setTimeout(() => setToast({ show: false, message: '' }), 3000);
  };

  const safeOrders = Array.isArray(orders) ? orders : [];
  const safeProducts = Array.isArray(products) ? products : [];

  const totalRevenue = safeOrders.reduce((sum, order) => sum + (order.totalAmount || 0), 0);
  const totalOrdersCount = safeOrders.length;

  // 🔥 TÍNH TỶ LỆ DOANH THU THEO ĐỊNH DẠNG CHO BIỂU ĐỒ TRÒN (PIE CHART)
  const categoryStats = { 'CD': 0, 'Vinyl': 0, 'Cassette': 0, 'Thiết bị nghe': 0 };

  safeOrders.forEach(order => {
    if (order.items && Array.isArray(order.items)) {
      order.items.forEach(item => {
        const cat = item.category || 'CD';
        const itemTotal = parsePrice(item.price) * (item.quantity || 1);
        if (categoryStats[cat] !== undefined) {
          categoryStats[cat] += itemTotal;
        } else {
          categoryStats['CD'] += itemTotal;
        }
      });
    }
  });

  const totalCatRevenue = Object.values(categoryStats).reduce((a, b) => a + b, 0);

  const cdRevenue = totalCatRevenue > 0 ? categoryStats['CD'] : 15000000;
  const vinylRevenue = totalCatRevenue > 0 ? categoryStats['Vinyl'] : 10000000;
  const cassetteRevenue = totalCatRevenue > 0 ? categoryStats['Cassette'] : 3000000;
  const deviceRevenue = totalCatRevenue > 0 ? categoryStats['Thiết bị nghe'] : 8800000;

  const grandTotal = cdRevenue + vinylRevenue + cassetteRevenue + deviceRevenue || 1;

  const cdPercent = Math.round((cdRevenue / grandTotal) * 100);
  const vinylPercent = Math.round((vinylRevenue / grandTotal) * 100);
  const cassettePercent = Math.round((cassetteRevenue / grandTotal) * 100);
  const devicePercent = Math.max(0, 100 - (cdPercent + vinylPercent + cassettePercent));

  const p1 = cdPercent;
  const p2 = p1 + vinylPercent;
  const p3 = p2 + cassettePercent;

  const pieGradient = `conic-gradient(
    #00e5ff 0% ${p1}%,
    #10b981 ${p1}% ${p2}%,
    #ffd700 ${p2}% ${p3}%,
    #d946ef ${p3}% 100%
  )`;

  // HÀM BẮN LOG LÊN MONGODB
  const addInventoryLog = async (type, productName, quantity, note) => {
    const logData = {
      logId: "LOG_" + Date.now(),
      date: formatDate(new Date().toISOString()),
      type,
      productName,
      quantity,
      note
    };

    try {
      await fetch('http://localhost:5000/api/inventory-logs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(logData)
      });
      fetchLogs();
    } catch (err) {
      console.error("Lỗi ghi log MongoDB:", err);
    }
  };

  const handleDeleteLog = async (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa dòng nhật ký kho này?")) {
      try {
        await fetch(`http://localhost:5000/api/inventory-logs/${id}`, { method: 'DELETE' });
        fetchLogs();
        triggerToast("Đã xóa dòng nhật ký kho!");
      } catch (err) {
        console.error("Lỗi xóa log:", err);
      }
    }
  };

  const handleClearAllLogs = async () => {
    if (window.confirm("Bạn có chắc chắn muốn xóa TOÀN BỘ nhật ký kho?")) {
      try {
        await fetch('http://localhost:5000/api/inventory-logs', { method: 'DELETE' });
        fetchLogs();
        triggerToast("Đã dọn dẹp sạch nhật ký kho!");
      } catch (err) {
        console.error("Lỗi xóa toàn bộ log:", err);
      }
    }
  };

  const monthlyRevenueData = [
    { month: 'Tháng 3', revenue: 1200000 },
    { month: 'Tháng 4', revenue: 2100000 },
    { month: 'Tháng 5', revenue: 1800000 },
    { month: 'Tháng 6', revenue: 3500000 },
    { month: 'Tháng 7', revenue: 2900000 },
    { month: 'Tháng 8', revenue: totalRevenue > 0 ? totalRevenue : 36800000 }
  ];

  const maxRevenue = Math.max(...monthlyRevenueData.map(d => d.revenue), 1);

  const customerMap = {};
  safeOrders.forEach(order => {
    const key = order.phone || order.customerName || 'Khách vãng lai';
    if (!customerMap[key]) {
      customerMap[key] = {
        name: order.customerName || 'Khách vãng lai',
        phone: order.phone || 'N/A',
        address: order.address || 'N/A',
        totalSpent: 0,
        orderCount: 0,
        ordersList: []
      };
    }
    customerMap[key].totalSpent += (order.totalAmount || 0);
    customerMap[key].orderCount += 1;
    customerMap[key].ordersList.push(order);
  });

  const customerList = Object.values(customerMap).sort((a, b) => b.totalSpent - a.totalSpent);

  const handleCategoryChange = (e) => {
    const selectedCat = e.target.value;
    if (selectedCat === 'Thiết bị nghe') {
      setFormData(prev => ({ ...prev, category: selectedCat, genre: 'Thiết bị' }));
    } else {
      setFormData(prev => ({ 
        ...prev, 
        category: selectedCat, 
        genre: prev.genre === 'Thiết bị' ? 'Rock' : prev.genre 
      }));
    }
  };

  const handleImageFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, img: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleOpenModal = (product = null) => {
    if (product) {
      setEditingProduct(product);
      setFormData({
        name: product.name || '',
        artist: product.artist || '',
        price: product.price || '',
        category: product.category || 'CD',
        genre: product.category === 'Thiết bị nghe' ? 'Thiết bị' : (product.genre || 'Rock'),
        stock: product.stock || 20,
        img: product.img || '/images/album01.jpg'
      });
    } else {
      setEditingProduct(null);
      setFormData({ name: '', artist: '', price: '', category: 'CD', genre: 'Rock', stock: 20, img: '/images/album01.jpg' });
    }
    setShowModal(true);
  };

  const handleSaveProduct = async (e) => {
    e.preventDefault();

    const inputName = formData.name.trim();
    const addedStock = parseInt(formData.stock) || 0;
    const formattedPrice = formatPriceInput(formData.price);

    const dataToSave = {
      ...formData,
      price: formattedPrice
    };

    const existingIndex = products.findIndex(
      p => p.name.trim().toLowerCase() === inputName.toLowerCase() &&
           (!editingProduct || (p._id || p.id) !== (editingProduct._id || editingProduct.id))
    );

    if (!editingProduct && existingIndex !== -1) {
      const existingItem = products[existingIndex];
      const newTotalStock = (parseInt(existingItem.stock) || 0) + addedStock;
      const targetId = existingItem._id || existingItem.id;

      try {
        await fetch(`http://localhost:5000/api/products/${targetId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...dataToSave, stock: newTotalStock })
        });
        await addInventoryLog('IMPORT', existingItem.name, addedStock, `Nhập bổ sung ${addedStock} sp (Tổng tồn: ${newTotalStock})`);
        fetchProducts();
        triggerToast(`Đã cộng dồn +${addedStock} vào MongoDB cho "${existingItem.name}"!`);
      } catch (err) {
        console.error("Lỗi cập nhật sản phẩm:", err);
      }
    } else if (editingProduct) {
      const targetId = editingProduct._id || editingProduct.id;
      const oldStock = parseInt(editingProduct.stock) || 0;
      const diff = addedStock - oldStock;

      try {
        await fetch(`http://localhost:5000/api/products/${targetId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(dataToSave)
        });

        if (diff > 0) await addInventoryLog('IMPORT', formData.name, diff, `Nhập thêm ${diff} sp`);
        else if (diff < 0) await addInventoryLog('EXPORT', formData.name, Math.abs(diff), `Giảm thủ công ${Math.abs(diff)} sp`);

        fetchProducts();
        triggerToast("Đã cập nhật sản phẩm vào MongoDB!");
      } catch (err) {
        console.error("Lỗi sửa sản phẩm:", err);
      }
    } else {
      try {
        await fetch('http://localhost:5000/api/products', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(dataToSave)
        });

        await addInventoryLog('IMPORT', formData.name, addedStock, `Thêm mới sản phẩm vào MongoDB (Tồn ban đầu: ${addedStock})`);
        fetchProducts();
        triggerToast("Đã lưu sản phẩm mới vĩnh viễn vào MongoDB!");
      } catch (err) {
        console.error("Lỗi thêm sản phẩm mới:", err);
      }
    }

    setShowModal(false);
  };

  const handleDeleteProduct = async (id) => {
    const prodToDelete = products.find(p => (p._id || p.id) === id);
    if (window.confirm("Bạn có chắc chắn muốn xóa sản phẩm này khỏi MongoDB?")) {
      try {
        await fetch(`http://localhost:5000/api/products/${id}`, { method: 'DELETE' });
        if (prodToDelete) {
          await addInventoryLog('EXPORT', prodToDelete.name, prodToDelete.stock || 0, 'Xóa khỏi hệ thống');
        }
        fetchProducts();
        triggerToast("Đã xóa sản phẩm khỏi MongoDB!");
      } catch (err) {
        console.error("Lỗi xóa sản phẩm:", err);
      }
    }
  };

  return (
    <div className="app-container modern-theme">
      <Header setCurrentPage={setCurrentPage} cart={cart} />

      <main className="admin-main">
        <div className="admin-container">
          
          <div className="admin-header">
            <div>
              <h1>Bảng Quản Trị Hệ Thống <span className="accent-text">MasterCD</span></h1>
              <p>Thống kê doanh thu, theo dõi xuất nhập kho và quản lý khách hàng.</p>
            </div>
            
            <div className="admin-tab-buttons">
              <button className={`tab-btn ${activeTab === 'analytics' ? 'active' : ''}`} onClick={() => setActiveTab('analytics')}>
                Báo Cáo Doanh Thu
              </button>
              <button className={`tab-btn ${activeTab === 'customers' ? 'active' : ''}`} onClick={() => setActiveTab('customers')}>
                Quản Lý Khách Hàng ({customerList.length})
              </button>
              <button className={`tab-btn ${activeTab === 'products' ? 'active' : ''}`} onClick={() => setActiveTab('products')}>
                Kho Hàng ({safeProducts.length})
              </button>
              <button className={`tab-btn ${activeTab === 'inventory-logs' ? 'active' : ''}`} onClick={() => setActiveTab('inventory-logs')}>
                Nhật Ký Xuất/Nhập Kho ({inventoryLogs.length})
              </button>
            </div>
          </div>

          {activeTab === 'analytics' && (
            <div className="analytics-section">
              <div className="stats-overview-grid">
                <div className="admin-stat-card">
                  <div>
                    <span className="stat-title">Tổng Doanh Thu Cửa Hàng</span>
                    <h2 className="stat-value">{formatPrice(totalRevenue > 0 ? totalRevenue : 36800000)}</h2>
                  </div>
                </div>

                <div className="admin-stat-card">
                  <div>
                    <span className="stat-title">Tổng Đơn Hàng Đã Xử Lý</span>
                    <h2 className="stat-value">{totalOrdersCount > 0 ? totalOrdersCount : 1} Đơn hàng</h2>
                  </div>
                </div>

                <div className="admin-stat-card">
                  <div>
                    <span className="stat-title">Sản Phẩm Trong Kho</span>
                    <h2 className="stat-value">{safeProducts.length} Sản phẩm</h2>
                  </div>
                </div>
              </div>

              {/* LƯỚI KHU VỰC CHỨA 2 BIỂU ĐỒ (CỘT & TRÒN) */}
              <div className="admin-charts-grid" style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '25px', marginTop: '25px' }}>
                
                {/* 1. BIỂU ĐỒ CỘT DOANH THU THEO THÁNG */}
                <div className="admin-card-box chart-container-box">
                  <h3>Biểu Đồ Doanh Thu Theo Tháng (VND)</h3>
                  <div className="bar-chart-wrapper">
                    {monthlyRevenueData.map((item, index) => {
                      const heightPercent = Math.round((item.revenue / maxRevenue) * 100);
                      return (
                        <div key={index} className="bar-column">
                          <span className="bar-value-tooltip">{formatPrice(item.revenue)}</span>
                          <div className="bar-track">
                            <div className="bar-fill" style={{ height: `${heightPercent}%` }}></div>
                          </div>
                          <span className="bar-label">{item.month}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* 2. BIỂU ĐỒ TRÒN TỶ LỆ DOANH THU THEO ĐỊNH DẠNG */}
                <div className="admin-card-box pie-chart-container-box" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                  <h3 style={{ width: '100%', textAlign: 'left', marginBottom: '20px' }}>Tỷ Lệ Doanh Thu Theo Danh Mục</h3>
                  
                  <div style={{ display: 'flex', alignItems: 'center', gap: '30px', flexWrap: 'wrap', justifyContent: 'center' }}>
                    
                    <div style={{
                      width: '180px',
                      height: '180px',
                      borderRadius: '50%',
                      background: pieGradient,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0 8px 25px rgba(0, 0, 0, 0.4)',
                      position: 'relative'
                    }}>
                      <div style={{
                        width: '100px',
                        height: '100px',
                        borderRadius: '50%',
                        backgroundColor: '#14171c',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}>
                        <span style={{ fontSize: '11px', color: '#94a3b8' }}>Tổng thể</span>
                        <strong style={{ fontSize: '14px', color: '#00e5ff' }}>100%</strong>
                      </div>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <span style={{ width: '12px', height: '12px', borderRadius: '3px', backgroundColor: '#00e5ff' }}></span>
                        <span style={{ color: '#cbd5e1' }}>CD Hi-Res:</span>
                        <strong style={{ color: '#fff' }}>{cdPercent}%</strong>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <span style={{ width: '12px', height: '12px', borderRadius: '3px', backgroundColor: '#10b981' }}></span>
                        <span style={{ color: '#cbd5e1' }}>Vinyl (Đĩa Than):</span>
                        <strong style={{ color: '#fff' }}>{vinylPercent}%</strong>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <span style={{ width: '12px', height: '12px', borderRadius: '3px', backgroundColor: '#ffd700' }}></span>
                        <span style={{ color: '#cbd5e1' }}>Băng Cassette:</span>
                        <strong style={{ color: '#fff' }}>{cassettePercent}%</strong>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <span style={{ width: '12px', height: '12px', borderRadius: '3px', backgroundColor: '#d946ef' }}></span>
                        <span style={{ color: '#cbd5e1' }}>Thiết bị nghe:</span>
                        <strong style={{ color: '#fff' }}>{devicePercent}%</strong>
                      </div>
                    </div>

                  </div>
                </div>

              </div>
            </div>
          )}

          {activeTab === 'customers' && (
            <div className="customers-section">
              <div className="admin-card-box full-width">
                <h3>Danh Sách Khách Hàng & Chi Tiêu</h3>
                {customerList.length === 0 ? (
                  <p className="no-data">Chưa có dữ liệu khách hàng mua hàng</p>
                ) : (
                  <div className="table-responsive">
                    <table className="admin-products-table">
                      <thead>
                        <tr>
                          <th>Khách hàng</th>
                          <th>Số điện thoại</th>
                          <th>Địa chỉ mặc định</th>
                          <th>Số đơn đã mua</th>
                          <th>Tổng chi tiêu</th>
                          <th>Phân hạng</th>
                          <th>Lịch sử mua hàng</th>
                        </tr>
                      </thead>
                      <tbody>
                        {customerList.map((cust, idx) => (
                          <tr key={idx}>
                            <td className="font-bold">{cust.name}</td>
                            <td>{cust.phone}</td>
                            <td>{cust.address}</td>
                            <td><strong>{cust.orderCount} đơn</strong></td>
                            <td className="price-text">{formatPrice(cust.totalSpent)}</td>
                            <td>
                              {/* 🔥 FIX PHÂN HẠNG VÀ CHỐNG VỠ KHUNG TEXT */}
                              <span className={`tag-rank ${cust.totalSpent >= 15000000 ? 'diamond' : cust.totalSpent >= 2000000 ? 'vip' : 'normal'}`}>
                                {cust.totalSpent >= 15000000 ? 'Kim Cương' : cust.totalSpent >= 2000000 ? 'Khách VIP 🌟' : 'Thành Viên'}
                              </span>
                            </td>
                            <td>
                              <button 
                                className="btn-view-history"
                                onClick={() => setSelectedCustomerOrders(cust)}
                              >
                                Xem Lịch Sử ({cust.ordersList.length})
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'products' && (
            <div className="products-manager-section">
              <div className="manager-actions-row">
                <h3>Danh sách toàn bộ sản phẩm trong CSDL MongoDB</h3>
                <button className="btn-add-product" onClick={() => handleOpenModal()}>
                  Thêm Sản Phẩm Mới
                </button>
              </div>

              <div className="table-responsive">
                <table className="admin-products-table">
                  <thead>
                    <tr>
                      <th>Ảnh</th>
                      <th>Tên Sản Phẩm / Album</th>
                      <th>Ca sĩ / Thương hiệu</th>
                      <th>Định dạng</th>
                      <th>Thể loại</th>
                      <th>Giá bán</th>
                      <th>Tồn kho</th>
                      <th>Thao tác</th>
                    </tr>
                  </thead>
                  <tbody>
                    {safeProducts.map(product => (
                      <tr key={product._id || product.id}>
                        <td><img src={product.img} alt={product.name} className="table-img" /></td>
                        <td className="font-bold">{product.name}</td>
                        <td>{product.artist}</td>
                        <td><span className="tag-format">{product.category}</span></td>
                        <td><span className="tag-genre">{product.genre || 'Rock'}</span></td>
                        <td className="price-text">{formatPriceInput(product.price)}</td>
                        <td><span className="stock-count">{product.stock || 20}</span></td>
                        <td>
                          <div className="action-btns">
                            <button className="btn-edit" onClick={() => handleOpenModal(product)}>Sửa</button>
                            <button className="btn-delete" onClick={() => handleDeleteProduct(product._id || product.id)}>Xóa</button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'inventory-logs' && (
            <div className="inventory-logs-section">
              <div className="admin-card-box full-width">
                <div className="manager-actions-row">
                  <h3>Nhật Ký Lịch Sử Xuất & Nhập Kho (MongoDB)</h3>
                  {inventoryLogs.length > 0 && (
                    <button className="btn-delete" style={{ padding: '8px 16px' }} onClick={handleClearAllLogs}>
                      Xóa Toàn Bộ Log
                    </button>
                  )}
                </div>

                {inventoryLogs.length === 0 ? (
                  <p className="no-data" style={{ padding: '30px', textAlign: 'center', color: '#94a3b8' }}>
                    Chưa có lịch sử xuất nhập kho nào trong CSDL.
                  </p>
                ) : (
                  <div className="table-responsive">
                    <table className="admin-products-table">
                      <thead>
                        <tr>
                          <th>Mã Log</th>
                          <th>Thời gian</th>
                          <th>Loại giao dịch</th>
                          <th>Sản phẩm</th>
                          <th>Số lượng</th>
                          <th>Ghi chú / Chi tiết</th>
                          <th>Thao tác</th>
                        </tr>
                      </thead>
                      <tbody>
                        {inventoryLogs.map((log) => (
                          <tr key={log._id || log.id || log.logId}>
                            <td className="font-mono">{log.logId || log._id}</td>
                            <td>{formatDate(log.date)}</td>
                            <td>
                              <span className={`tag-log-type ${log.type === 'IMPORT' ? 'import' : 'export'}`}>
                                {log.type === 'IMPORT' ? 'NHẬP KHO (+)' : 'XUẤT KHO (-)'}
                              </span>
                            </td>
                            <td className="font-bold">{log.productName}</td>
                            <td>
                              <strong className={log.type === 'IMPORT' ? 'text-green' : 'text-red'}>
                                {log.type === 'IMPORT' ? `+${log.quantity}` : `-${log.quantity}`}
                              </strong>
                            </td>
                            <td>{log.note}</td>
                            <td>
                              <button 
                                className="btn-delete" 
                                style={{ padding: '4px 10px', fontSize: '12px' }}
                                onClick={() => handleDeleteLog(log._id || log.id)}
                              >
                                Xóa
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          )}

        </div>
      </main>

      {/* MODAL LỊCH SỬ KHÁCH HÀNG */}
      {selectedCustomerOrders && (
        <div className="admin-modal-overlay">
          <div className="admin-modal customer-orders-modal">
            <h2>Lịch Sử Mua Hàng: <span className="accent-text">{selectedCustomerOrders.name}</span></h2>
            <p className="modal-subtitle">SĐT: {selectedCustomerOrders.phone} | Tổng đơn: {selectedCustomerOrders.orderCount}</p>

            <div className="customer-orders-scroll">
              {selectedCustomerOrders.ordersList.map((ord, i) => (
                <div key={i} className="customer-order-card">
                  <div className="order-card-header">
                    <strong>Đơn hàng #{ord.orderId || (i + 1)}</strong>
                    {/* FIX HIỂN THỊ NGÀY GIỜ CHUẨN VIỆT NAM */}
                    <span className="order-date">{formatDate(ord.createdAt)}</span>
                  </div>
                  <div className="order-items-mini">
                    {ord.items && ord.items.map((item, j) => (
                      <div key={j} className="mini-item-row">
                        <span>{item.name} (x{item.quantity})</span>
                        <span>{formatPrice(parsePrice(item.price) * item.quantity)}</span>
                      </div>
                    ))}
                  </div>
                  <div className="order-card-footer">
                    <span>Tổng tiền: <strong>{formatPrice(ord.totalAmount || 0)}</strong></span>
                    <span className="status-badge">{ord.status || 'Đã xác nhận'}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="modal-actions">
              <button className="btn-cancel" onClick={() => setSelectedCustomerOrders(null)}>Đóng</button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL THÊM / SỬA SẢN PHẨM */}
      {showModal && (
        <div className="admin-modal-overlay">
          <div className="admin-modal">
            <h2>{editingProduct ? 'Cập nhật sản phẩm' : 'Thêm sản phẩm mới'}</h2>
            <form onSubmit={handleSaveProduct}>
              <div className="modal-grid">
                <div className="modal-input-group full">
                  <label>Tên Sản phẩm / Album *</label>
                  <input type="text" required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
                </div>

                <div className="modal-input-group">
                  <label>
                    {formData.category === 'Thiết bị nghe' ? 'Thương hiệu / Hãng SX *' : 'Nghệ sĩ / Ca sĩ *'}
                  </label>
                  <input type="text" required value={formData.artist} onChange={e => setFormData({...formData, artist: e.target.value})} />
                </div>

                <div className="modal-input-group">
                  <label>Giá bán *</label>
                  <input type="text" required value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} />
                </div>

                <div className="modal-input-group">
                  <label>Định dạng *</label>
                  <select value={formData.category} onChange={handleCategoryChange}>
                    <option value="CD">CD</option>
                    <option value="Vinyl">Vinyl (Đĩa than)</option>
                    <option value="Cassette">Cassette</option>
                    <option value="Thiết bị nghe">Thiết bị nghe</option>
                  </select>
                </div>

                <div className="modal-input-group">
                  <label>Thể loại nhạc *</label>
                  <select 
                    value={formData.genre} 
                    onChange={e => setFormData({...formData, genre: e.target.value})}
                    disabled={formData.category === 'Thiết bị nghe'}
                    style={{ opacity: formData.category === 'Thiết bị nghe' ? 0.6 : 1, cursor: formData.category === 'Thiết bị nghe' ? 'not-allowed' : 'pointer' }}
                  >
                    {formData.category === 'Thiết bị nghe' ? (
                      <option value="Thiết bị">Không áp dụng (Thiết bị)</option>
                    ) : (
                      <>
                        <option value="Rock">Rock</option>
                        <option value="Metal">Metal</option>
                        <option value="Pop">Pop</option>
                        <option value="Ambient">Ambient</option>
                        <option value="Jazz">Jazz</option>
                        <option value="Electronic">Electronic</option>
                      </>
                    )}
                  </select>
                </div>

                <div className="modal-input-group full">
                  <label>Số lượng tồn kho (Nhập thêm / Tồn kho ban đầu) *</label>
                  <input type="number" required value={formData.stock} onChange={e => setFormData({...formData, stock: parseInt(e.target.value) || 0})} />
                </div>

                <div className="modal-input-group full">
                  <label>Hình ảnh sản phẩm *</label>
                  <div className="image-input-container">
                    <input 
                      type="file" 
                      accept="image/*" 
                      onChange={handleImageFileChange} 
                      className="file-upload-btn"
                    />
                    <span className="input-divider-text">hoặc dán Link URL / Đường dẫn ảnh:</span>
                    <input 
                      type="text" 
                      required 
                      value={formData.img} 
                      onChange={e => setFormData({...formData, img: e.target.value})} 
                      placeholder="https://... hoặc /images/album01.jpg"
                    />
                  </div>

                  {formData.img && (
                    <div className="modal-img-preview">
                      <span className="preview-label">Ảnh xem trước:</span>
                      <img src={formData.img} alt="Preview" onError={(e) => { e.target.style.display = 'none'; }} />
                    </div>
                  )}
                </div>
              </div>

              <div className="modal-actions">
                <button type="button" className="btn-cancel" onClick={() => setShowModal(false)}>Hủy</button>
                <button type="submit" className="btn-submit">Lưu Sản Phẩm</button>
              </div>
            </form>
          </div>
        </div>
      )}

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

export default AdminDashboard;