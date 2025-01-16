import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Importaciones de componentes
import Navbar from './components/Navbar/Navbar.jsx';
import Footer from './components/Footer/Footer.jsx';
import Banner from './components/Banner';

// Importaciones de páginas
import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import Category from './pages/Category.jsx';
import NotFound from './pages/NotFound.jsx';
import ShoppingCart from './pages/ShoppingCart.jsx';
import SiteUnderConstruction from './pages/SiteUnderConstruction.jsx';
import ProductDetail from './pages/ProductDetail.jsx';
import FavoriteProducts from './pages/FavoriteProducts.jsx';

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Banner />
      <Router>
        <header className="sticky top-0 z-50">
          <Navbar />
        </header>
        <main className="flex-1 overflow-y-auto">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/category/:id/:name" element={<Category />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/favorite-products" element={<FavoriteProducts />} />
            <Route path="/*" element={<NotFound />} />
            <Route path="/shopping-cart" element={<ShoppingCart />} />
            <Route path="/sitio-en-construccion" element={<SiteUnderConstruction />} />
          </Routes>
        </main>
        <footer>
          <Footer />
        </footer>
      </Router>
    </div>
  );
}

export default App;
