module.exports = (req, res, next) => {
  const { nombre, codigo, precio, stock } = req.body;

  if (!nombre || nombre.trim() === "") {
    return res.status(400).json({
      success: false,
      error: { code: "NOMBRE_REQUERIDO", message: "El nombre es obligatorio" }
    });
  }
  if (!codigo || codigo.trim() === "") {
    return res.status(400).json({
      success: false,
      error: { code: "CODIGO_REQUERIDO", message: "El código es obligatorio" }
    });
  }
  if (precio === undefined || precio <= 0) {
    return res.status(400).json({
      success: false,
      error: { code: "PRECIO_INVALIDO", message: "El precio debe ser mayor que 0" }
    });
  }
  if (stock === undefined || stock < 0) {
    return res.status(400).json({
      success: false,
      error: { code: "STOCK_INVALIDO", message: "El stock debe ser mayor o igual a 0" }
    });
  }

  next();
};