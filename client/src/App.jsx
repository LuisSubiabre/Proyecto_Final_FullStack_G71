import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Importaciones de componentes
import Navbar from './components/Navbar/Navbar.jsx';
import Footer from './components/Footer/Footer.jsx';

// Importaciones de paginas
import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import Category from './pages/Category.jsx';
import NotFound from './pages/NotFound.jsx';
import ShoppingCart from './pages/ShoppingCart.jsx';
import SiteUnderConstruction from './pages/SiteUnderConstruction.jsx';


function App() {
  return (
    <div className='gridApp'>
      <Router>
        <header>
          <Navbar />
        </header>
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/category/:id/:name" element={<Category />} />
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
