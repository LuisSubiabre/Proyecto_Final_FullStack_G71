import express from "express";
import "dotenv/config";
import cors from "cors";
import morgan from "morgan";
import { handleError } from "./src/helpers/errorHandler.js";

/* rutas */
import registerRoute from "./src/routes/register.route.js";
import authRoute from "./src/routes/auth.route.js";
import cartRouter from "./src/routes/cart.route.js";
import userRouter from "./src/routes/user.route.js";
import favoritesRouter from "./src/routes/favorites.route.js";
import productsRouter from "./src/routes/products.route.js";
import categoryRouter from "./src/routes/category.route.js";

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware global
app.use(express.json());
app.use(cors());

// Middleware de logging
app.use(morgan("dev"));

// Rutas
app.use("/register", registerRoute);
app.use("/login", authRoute);
app.use("/cart", cartRouter);
app.use("/user", userRouter);
app.use("/favorites", favoritesRouter);
app.use("/products", productsRouter);
app.use("/category", categoryRouter);

// Error Handling Global
app.use(handleError);

app.listen(PORT, () => {
  console.log(`Servidor lanzado 🚀 en: http://localhost:${PORT}`);
});

export default app;

