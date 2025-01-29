import express from "express";
import "dotenv/config";
import cors from "cors";

/* rutas */
import registerRoute from "./src/routes/register.route.js";
import authRoute from "./src/routes/auth.route.js";
import cartRouter from "./src/routes/cart.route.js"; // Importa las rutas de carritos
import userRouter from "./src/routes/user.route.js"; // Importa las rutas de usuarios
import favoritesRouter from "./src/routes/favorites.route.js"; // Importa las rutas de favoritos
import productsRouter from "./src/routes/products.route.js"; // Importa las rutas de productos
import categoryRouter from "./src/routes/category.route.js"; // Importa las rutas de categorías

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware global
app.use(express.json());
app.use(cors());

// Rutas
app.use("/register", registerRoute); // Ajustado a convención REST
app.use("/login", authRoute); // Ajustado a convención REST
app.use("/cart", cartRouter); // Usa las rutas de carritos
app.use("/user", userRouter); // Usa las rutas de usuarios
app.use("/favorites", favoritesRouter); // Usa las rutas de favoritos
app.use("/products", productsRouter); // Usa las rutas de productos
app.use("/categories", categoryRouter); // Usa las rutas de categorías

// Error Handling Global
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Ocurrió un error interno en el servidor." });
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor lanzado 🚀 en: http://localhost:${PORT}`);
});

export default app; //para testing
