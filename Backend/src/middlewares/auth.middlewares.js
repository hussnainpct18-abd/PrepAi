
const jwt = require('jsonwebtoken');
const blacklistModel = require('../models/blacklist.model');

async function authToken(req, res, next) {

    const token = req.cookies.token;

    if (!token) {
        return res.status(400).json({
            message: "Invalid Token or Token not provided"
        })
    }

    const blacklist = await blacklistModel.findOne({token});
    if(blacklist){
        return res.status(401).json({
            message:"Unauthorized user"
        })
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(400).json({
            message: err
        })
    }
}

module.exports = authToken;