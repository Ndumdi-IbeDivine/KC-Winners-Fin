const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
    try {
        const token = req.headers('Authorization')?.replace('Bearer', '');

        if (!token) {
            return res.status(401).json({ success: false,
            message: "No token, access denied" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.userId; // { id, role }
        
        next();
    } catch (error) {
        console.error("Token verification failed:", error.message);
        return res.status(401).json({ success: false,
        message: "Invalid or expired token" });
    }
};

const verifyAdmin = (req, res, next) => {
  if (req.user?.role !== "admin") {
    return res.status(403).json({ message: "Access denied. Admins only." });
  }
  next();
};

module.exports = { verifyToken, verifyAdmin };