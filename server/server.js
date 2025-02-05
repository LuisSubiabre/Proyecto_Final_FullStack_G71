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
import reviewsRouter from "./src/routes/reviews.route.js";

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware global
app.use(express.json());
app.use(cors());

// agregue esto para tener más información en el log
morgan.token("body", (req) => JSON.stringify(req.body));
morgan.token("params", (req) => JSON.stringify(req.params));
morgan.token("query", (req) => JSON.stringify(req.query));

// Middleware de logging con formato personalizado
app.use(
  morgan(
    ":method :url :status :res[content-length] - :response-time ms | Body: :body | Params: :params | Query: :query"
  )
);

// Rutas
app.use("/register", registerRoute);
app.use("/login", authRoute);
app.use("/cart", cartRouter);
app.use("/user", userRouter);
app.use("/favorites", favoritesRouter);
app.use("/products", productsRouter);
app.use("/category", categoryRouter);
app.use("/reviews/", reviewsRouter);

// Error Handling Global
app.use(handleError);

// Iniciar el servidor solo si no se está ejecutando en modo de pruebas
if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => {
    console.log(`Servidor lanzado 🚀 en: http://localhost:${PORT}`);
  });
}

export default app;
