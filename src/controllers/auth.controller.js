exports.login = (req, res) => {
  const { usuario, password } = req.body;

  if (usuario === "admin" && password === "123456") {
    return res.json({ success: true, token: "TOKEN_GENERADO" });
  }

  res.status(401).json({
    success: false,
    error: { code: "BAD_CREDENTIALS", message: "Credenciales inválidas" }
  });
};