// Middleware לאימות שהבקשה כוללת מפתח auth-key תקין
function authMiddleware(req, res, next) {
  const authKey = req.headers['auth-key'];

  // המפתח הנכון מגיע ממשתני הסביבה (ולא כתוב בקוד)
  const validKey = process.env.AUTH_KEY;

  if (authKey !== validKey) {
    return res.status(401).json({ message: 'Unauthorized: missing or invalid auth-key header' });
  }

  next();
}

module.exports = authMiddleware;
