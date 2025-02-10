import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  // Extraer el token del encabezado de la solicitud
  const authHeader = req.header("Authorization");

  // Verificar si el token existe
  if (!authHeader) {
    return res
      .status(401)
      .json({ message: "Acceso denegado. Token no proporcionado." });
  }

  const token = authHeader.split(" ")[1]; // Extrae solo la parte del token

  if (!token) {
    return res
      .status(401)
      .json({ message: "Acceso denegado. Formato de token inválido." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Usa tu clave secreta de JWT

    req.user = decoded;

    next();
  } catch (error) {
    // Si el token no es válido
    return res.status(401).json({ message: "Token no válido." });
  }
};

export default authMiddleware;
