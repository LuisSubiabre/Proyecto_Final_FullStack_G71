// Códigos de error de PostgreSQL
export const postgresErrorCodes = {
  23505: "El valor ya existe en la base de datos (violación de unicidad)",
  23502: "Falta un valor requerido en la base de datos",
  23503: "Violación de llave foránea (recurso relacionado no encontrado)",
  22001: "El valor es demasiado largo para el campo",
  42703: "Columna no existe en la consulta",
  42601: "Error de sintaxis en la consulta SQL",
  40001: "Conflicto de concurrencia (serialización fallida)",
  23000: "Violación de restricción (por ejemplo, una restricción CHECK falló)",
  54000: "Error de falta de espacio en disco",
};

// Manejador de errores
export const handleError = (error, req, res, next) => {
  console.error("Error detectado:", error.stack || error); // Log para depuración

  const isDevelopment = process.env.NODE_ENV === "development";

  // Manejo de errores específicos de PostgreSQL
  if (error.code && postgresErrorCodes[error.code]) {
    const statusCode = getStatusCodeForPostgresError(error.code);
    return res.status(statusCode).json({
      success: false,
      error: postgresErrorCodes[error.code],
      details: `Código de error: ${error.code}`,
      ...(isDevelopment && { stack: error.stack }),
    });
  }

  // Manejo de errores con `statusCode` definido
  if (error.statusCode || error.status) {
    const statusCode = error.statusCode || error.status;
    return res.status(statusCode).json({
      success: false,
      error: getErrorMessageForStatusCode(statusCode),
      details: error.message || "Error inesperado",
      ...(isDevelopment && { stack: error.stack }),
    });
  }

  // Error genérico (500 Internal Server Error)
  return res.status(500).json({
    success: false,
    error: "Error interno del servidor",
    details: error.message || "Algo salió mal",
    ...(isDevelopment && { stack: error.stack }),
  });
};

// Función para obtener el código de estado HTTP basado en el código de error de PostgreSQL
const getStatusCodeForPostgresError = (postgresErrorCode) => {
  switch (postgresErrorCode) {
    case "23505": // Violación de unicidad
      return 409;
    case "23502": // Falta un valor obligatorio
      return 400;
    case "23503": // Llave foránea no encontrada
      return 404;
    default:
      return 500;
  }
};

// Función para obtener el mensaje de error basado en el código de estado HTTP
const getErrorMessageForStatusCode = (statusCode) => {
  switch (statusCode) {
    case 400:
      return "Solicitud incorrecta (Bad Request)";
    case 401:
      return "No autorizado (Unauthorized)";
    case 403:
      return "Prohibido (Forbidden)";
    case 404:
      return "No encontrado (Not Found)";
    case 409:
      return "Conflicto (Conflict)";
    case 422:
      return "Entidad no procesable (Unprocessable Entity)";
    case 500:
      return "Error interno del servidor (Internal Server Error)";
    case 501:
      return "No implementado (Not Implemented)";
    case 502:
      return "Puerta de enlace incorrecta (Bad Gateway)";
    case 503:
      return "Servicio no disponible (Service Unavailable)";
    case 504:
      return "Tiempo de espera agotado (Gateway Timeout)";
    default:
      return "Error desconocido";
  }
};
