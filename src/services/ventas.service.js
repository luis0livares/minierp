const db = require("../config/db");

exports.listar = async () => {
  const [ventas] = await db.query("SELECT * FROM ventas");
  return ventas;
};

exports.obtener = async (id) => {
  const [ventas] = await db.query("SELECT * FROM ventas WHERE id = ?", [id]);
  if (ventas.length === 0) return null;

  const [detalle] = await db.query(
    "SELECT * FROM venta_detalle WHERE ventaId = ?",
    [id]
  );

  return { ...ventas[0], detalle };
};

exports.crear = async (venta) => {
  const { clienteId, fecha, productos } = venta;

  // 1. Verificar cliente
  const [cli] = await db.query("SELECT * FROM clientes WHERE id = ?", [clienteId]);
  if (cli.length === 0) {
    throw { status: 404, code: "CLIENT_NOT_FOUND", message: "Cliente no encontrado" };
  }

  // 2. Verificar productos y stock
  let total = 0;
  for (const item of productos) {
    const [rows] = await db.query(
      "SELECT stock, nombre, precio FROM productos WHERE id = ?",
      [item.productoId]
    );
    const prod = rows[0];

    if (!prod) {
      throw { status: 404, code: "PRODUCT_NOT_FOUND", message: "Producto no encontrado" };
    }
    if (prod.stock < item.cantidad) {
      throw {
        status: 400,
        code: "INSUFFICIENT_STOCK",
        message: "Stock insuficiente",
        producto: prod.nombre,
        stockDisponible: prod.stock,
        cantidadSolicitada: item.cantidad
      };
    }
    total += prod.precio * item.cantidad;
  }

  // 3. Registrar venta
  const [rVenta] = await db.query(
    "INSERT INTO ventas (clienteId, fecha, total) VALUES (?,?,?)",
    [clienteId, fecha, total]
  );
  const ventaId = rVenta.insertId;

  // 4. Registrar detalle y descontar stock
  for (const item of productos) {
    await db.query(
      "INSERT INTO venta_detalle (ventaId, productoId, cantidad) VALUES (?,?,?)",
      [ventaId, item.productoId, item.cantidad]
    );
    await db.query(
      "UPDATE productos SET stock = stock - ? WHERE id = ?",
      [item.cantidad, item.productoId]
    );
  }

  return { id: ventaId, clienteId, fecha, total, productos };
};