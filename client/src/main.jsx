import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { NextUIProvider } from "@nextui-org/react";
import App from "./App";
import "./index.css";
import { FavoritosProvider } from "./context/FavoritosContext.jsx";
import { CartProvider } from "./context/CartContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <NextUIProvider>
      <CartProvider>
        <FavoritosProvider>
          <BrowserRouter>
            <main className="dark text-foreground bg-background">
              <App />
            </main>
          </BrowserRouter>
        </FavoritosProvider>
      </CartProvider>
    </NextUIProvider>
  </React.StrictMode>,
);
