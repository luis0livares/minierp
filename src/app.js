const express = require("express");
const cors = require("cors");
require("dotenv").config();

const logger = require("./middlewares/logger");
const auth = require("./middlewares/auth");

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares globales
app.use(cors());
app.use(express.json());
app.use(logger);

// Ruta raíz
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Mini ERP API funcionando",
    endpoints: [
      "POST /api/auth/login",
      "GET /api/productos",
      "GET /api/clientes",
      "GET /api/ventas"
    ]
  });
});

// Rutas públicas
app.use("/api/auth", require("./routes/auth.routes"));

// Rutas protegidas (requieren token)
app.use("/api/productos", auth, require("./routes/productos.routes"));
app.use("/api/clientes", auth, require("./routes/clientes.routes"));
app.use("/api/ventas", auth, require("./routes/ventas.routes"));

// Ruta no encontrada
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: { code: "NOT_FOUND", message: "Ruta no encontrada" }
  });
});

// Manejo global de errores
app.use((err, req, res, next) => {
  console.error("Error:", err);
  res.status(err.status || 500).json({
    success: false,
    error: {
      code: err.code || "SERVER_ERROR",
      message: err.message || "Error interno del servidor"
    }
  });
});

app.listen(PORT, () => {
  console.log(`Servidor en http://localhost:${PORT}`);
});