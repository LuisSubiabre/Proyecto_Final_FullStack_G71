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
  console.error(error.stack); // Log del error para depuración

  // Errores específicos de PostgreSQL
  if (error.code && postgresErrorCodes[error.code]) {
    const statusCode = getStatusCodeForPostgresError(error.code);
    return res.status(statusCode).json({
      error: postgresErrorCodes[error.code],
      details: `Código de error: ${error.code}`,
    });
  }

  // Errores HTTP personalizados
  if (error.statusCode) {
    return res.status(error.statusCode).json({
      error: getErrorMessageForStatusCode(error.statusCode),
      details: error.message,
    });
  }

  // Error genérico (500 Internal Server Error)
  return res.status(500).json({
    error: "Error interno del servidor",
    details: error.message || "Algo salió mal",
  });
};

// Función para obtener el código de estado HTTP basado en el código de error de PostgreSQL
const getStatusCodeForPostgresError = (postgresErrorCode) => {
  switch (postgresErrorCode) {
    case "23505":
      return 409;
    case "23502":
      return 400;
    case "23503":
      return 404;
    default:
      return 500;
  }
};

// Función para obtener el mensaje de error basado en el código de estado HTTP
const getErrorMessageForStatusCode = (statusCode) => {
  switch (statusCode) {
    case 400:
      return "Bad Request :(";
    case 401:
      return "Unauthorized";
    case 403:
      return "Forbidden";
    case 404:
      return "Not Found";
    case 409:
      return "Conflict";
    case 422:
      return "Unprocessable Entity";
    case 500:
      return "Internal Server Error";
    case 501:
      return "Not Implemented";
    case 502:
      return "Bad Gateway";
    case 503:
      return "Service Unavailable";
    case 504:
      return "Gateway Timeout";
    default:
      return "Error desconocido";
  }
};
