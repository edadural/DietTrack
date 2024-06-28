// JwtMiddleware.js
const jwt = require('jsonwebtoken');

async function checkAuth(req, res, next) {
    let token = req.headers?.token;

    if (!token) {
        return res.status(401).json({ message: 'Yetkilendirme başarısız: Token eksik.' });
    }

    jwt.verify(token, 'Token-Key', (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Yetkilendirme başarısız: Geçersiz token.' });
        }
        req.auth = decoded;
        next();
    });
}
module.exports = checkAuth;
