import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster, toast } from 'react-hot-toast'; // Bildirim kütüphanesi
import NavigationBar from './components/NavigationBar';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Cart from './pages/Cart'; // Yeni
import { products as initialProducts } from './data/products';

function App() {
  // === State Yönetimi ===

  const [products, setProducts] = useState(() => {
    const savedProducts = localStorage.getItem('products');
    if (savedProducts) {
      let parsedProducts = JSON.parse(savedProducts);
      // Geriye dönük uyumluluk: eski verilerde olmayan alanları ekle
      parsedProducts.forEach(p => {
        if (!p.comments) p.comments = [];
        if (!p.ratings) p.ratings = [];
        if (!p.category) p.category = 'Diğer'; // Eski ürünlere varsayılan kategori
        delete p.likes;
      });
      return parsedProducts;
    }
    return initialProducts;
  });

  const [users, setUsers] = useState(() => {
    const savedUsers = localStorage.getItem('users');
    return savedUsers ? JSON.parse(savedUsers) : [];
  });

  const [currentUser, setCurrentUser] = useState(() => {
    const savedUser = localStorage.getItem('currentUser');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // === Veriyi Kalıcı Hale Getirme ===
  useEffect(() => {
    localStorage.setItem('products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('users', JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  // === Sepet Yönetim Fonksiyonları ===

  const addToCart = (productId, quantity = 1) => {
    const product = products.find(p => p.id === productId);
    if (product.stock < quantity) {
        toast.error('Yetersiz stok!');
        return;
    }

    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === productId);
      if (existingItem) {
        return prevCart.map(item => 
          item.id === productId ? { ...item, quantity: item.quantity + quantity } : item
        );
      } else {
        return [...prevCart, { id: productId, quantity }];
      }
    });
    toast.success('Ürün sepete eklendi!', { position: "bottom-right" });
  };

  // === Diğer Fonksiyonlar... ===

  const addProduct = (newProduct) => {
    const newId = products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1;
    setProducts(prev => [...prev, { ...newProduct, id: newId, comments: [], ratings: [] }]);
  };

  const deleteProduct = (productId) => {
    setProducts(prev => prev.filter(p => p.id !== productId));
  };

  const addComment = (productId, userId, text) => {
    const newComment = { user: userId, text, date: new Date().toISOString() };
    setProducts(prevProducts =>
      prevProducts.map(product =>
        product.id === productId
          ? { ...product, comments: [...product.comments, newComment] }
          : product
      )
    );
  };

  const deleteComment = (productId, commentDate) => {
    setProducts(prevProducts => 
      prevProducts.map(product => {
        if (product.id === productId) {
          return {
            ...product,
            comments: product.comments.filter(comment => comment.date !== commentDate)
          };
        }
        return product;
      })
    );
  };

  const addRating = (productId, userId, score) => {
    setProducts(prevProducts =>
      prevProducts.map(product => {
        if (product.id === productId) {
          const existingRatingIndex = product.ratings.findIndex(r => r.user === userId);
          let newRatings = [...product.ratings];
          if (existingRatingIndex > -1) {
            newRatings[existingRatingIndex] = { user: userId, score };
          } else {
            newRatings.push({ user: userId, score });
          }
          return { ...product, ratings: newRatings };
        }
        return product;
      })
    );
  };

  const handleRegister = (newUser) => {
    if (users.some(user => user.email === newUser.email)) {
        // İstek: Uyarı mesajı güncellendi
        alert('Bu hesap zaten kayıtlı.');
        return false;
    }
    setUsers(prevUsers => [...prevUsers, newUser]);
    alert('Hesap başarıyla oluşturuldu! Lütfen giriş yapın.');
    return true;
  };

  const handleLogin = (credentials) => {
    let userToLogin = null;
    if (credentials.email === 'admin@example.com' && credentials.password === 'admin123') {
      userToLogin = { email: credentials.email, isAdmin: true };
    } else {
      const foundUser = users.find(u => u.email === credentials.email && u.password === credentials.password);
      if (foundUser) userToLogin = { ...foundUser, isAdmin: false };
    }
    
    if (userToLogin) {
      setCurrentUser(userToLogin);
      return { user: userToLogin };
    } else {
      return { error: 'Geçersiz e-posta veya şifre' };
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
  };
  
  // === JSX Render ===
  return (
    <BrowserRouter>
      <Toaster /> 
      <NavigationBar currentUser={currentUser} handleLogout={handleLogout} cart={cart} />
      <main>
        <Routes>
          <Route path="/" element={<Home products={products} />} />
          <Route path="/products" element={<Products products={products} addToCart={addToCart} />} />
          <Route 
            path="/products/:id" 
            element={<ProductDetail 
              products={products} 
              currentUser={currentUser}
              addComment={addComment}
              deleteComment={deleteComment}
              addRating={addRating}
              addToCart={addToCart}
            />} 
          />
          <Route path="/login" element={<Login handleLogin={handleLogin} />} />
          <Route path="/register" element={<Register handleRegister={handleRegister} />} />
          {/* YENİ: Sepet sayfası rotası */}
          <Route path="/cart" element={<Cart currentUser={currentUser} />} />
          <Route 
            path="/dashboard" 
            element={<Dashboard 
              addProduct={addProduct} 
              deleteProduct={deleteProduct}
              products={products}
            />} 
          />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
