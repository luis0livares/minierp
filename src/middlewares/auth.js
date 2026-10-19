module.exports = (req, res, next) => {
  const token = req.headers["authorization"];
  if (token !== "Bearer TOKEN_GENERADO") {
    return res.status(401).json({
      success: false,
      error: { code: "UNAUTHORIZED", message: "No autenticado" }
    });
  }
  next();
};