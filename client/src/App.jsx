import  { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";

// Componentes y layouts
import PrivateRoute from "./components/PrivateRoute.jsx";
import LoadingSpinner from "./components/LoadingSpinner.jsx";
import DefaultLayout from "./layouts/DefaultLayout.jsx";
import MinimalLayout from "./layouts/MinimalLayout.jsx";

// Lazy load de páginas
const Home = lazy(() => import("./pages/Home.jsx"));
const Category = lazy(() => import("./pages/Category.jsx"));
const ProductDetail = lazy(() => import("./pages/ProductDetail.jsx"));
const FavoriteProducts = lazy(() => import("./pages/FavoriteProducts.jsx"));
const ShoppingCart = lazy(() => import("./pages/ShoppingCart.jsx"));
const SiteUnderConstruction = lazy(() => import("./pages/SiteUnderConstruction.jsx"));
const AdminUserProfile = lazy(() => import("./pages/UserProfile/Admin/AdminUserProfile.jsx"));
const RegularUserProfile = lazy(() => import("./pages/UserProfile/RegularUser/RegularUserProfile..jsx"));
const SellerUserProfile = lazy(() => import("./pages/UserProfile/Seller/SellerUserProfile.jsx"));
const Publications = lazy(() => import("./pages/UserProfile/Seller/Publications.jsx"));
const Login = lazy(() => import("./pages/Login.jsx"));
const Register = lazy(() => import("./pages/Register.jsx"));
const NotFound = lazy(() => import("./pages/NotFound.jsx"));

function App() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Routes>
        {/* Rutas públicas */}
        <Route path="/" element={<DefaultLayout><Home /></DefaultLayout>} />
        <Route path="/category/:id/:name" element={<DefaultLayout><Category /></DefaultLayout>} />
        <Route path="/product/:id" element={<DefaultLayout><ProductDetail /></DefaultLayout>} />
        <Route path="/sitio-en-construccion" element={<DefaultLayout><SiteUnderConstruction /></DefaultLayout>} />

        {/* Rutas protegidas */}
        <Route path="/favorite-products" element={
          <PrivateRoute>
            <DefaultLayout><FavoriteProducts /></DefaultLayout>
          </PrivateRoute>
        } />
        <Route path="/shopping-cart" element={
          <PrivateRoute>
            <DefaultLayout><ShoppingCart /></DefaultLayout>
          </PrivateRoute>
        } />
        <Route path="/profile-admin" element={
          <PrivateRoute>
            <DefaultLayout><AdminUserProfile /></DefaultLayout>
          </PrivateRoute>
        } />
        <Route path="/profile-regular" element={
          <PrivateRoute>
            <DefaultLayout><RegularUserProfile /></DefaultLayout>
          </PrivateRoute>
        } />
        <Route path="/profile-seller" element={
          <PrivateRoute>
            <DefaultLayout><SellerUserProfile /></DefaultLayout>
          </PrivateRoute>
        } />
        <Route path="/new-publication" element={
          <PrivateRoute>
            <DefaultLayout><Publications /></DefaultLayout>
          </PrivateRoute>
        } />

        {/* Rutas con layout minimal */}
        <Route path="/login" element={<MinimalLayout><Login /></MinimalLayout>} />
        <Route path="/register" element={<MinimalLayout><Register /></MinimalLayout>} />
        <Route path="*" element={<MinimalLayout><NotFound /></MinimalLayout>} />
      </Routes>
    </Suspense>
  );
}

export default App;

