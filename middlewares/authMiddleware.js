const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.json({
            msg: "missing authorization header"
        })
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
        return res.json({
            msg: "invalid token format"
        })
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (e) {
        return res.json({
            msg: "invalid token",
        })
    }
};