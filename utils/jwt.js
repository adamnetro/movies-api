const jwt = require('jsonwebtoken');
secretKey = process.env.JWT_SECRET_KEY;
expiresIn = process.env.JWT_EXPIRES_IN;

exports.sign = (payload) => {
    return jwt.sign(payload, secretKey, {expiresIn})
}

exports.verify = (token) => {
    try {
        return jwt.verify(token, secretKey)
    }catch(e) {
        return false
    }
}