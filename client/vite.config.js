import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/", // Cambia esto si tu aplicación está en un subdirectorio
  build: {
    outDir: "dist",
    assetsDir: "assets",
  },
});
