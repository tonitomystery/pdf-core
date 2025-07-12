/**
 * Middleware para verificar la API key en las solicitudes
 * @param {Object} req - Objeto de solicitud de Express
 * @param {Object} res - Objeto de respuesta de Express
 * @param {Function} next - Función para continuar con el siguiente middleware
 */
const verifyApiKey = (req, res, next) => {
  const apiKey = req.headers["x-api-key"];

  if (!apiKey) {
    return res.status(401).json({ error: "API key is required" });
  }
  const validApiKey = process.env.API_KEY;

  if (apiKey !== validApiKey) {
    return res.status(403).json({ error: "Invalid API key" });
  }
  next();
};

module.exports = verifyApiKey;
