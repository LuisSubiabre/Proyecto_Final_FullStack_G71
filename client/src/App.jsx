import { Routes, Route } from "react-router-dom";

// Importaciones de componentes
import Navbar from "./components/Navbar/Navbar.jsx";
import Footer from "./components/Footer/Footer.jsx";
import Banner from "./components/Banner";

// Importaciones de páginas
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Category from "./pages/Category.jsx";
import NotFound from "./pages/NotFound.jsx";
import ShoppingCart from "./pages/ShoppingCart.jsx";
import SiteUnderConstruction from "./pages/SiteUnderConstruction.jsx";
import ProductDetail from "./pages/ProductDetail.jsx";
import FavoriteProducts from "./pages/FavoriteProducts.jsx";
import AdminUserProfile from "./pages/UserProfile/Admin/AdminUserProfile.jsx";
import RegularUserProfile from "./pages/UserProfile/RegularUser/RegularUserProfile..jsx";
import SellerUserProfile from "./pages/UserProfile/Seller/SellerUserProfile.jsx";
import Publications from "./pages/UserProfile/Seller/Publications.jsx";

// Componente Layout para las páginas con Banner, Navbar y Footer
const DefaultLayout = ({ children }) => (
  <>
    <Banner />
    <header className="sticky top-0 z-50">
      <Navbar />
    </header>
    <main className="flex-1 overflow-y-auto">{children}</main>
    <footer>
      <Footer />
    </footer>
  </>
);

// Componente Layout sin Banner, Navbar ni Footer
const MinimalLayout = ({ children }) => <main className="flex-1">{children}</main>;

function App() {

  return (
    <div className="flex flex-col min-h-screen">
      <Routes>

        <Route path="/" element={<DefaultLayout> <Home /> </DefaultLayout>} />
        <Route path="/category/:id/:name" element={<DefaultLayout> <Category /> </DefaultLayout>} />
        <Route path="/product/:id" element={<DefaultLayout> <ProductDetail /> </DefaultLayout>} />
        <Route path="/favorite-products" element={<DefaultLayout> <FavoriteProducts /> </DefaultLayout>} />
        <Route path="/shopping-cart" element={<DefaultLayout> <ShoppingCart /> </DefaultLayout>} />
        <Route path="/sitio-en-construccion" element={<DefaultLayout> <SiteUnderConstruction /> </DefaultLayout>} />
        <Route path="/profile-admin" element={<DefaultLayout> <AdminUserProfile /> </DefaultLayout>} />
        <Route path="/profile-regular" element={<DefaultLayout> <RegularUserProfile /> </DefaultLayout>} />
        <Route path="/profile-seller" element={<DefaultLayout> <SellerUserProfile /> </DefaultLayout>} />
        <Route path="/new-publication" element={<DefaultLayout> <Publications /> </DefaultLayout>} />
        <Route path="/login" element={<MinimalLayout> <Login /> </MinimalLayout>} />
        <Route path="/register" element={<MinimalLayout> <Register /> </MinimalLayout>} />
        <Route path="*" element={<MinimalLayout> <NotFound /> </MinimalLayout>} />
      </Routes>
    </div>
  );
}

export default App;

