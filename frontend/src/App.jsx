import React, { useState } from 'react';
import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import Products from './pages/Products.jsx';
import Contact from './pages/Contact.jsx'; // Thêm dòng này

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  return (
    <>
      {currentPage === 'home' && <Home setCurrentPage={setCurrentPage} />}
      {currentPage === 'login' && <Login setCurrentPage={setCurrentPage} />}
      {currentPage === 'products' && <Products setCurrentPage={setCurrentPage} />}
      
      {/* Thêm dòng này để gọi trang Liên hệ */}
      {currentPage === 'contact' && <Contact setCurrentPage={setCurrentPage} />}
    </>
  );
}

export default App;