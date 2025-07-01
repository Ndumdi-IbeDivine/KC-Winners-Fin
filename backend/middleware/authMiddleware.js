const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization ||req.header('Authorization');

        if (!authHeader || !authHeader.startsWith('Bearer')) {
            return res.status(401).json({ success: false,
            message: "No token, access denied" });
        }

        const token = authHeader.replace('Bearer', '').trim();

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.userId = decoded.id; // { id, role }
        
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