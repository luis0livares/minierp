const router = require("express").Router();
const ctrl = require("../controllers/ventas.controller");
const validar = require("../middlewares/validarVenta");

router.get("/", ctrl.listar);
router.get("/:id", ctrl.obtener);
router.post("/", validar, ctrl.crear);

module.exports = router;