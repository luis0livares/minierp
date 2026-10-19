const service = require("../services/productos.service");

exports.listar = async (req, res, next) => {
  try {
    const { categoria, buscar, page = 1, limit = 10, sort = "id", order = "asc" } = req.query;
    const data = await service.listar({ categoria, buscar, page, limit, sort, order });
    res.json({ success: true, data });
  } catch (err) { next(err); }
};

exports.obtener = async (req, res, next) => {
  try {
    const p = await service.obtener(req.params.id);
    if (!p) {
      return res.status(404).json({
        success: false,
        error: { code: "PRODUCT_NOT_FOUND", message: "El producto solicitado no existe" }
      });
    }
    res.json({ success: true, data: p });
  } catch (err) { next(err); }
};

exports.crear = async (req, res, next) => {
  try {
    const p = await service.crear(req.body);
    res.status(201).json({ success: true, data: p });
  } catch (err) { next(err); }
};

exports.actualizar = async (req, res, next) => {
  try {
    const p = await service.actualizar(req.params.id, req.body);
    if (!p) {
      return res.status(404).json({
        success: false,
        error: { code: "PRODUCT_NOT_FOUND", message: "El producto solicitado no existe" }
      });
    }
    res.json({ success: true, data: p });
  } catch (err) { next(err); }
};

exports.eliminar = async (req, res, next) => {
  try {
    const ok = await service.eliminar(req.params.id);
    if (!ok) {
      return res.status(404).json({
        success: false,
        error: { code: "PRODUCT_NOT_FOUND", message: "El producto solicitado no existe" }
      });
    }
    res.json({ success: true, message: "Producto eliminado" });
  } catch (err) { next(err); }
};