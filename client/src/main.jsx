import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom"; // Importar BrowserRouter
import { NextUIProvider } from "@nextui-org/react";
import App from "./App";
import "./index.css";
import { FavoritosProvider } from "./context/FavoritosContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <NextUIProvider>
      <FavoritosProvider>
        <BrowserRouter> {/* Envolver App con BrowserRouter */}
          <main className="dark text-foreground bg-background">
            <App />
          </main>
        </BrowserRouter>
      </FavoritosProvider>
    </NextUIProvider>
  </React.StrictMode>,
);
