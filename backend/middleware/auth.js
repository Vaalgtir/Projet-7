const jwt = require('jsonwebtoken');

const Error = require('../security_public/error');

module.exports = (req, res, next) => {
    try { 
        const token = req.headers.authorization.split(' ')[1];
        const tokenDecoded = jwt.verify(token, 'LTWNHGKXTJSSRMPGDEWVUUXGP');
        const userId = tokenDecoded.userId;
        if(req.body.userId && req.body.userId !== userId) {
            throw 'invalid user id';
        } else {
            next();
        }
    } catch {
        Error.errorManagement(res, 401, { message: "Invalid request" })
    }
}