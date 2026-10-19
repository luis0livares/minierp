const db = require("../config/db");

exports.listar = async () => {
  const [rows] = await db.query("SELECT * FROM clientes");
  return rows;
};

exports.obtener = async (id) => {
  const [rows] = await db.query("SELECT * FROM clientes WHERE id = ?", [id]);
  return rows[0];
};

exports.crear = async (data) => {
  const { nombre, rfc, telefono, correo } = data;
  const [r] = await db.query(
    "INSERT INTO clientes (nombre, rfc, telefono, correo) VALUES (?,?,?,?)",
    [nombre, rfc, telefono || null, correo || null]
  );
  return { id: r.insertId, nombre, rfc, telefono, correo };
};

exports.actualizar = async (id, data) => {
  const { nombre, rfc, telefono, correo } = data;
  const [r] = await db.query(
    "UPDATE clientes SET nombre=?, rfc=?, telefono=?, correo=? WHERE id=?",
    [nombre, rfc, telefono || null, correo || null, id]
  );
  if (r.affectedRows === 0) return null;
  return { id, nombre, rfc, telefono, correo };
};

exports.eliminar = async (id) => {
  const [r] = await db.query("DELETE FROM clientes WHERE id = ?", [id]);
  return r.affectedRows > 0;
};