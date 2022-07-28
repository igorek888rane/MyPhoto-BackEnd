const jwt = require('jsonwebtoken');
const tokenModel = require('../models/token-model');

class TokenService{
    generateToken(payload){
        const accessToken = jwt.sign(payload)
    }
}
module.exports = new TokenService();