import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
    try {
        const token = req.headers.authorization;

        if (!token) {
            return res.status(401).json({
                message: "Access denied. No token provided.",
                success: false
            });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET_TOKEN);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({
            message: "Invalid token",
            success: false
        });
    }
}