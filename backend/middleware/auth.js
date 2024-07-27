const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const SECRET_KEY = process.env.SECRET_KEY || crypto.randomBytes(64).toString('hex');

const auth = (req, res, next) => {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    jwt.verify(token.split(' ')[1], SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Failed to authenticate token' });
        }

        req.userId = decoded.id;
        req.userRole = decoded.role;
        next();
    });
};

module.exports = auth;
