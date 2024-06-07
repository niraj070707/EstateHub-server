const jwt = require('jsonwebtoken');
const { errorHandler } = require("./errorHandler");

exports.verifyToken = (req, res, next) => {
    const token = req.cookies.token;

    if (!token) return next(errorHandler(401, 'Unauthorized'));

    jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
        if (err) return next(errorHandler(403, 'Forbidden'));
        req.user = user;
        next();
    });
};  