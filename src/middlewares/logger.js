module.exports = (req, res, next) => {
  const hora = new Date().toLocaleTimeString();
  console.log(`[${hora}] ${req.method} ${req.url}`);
  next();
};