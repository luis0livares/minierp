const service = require("../services/clientes.service");

exports.listar = async (req, res, next) => {
  try {
    const data = await service.listar();
    res.json({ success: true, data });
  } catch (err) { next(err); }
};

exports.obtener = async (req, res, next) => {
  try {
    const c = await service.obtener(req.params.id);
    if (!c) {
      return res.status(404).json({
        success: false,
        error: { code: "CLIENT_NOT_FOUND", message: "Cliente no encontrado" }
      });
    }
    res.json({ success: true, data: c });
  } catch (err) { next(err); }
};

exports.crear = async (req, res, next) => {
  try {
    const c = await service.crear(req.body);
    res.status(201).json({ success: true, data: c });
  } catch (err) { next(err); }
};

exports.actualizar = async (req, res, next) => {
  try {
    const c = await service.actualizar(req.params.id, req.body);
    if (!c) {
      return res.status(404).json({
        success: false,
        error: { code: "CLIENT_NOT_FOUND", message: "Cliente no encontrado" }
      });
    }
    res.json({ success: true, data: c });
  } catch (err) { next(err); }
};

exports.eliminar = async (req, res, next) => {
  try {
    const ok = await service.eliminar(req.params.id);
    if (!ok) {
      return res.status(404).json({
        success: false,
        error: { code: "CLIENT_NOT_FOUND", message: "Cliente no encontrado" }
      });
    }
    res.json({ success: true, message: "Cliente eliminado" });
  } catch (err) { next(err); }
};