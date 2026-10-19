module.exports = (req, res, next) => {
  const { clienteId, fecha, productos } = req.body;

  if (!clienteId) {
    return res.status(400).json({
      success: false,
      error: { code: "CLIENTE_REQUERIDO", message: "El cliente es obligatorio" }
    });
  }
  if (!fecha) {
    return res.status(400).json({
      success: false,
      error: { code: "FECHA_REQUERIDA", message: "La fecha es obligatoria" }
    });
  }
  if (!Array.isArray(productos) || productos.length === 0) {
    return res.status(400).json({
      success: false,
      error: { code: "PRODUCTOS_REQUERIDOS", message: "Debe incluir al menos un producto" }
    });
  }

  next();
};