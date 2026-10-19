module.exports = (req, res, next) => {
  const { nombre, rfc } = req.body;

  if (!nombre || nombre.trim() === "") {
    return res.status(400).json({
      success: false,
      error: { code: "NOMBRE_REQUERIDO", message: "El nombre del cliente es obligatorio" }
    });
  }
  if (!rfc || rfc.trim() === "") {
    return res.status(400).json({
      success: false,
      error: { code: "RFC_REQUERIDO", message: "El RFC es obligatorio" }
    });
  }

  next();
};