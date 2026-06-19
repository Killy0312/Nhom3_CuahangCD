import React, { useState, useEffect } from 'react';
import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import Products from './pages/Products.jsx';
import Contact from './pages/Contact.jsx';
import Cart from './pages/Cart.jsx';
import Checkout from './pages/Checkout.jsx';
import PaymentInfo from './pages/PaymentInfo.jsx'; 

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [cart, setCart] = useState([]);

  useEffect(() => {
    window.history.replaceState({ page: 'home' }, '', '/');

    const handlePopState = (event) => {
      if (event.state && event.state.page) {
        setCurrentPage(event.state.page); 
      } else {
        setCurrentPage('home'); 
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigateTo = (page) => {
    if (currentPage !== page) {
      setCurrentPage(page);
      window.history.pushState({ page: page }, '', page === 'home' ? '/' : `/#${page}`);
    }
  };

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        return prevCart.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const updateCartItem = (id, newQuantity) => {
    if (newQuantity <= 0) {
      setCart(prevCart => prevCart.filter(item => item.id !== id));
    } else {
      setCart(prevCart => prevCart.map(item => 
        item.id === id ? { ...item, quantity: newQuantity } : item
      ));
    }
  };

  const clearCart = () => setCart([]);

  return (
    <>
      {currentPage === 'home' && <Home setCurrentPage={navigateTo} cart={cart} />}
      
      {currentPage === 'login' && <Login setCurrentPage={navigateTo} cart={cart} />}
      
      {currentPage === 'contact' && <Contact setCurrentPage={navigateTo} cart={cart} />}
      
      {currentPage === 'payment-info' && <PaymentInfo setCurrentPage={navigateTo} cart={cart} />}
      
      {currentPage === 'products' && (
        <Products setCurrentPage={navigateTo} addToCart={addToCart} cart={cart} />
      )}

      {currentPage === 'cart' && (
        <Cart setCurrentPage={navigateTo} cart={cart} updateCartItem={updateCartItem} />
      )}

      {currentPage === 'checkout' && (
        <Checkout setCurrentPage={navigateTo} cart={cart} clearCart={clearCart} />
      )}
    </>
  );
}

export default App;