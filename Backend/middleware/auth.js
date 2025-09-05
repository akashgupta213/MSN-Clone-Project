const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  // Extract token from header
  const authHeader = req.header("Authorization");
  if (!authHeader) return res.status(401).json({ message: "Access denied, no token provided" });

  const token = authHeader.replace("Bearer ", "");
  if (!token) return res.status(401).json({ message: "Access denied, invalid token" });

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.admin = verified; // attach admin payload to request
    next();
  } catch (error) {
    res.status(400).json({ message: "Invalid or expired token" });
  }
};

module.exports = { verifyToken };
