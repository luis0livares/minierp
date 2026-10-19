const db = require("../config/db");

exports.listar = async ({ categoria, buscar, page, limit, sort, order }) => {
  let sql = "SELECT * FROM productos WHERE 1=1";
  const params = [];

  if (categoria) {
    sql += " AND categoria = ?";
    params.push(categoria);
  }
  if (buscar) {
    sql += " AND nombre LIKE ?";
    params.push(`%${buscar}%`);
  }

  const columnasValidas = ["id", "nombre", "precio", "stock", "categoria"];
  const ordenCol = columnasValidas.includes(sort) ? sort : "id";
  const ordenDir = order && order.toLowerCase() === "desc" ? "DESC" : "ASC";

  sql += ` ORDER BY ${ordenCol} ${ordenDir} LIMIT ? OFFSET ?`;
  params.push(Number(limit), (Number(page) - 1) * Number(limit));

  const [rows] = await db.query(sql, params);
  return rows;
};

exports.obtener = async (id) => {
  const [rows] = await db.query("SELECT * FROM productos WHERE id = ?", [id]);
  return rows[0];
};

exports.crear = async (data) => {
  const { nombre, codigo, precio, stock, categoria } = data;
  const [r] = await db.query(
    "INSERT INTO productos (nombre, codigo, precio, stock, categoria) VALUES (?,?,?,?,?)",
    [nombre, codigo, precio, stock, categoria || null]
  );
  return { id: r.insertId, nombre, codigo, precio, stock, categoria };
};

exports.actualizar = async (id, data) => {
  const { nombre, codigo, precio, stock, categoria } = data;
  const [r] = await db.query(
    "UPDATE productos SET nombre=?, codigo=?, precio=?, stock=?, categoria=? WHERE id=?",
    [nombre, codigo, precio, stock, categoria || null, id]
  );
  if (r.affectedRows === 0) return null;
  return { id, nombre, codigo, precio, stock, categoria };
};

exports.eliminar = async (id) => {
  const [r] = await db.query("DELETE FROM productos WHERE id = ?", [id]);
  return r.affectedRows > 0;
};