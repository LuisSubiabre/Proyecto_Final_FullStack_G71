import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { NextUIProvider } from "@nextui-org/react";
import App from "./App";
import "./index.css";
import { FavoritosProvider } from "./context/FavoritosContext.jsx";
import { CartProvider } from "./context/CartContext.jsx";
import { AuthContextProvider } from "./context/authContext.jsx";
import { CategoriesProvider } from "./context/categoriesContext.jsx";
import { ProfileContextProvider } from "./context/profileContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <NextUIProvider>
      <BrowserRouter>
        <AuthContextProvider>
          <CategoriesProvider>
            <CartProvider>
              <FavoritosProvider>
                <ProfileContextProvider>
                  <main className="dark text-foreground bg-background">
                    <App />
                  </main>
                </ProfileContextProvider>
              </FavoritosProvider>
            </CartProvider>
          </CategoriesProvider>
        </AuthContextProvider>
      </BrowserRouter>
    </NextUIProvider>
  </React.StrictMode>
);
