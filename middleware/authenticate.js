const jwt = require("jsonwebtoken");
const { errorResponse } = require("../utils/response");
const MESSAGES = require("../constants");

const authMiddleware = (req, res, next) => {
    try {
        const authHeader = req.headers["authorization"] || "";
        const [scheme, token] = authHeader.split(" ");
        if (scheme !== "Bearer" || !token) {
            return errorResponse(res, MESSAGES.ERROR.ACCESS_DENIED, MESSAGES.STATUS_CODE.UNAUTHORIZED);
        }
        req.user = jwt.verify(token, process.env.JWT_SECRET);
        next();
    } catch (err) {
        return errorResponse(res, MESSAGES.ERROR.INVALID_TOKEN, MESSAGES.STATUS_CODE.UNAUTHORIZED);
    }
};

module.exports = authMiddleware;
