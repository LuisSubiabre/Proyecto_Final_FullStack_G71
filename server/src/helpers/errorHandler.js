export const postgresErrorCodes = {
  23505: "El valor ya existe en la base de datos (violación de unicidad)",
  23502: "Falta un valor requerido en la base de datos",
  // Agrega más códigos de error según sea necesario
};

export const handleError = (error, res) => {
  const errorMessage =
    postgresErrorCodes[error.code] || "Error interno del servidor.";
  return res.status(500).send(`Error: ${errorMessage} (Código: ${error.code})`);
};
