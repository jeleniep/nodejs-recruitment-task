import jwt from "jsonwebtoken"

const checkAuthMiddleware = (secret) => async (req, res, next) => {
    if (!req.header('Authorization')) {
        return res.status(403).json({ error: "User not authorized" });
    }

    const jwtToken = req.header('Authorization').replace('Bearer', '').trim();
    try {
        const jwtObject = jwt.verify(jwtToken, secret);
        if (typeof jwtObject === 'object') {
            req.userDetails = jwtObject;
            next();
        } else {
            return res.status(403).json({ error: "User not authorized" });
        }
    } catch (error) {
        return res.status(403).json({ error: "User not authorized" });
    }

}

export default checkAuthMiddleware;