import React, { useState, useEffect } from 'react';
import Home from './pages/Home.jsx';
import StoreInfo from './pages/StoreInfo.jsx';
import Login from './pages/Login.jsx';
import Products from './pages/Products.jsx';
import Contact from './pages/Contact.jsx';
import Cart from './pages/Cart.jsx';
import Checkout from './pages/Checkout.jsx';
import PaymentInfo from './pages/PaymentInfo.jsx';
import Faqs from './pages/Faqs.jsx';
import ProductDetail from './pages/ProductDetail.jsx'; 
import Profile from './pages/Profile.jsx';
import OrderHistory from './pages/OrderHistory.jsx'; 
import AdminDashboard from './pages/AdminDashboard.jsx'; 

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [cart, setCart] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // ĐỒNG BỘ URL HASH KHI BẤM NÚT BACK/FORWARD VÀ KHI MỚI TẢI TRANG
  useEffect(() => {
    // 1. Kiểm tra URL Hash khi vừa tải trang (VD: #order-history -> bật order-history)
    const initialHash = window.location.hash.replace('#', '');
    if (initialHash) {
      const pageName = initialHash.split('/')[0];
      if (pageName) {
        setCurrentPage(pageName);
      }
    }

    // 2. Lắng nghe sự kiện bấm Back / Forward trình duyệt
    const handlePopState = (event) => {
      if (event.state && event.state.page) {
        setCurrentPage(event.state.page);
        setSelectedProduct(event.state.product || null); 
      } else {
        const currentHash = window.location.hash.replace('#', '').split('/')[0];
        setCurrentPage(currentHash || 'home');
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // HÀM CHUYỂN TRANG THÔNG MINH
  const navigateTo = (page, product = null) => {
    setCurrentPage(page);
    if (product) setSelectedProduct(product);
    
    const hashUrl = page === 'home' 
      ? '/' 
      : (product ? `/#${page}/${product._id || product.id}` : `/#${page}`);

    window.history.pushState(
      { page: page, product: product }, 
      '', 
      hashUrl
    );
  };

  const addToCart = (product) => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert("Bạn cần đăng nhập tài khoản để thực hiện mua sắm!");
      navigateTo('login');
      return false;
    }

    setCart((prevCart) => {
      const productId = product._id || product.id;
      const existingItem = prevCart.find(item => (item._id || item.id) === productId);
      
      if (existingItem) {
        return prevCart.map(item =>
          (item._id || item.id) === productId ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
    return true;
  };

  const updateCartItem = (id, newQuantity) => {
    if (newQuantity <= 0) {
      setCart(prevCart => prevCart.filter(item => (item._id || item.id) !== id));
    } else {
      setCart(prevCart => prevCart.map(item =>
        (item._id || item.id) === id ? { ...item, quantity: newQuantity } : item
      ));
    }
  };

  const clearCart = () => setCart([]);

  return (
    <>
      {currentPage === 'home' && <Home setCurrentPage={navigateTo} cart={cart} />}
      {currentPage === 'store-info' && <StoreInfo setCurrentPage={navigateTo} cart={cart} />}
      {currentPage === 'login' && <Login setCurrentPage={navigateTo} cart={cart} />}
      {currentPage === 'contact' && <Contact setCurrentPage={navigateTo} cart={cart} />}
      {currentPage === 'payment-info' && <PaymentInfo setCurrentPage={navigateTo} cart={cart} />}
      {currentPage === 'faqs' && <Faqs setCurrentPage={navigateTo} cart={cart} />}
      
      {currentPage === 'profile' && <Profile setCurrentPage={navigateTo} cart={cart} />}
      
      {/* 👈 ROUTE TRANG LỊCH SỬ ĐẶT HÀNG */}
      {currentPage === 'order-history' && <OrderHistory setCurrentPage={navigateTo} cart={cart} />}

      {/* 👈 ROUTE TRANG ADMIN DASHBOARD */}
      {currentPage === 'admin-dashboard' && <AdminDashboard setCurrentPage={navigateTo} cart={cart} />}

      {currentPage === 'products' && (
        <Products setCurrentPage={navigateTo} addToCart={addToCart} cart={cart} />
      )}
      
      {currentPage === 'product-detail' && (
        <ProductDetail setCurrentPage={navigateTo} product={selectedProduct} addToCart={addToCart} cart={cart} />
      )}

      {currentPage === 'cart' && <Cart setCurrentPage={navigateTo} cart={cart} updateCartItem={updateCartItem} />}
      {currentPage === 'checkout' && <Checkout setCurrentPage={navigateTo} cart={cart} clearCart={clearCart} />}
    </>
  );
}

export default App;