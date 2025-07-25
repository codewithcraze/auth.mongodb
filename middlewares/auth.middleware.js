const jwt = require("jsonwebtoken");
const ApiError = require("../utils/api.error");  // Apna custom error class (optional)

const JWT_SECRET = process.env.JWT_SECRET;

const auth = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return next(new ApiError(401, "Unauthorized: Token missing or invalid"));
        }
        const token = authHeader.split(" ")[1];
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return next(new ApiError(401, "Unauthorized: Invalid or expired token"));
    }
};

module.exports = auth;
