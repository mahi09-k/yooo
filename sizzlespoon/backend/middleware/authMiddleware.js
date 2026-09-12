const jwt = require('jsonwebtoken');

/**
 * authMiddleware — Verifies JWT token on protected routes.
 *
 * Expects: Authorization: Bearer <token>
 * On success: attaches decoded user payload to req.user and calls next()
 * On failure: responds 401 Unauthorized
 */
const protect = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ success: false, message: 'No token provided. Authorization denied.' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // { UserID, Username, Role, iat, exp }
    next();
  } catch (err) {
    return res.status(401).json({ success: false, message: 'Token is invalid or expired.' });
  }
};

/**
 * adminOnly — Must be used AFTER protect middleware.
 * Restricts route access to users with Role === 'admin'.
 */
const adminOnly = (req, res, next) => {
  if (req.user?.Role !== 'admin') {
    return res.status(403).json({ success: false, message: 'Access denied. Admins only.' });
  }
  next();
};

module.exports = { protect, adminOnly };
