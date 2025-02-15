import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";

// Componentes y layouts
import PrivateRoute from "./components/PrivateRoute.jsx";
import LoadingSpinner from "./components/LoadingSpinner.jsx";
import DefaultLayout from "./layouts/DefaultLayout.jsx";
import MinimalLayout from "./layouts/MinimalLayout.jsx";
import ShoppingCartStep2 from "./pages/ShoppingCart2.jsx";

// Lazy load de páginas
const Home = lazy(() => import("./pages/Home.jsx"));
const Category = lazy(() => import("./pages/Category.jsx"));
const ProductDetail = lazy(() => import("./pages/ProductDetail.jsx"));
const FavoriteProducts = lazy(() => import("./pages/FavoriteProducts.jsx"));
const ShoppingCart = lazy(() => import("./pages/ShoppingCart.jsx"));
const SiteUnderConstruction = lazy(() =>
  import("./pages/SiteUnderConstruction.jsx")
);
const AdminUserProfile = lazy(() =>
  import("./pages/UserProfile/Admin/AdminUserProfile.jsx")
);
const RegularUserProfile = lazy(() =>
  import("./pages/UserProfile/RegularUser/RegularUserProfile..jsx")
);
const SellerUserProfile = lazy(() =>
  import("./pages/UserProfile/Seller/SellerUserProfile.jsx")
);
const Publications = lazy(() =>
  import("./pages/UserProfile/Seller/Publications.jsx")
);
const Login = lazy(() => import("./pages/Login.jsx"));
const Register = lazy(() => import("./pages/Register.jsx"));
const RecoverPassword = lazy(() => import("./pages/Recoverypass.jsx"));
const NotFound = lazy(() => import("./pages/NotFound.jsx"));
const SearchResults = lazy(() => import("./pages/SearchResults.jsx"));
const SellerPublications = lazy(() =>
  import("./pages/UserProfile/Seller/SellerPublicactions.jsx")
);

function App() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Routes>
        {/* Rutas que usan DefaultLayout */}
        <Route element={<DefaultLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/category/:id/:subcategoryId" element={<Category />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/search-results" element={<SearchResults />} />
          <Route
            path="/sitio-en-construccion"
            element={<SiteUnderConstruction />}
          />

          {/* Rutas protegidas */}
          <Route
            path="/favorite-products"
            element={
              <PrivateRoute>
                <FavoriteProducts />
              </PrivateRoute>
            }
          />
          <Route
            path="/shopping-cart"
            element={
              <PrivateRoute>
                <ShoppingCart />
              </PrivateRoute>
            }
          />
          <Route
            path="/shopping-cart/step2"
            element={
              <PrivateRoute>
                <ShoppingCartStep2 />
              </PrivateRoute>
            }
          />
          <Route
            path="/profile-admin"
            element={
              <PrivateRoute>
                <AdminUserProfile />
              </PrivateRoute>
            }
          />
          <Route
            path="/profile-user"
            element={
              <PrivateRoute>
                <RegularUserProfile />
              </PrivateRoute>
            }
          />
          <Route
            path="/profile-seller"
            element={
              <PrivateRoute>
                <SellerUserProfile />
              </PrivateRoute>
            }
          />
          <Route
            path="/new-publication"
            element={
              <PrivateRoute>
                <Publications />
              </PrivateRoute>
            }
          />
          <Route
            path="/seller-publication"
            element={
              <PrivateRoute>
                <SellerPublications />
              </PrivateRoute>
            }
          />
        </Route>

        {/* Rutas con MinimalLayout */}
        <Route element={<MinimalLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/recover-password" element={<RecoverPassword />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
