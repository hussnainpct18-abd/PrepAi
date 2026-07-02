const userModel = require('../models/user.model')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const blacklistModel = require('../models/blacklist.model');



async function register(req, res) {

    const { username, email, password } = req.body;

    if (!(username || email || password)) {
        return res.status(400).json({
            messsage: "Credentials missing"
        })
    }

    const userexists = await userModel.findOne({
        $or: [
            { username },
            { password }
        ]
    })

    if (userexists) {
        return res.status(409).json({
            message: "User already exists"
        })
    }

    const hash = await bcrypt.hash(password, 10);

    const user = await userModel.create({
        username,
        email,
        password: hash
    })

    const token = jwt.sign(
        {
            id: user.id,
            username: user.username
        }, process.env.JWT_SECRET,
        {
            expiresIn: '1d'
        }
    )


    res.cookie("token", token);

    res.status(201).json({
        message: "User created Successfully",
        user: {
            id: user.id,
            username: user.username,
            email: user.email
        }
    })


}

async function login(req, res) {

    const { username, email, password } = req.body;

    const user = await userModel.findOne({
        $or: [
            { username },
            { email }
        ]

    })

    if (!user) {
        return res.status(400).json({
            message: "Invalid username or password"
        })
    }

    const hash = await bcrypt.compare(password, user.password);

    if (!hash) {
        return res.status(400).json({
            message: "Password is incorrect"
        })
    }

    const token = jwt.sign({
        id: user.id,
        username: user.username
    }, process.env.JWT_SECRET, {
        expiresIn: "1d"
    })

    res.cookie("token", token);

    res.status(200).json({
        message: "User logged in Successfully",
        user: {
            id: user.id,
            username: user.username,
            email: user.email
        }
    })


}

async function logout(req, res) {

    const token = req.cookies.token;

    if (token) {
        const list = await blacklistModel.create({ token });
    }

    res.clearCookie("token");
    res.status(200).json({
        message: "Logout Successfully"
    })
}

async function getMe(req,res){

    const id=req.user.id
    const user=await userModel.findById({_id:id});
    if(!user){
        return res.status(401).json({
            message:"User not found"
        })
    }

    return res.status(200).json({
        message:"User found",
        user:{
            id:user.id,
            username:user.username,
            email:user.email,
        }
    })
}
module.exports = {
    register,
    login,
    logout,
    getMe
}