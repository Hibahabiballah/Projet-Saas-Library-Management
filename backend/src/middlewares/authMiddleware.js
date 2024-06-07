const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  console.log('Auth Header:', authHeader);
  
  const token = authHeader && authHeader.split(' ')[1];
  console.log('Token:', token);

  if (!token) return res.sendStatus(401);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET || 'secretKey', (err, user) => {
    if (err) {
      console.error('JWT Verification Error:', err);
      return res.sendStatus(403);
    }
    console.log('User:', user);
    req.user = user;
    next();
  });
};

module.exports = authenticateToken;
