const router = require("express").Router();
const ctrl = require("../controllers/productos.controller");
const validar = require("../middlewares/validarProducto");

router.get("/", ctrl.listar);
router.get("/:id", ctrl.obtener);
router.post("/", validar, ctrl.crear);
router.put("/:id", validar, ctrl.actualizar);
router.delete("/:id", ctrl.eliminar);

module.exports = router;