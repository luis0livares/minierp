const service = require("../services/ventas.service");

exports.listar = async (req, res, next) => {
  try {
    const data = await service.listar();
    res.json({ success: true, data });
  } catch (err) { next(err); }
};

exports.obtener = async (req, res, next) => {
  try {
    const v = await service.obtener(req.params.id);
    if (!v) {
      return res.status(404).json({
        success: false,
        error: { code: "SALE_NOT_FOUND", message: "Venta no encontrada" }
      });
    }
    res.json({ success: true, data: v });
  } catch (err) { next(err); }
};

exports.crear = async (req, res, next) => {
  try {
    const v = await service.crear(req.body);
    res.status(201).json({ success: true, data: v });
  } catch (err) {
    // Errores de stock insuficiente u otros controlados
    if (err.status) {
      return res.status(err.status).json({
        success: false,
        error: {
          code: err.code,
          message: err.message,
          producto: err.producto,
          stockDisponible: err.stockDisponible,
          cantidadSolicitada: err.cantidadSolicitada
        }
      });
    }
    next(err);
  }
};