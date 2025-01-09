import express from "express";
import "dotenv/config";
import cors from "cors";
import registerRoute from "./routes/register.route.js";

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware global
app.use(express.json());
app.use(cors());

// Rutas
app.use("/register", registerRoute); // Ajustado a convención REST

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
