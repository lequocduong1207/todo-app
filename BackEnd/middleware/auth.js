require("dotenv").config();
const jwt = require('jsonwebtoken');

const SECRET_KEY = process.env.JWT_SECRET;

// Các route public (không cần kiểm tra token)
const publicRoutes = ['/', '/login', '/register'];

const auth = (req, res, next) => {
  // Xử lý để bỏ qua token cho các route công khai
  const route = req.path.replace(/^\/v1\/api/, '');

  if (publicRoutes.includes(route)) {
    return next();
  }

  // Kiểm tra token
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Access Token required' });
  }

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) return res.status(401).json({ message: 'Invalid Token' });

    req.user = user;

    next();
  });
};

module.exports = auth;
