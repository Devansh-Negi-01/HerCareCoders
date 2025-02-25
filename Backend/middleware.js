const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const joi = require('joi');

const multer = require('multer');
const storage = multer.memoryStorage();
module.exports.upload = multer({ storage });

module.exports.authenticateUser = (req, res, next) => {
    let token = req.header('Authorization');
    if (!token) return res.status(401).json({ msg: 'No token, authorization denied' });

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;
        next();
    } catch (err) {
        return res.status(403).json({ msg: 'Token is not valid' });
    }
};
module.exports.authenticateAdmin = (req, res, next) => {
    let token = req.header('Authorization');
    if (!token) return res.status(401).json({ msg: 'No token, authorization denied' });

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        if (!verified.isAdmin) return res.status(403).json({ error: 'Forbidden' });

        req.user = verified;
        next();
    } catch (err) {
        return res.status(403).json({ msg: 'Token is not valid' });
    }
};
module.exports.userSchema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().min(6).required(),
    username : joi.string()
});
module.exports.check = (req,res,next)=>{
    let token = req.body.Authorization;
    // console.log(token); 
    if(token){
        req.userId = jwt.verify(token, process.env.JWT_SECRET).id;
        req.userName = jwt.verify(token, process.env.JWT_SECRET).username;
        next();
    }else{
        res.status(400).json({
            msg : "No token "
        })
    }
}
module.exports.password = (req,res,next)=>{
    let pass = req.body.password;
    console.log(pass);
    if(!pass){
        res.status(400).json({
            error : "Error while adding password its empty"
        })
    }
    if(pass.length <= 5){
        res.status(400).json({
            error : "Error while adding password its short"
        })
    }
    let index = pass.indexOf(' ');
    if(index!=-1){
        res.status(400).json({
            error : "Error while adding password it contains space"
        })
    }
    next();
}