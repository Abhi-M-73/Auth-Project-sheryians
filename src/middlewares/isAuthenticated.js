const jwt = require('jsonwebtoken');

const isAuthenticated = (req, res, next) => {
    try {
        // Get token from cookies or Authorization header
        const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
        if (!token) {
            return res.status(401).json({
                message: "User not authorized. Token is missing.",
            });
        }

        // Verify token
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        req.user = decoded;
        req.userId = decoded.id;

        next(); // Proceed to the next middleware
    } catch (error) {
        console.error("Authentication error:", error.message);
        return res.status(401).json({
            message: "Invalid or expired token. Please log in again.",
        });
    }
};

module.exports = isAuthenticated;
