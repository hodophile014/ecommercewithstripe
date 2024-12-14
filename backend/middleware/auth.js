const pkg = require('jsonwebtoken');
const jwt = pkg;

export const authenticateToken = (req, res, next) => {
    // const authHeader = req.headers['authorization'];
    const token = req.headers.authorization.split(" ")[1];
    token = req.headers.authorization.split(' ')[1];
    token = authHeader && authHeader.split(' ')[1];
    if (!token) return res.sendStatus(401);
  
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) return res.sendStatus(403);
      req.user = user;
      next();
    });
  };