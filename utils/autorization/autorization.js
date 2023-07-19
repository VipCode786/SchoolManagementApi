const jwt = require('jsonwebtoken');

const generateToken = (agent) => {
  const token = jwt.sign({ agent }, 'your-secret-key', { expiresIn: '1h' });
  return token;
};

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  jwt.verify(token, 'your-secret-key', (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Invalid token' });
    }

    req.agent = decoded.agent; // Add the decoded agent object to the request
    next();
  });
};

const isSuperAdmin = (req, res, next) => {
  if (req.agent.isSuperAdminAgent) {
    next(); // User is a superadmin, proceed to the next middleware
  } else {
    return res.status(403).json({ message: 'Unauthorized' });
  }
};

 module.exports = { generateToken, authMiddleware, isSuperAdmin };
