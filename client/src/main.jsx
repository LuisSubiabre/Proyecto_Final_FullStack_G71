// main.tsx or main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import { NextUIProvider } from "@nextui-org/react";
import App from "./App";
import "./index.css";
import { FavoritosProvider } from "./context/FavoritosContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <NextUIProvider>
      <FavoritosProvider>
        <main className="dark text-foreground bg-background">
          <App />
        </main>
      </FavoritosProvider>
    </NextUIProvider>
  </React.StrictMode>,
);