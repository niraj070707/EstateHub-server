const User = require("../models/userModel");
const bcryptjs = require('bcryptjs');
const { errorHandler } = require("../utils/errorHandler");

exports.signup = async (req, res, next)=>{
    const {username , email, password} = req.body;

    if(!username || !email || !password || username === '' || email === '' || password === ''){
        return res.status(400).json({message : 'All fields are required !!'});
    }

    try{
        const hashedPassword = bcryptjs.hashSync(password, 10);
        const newUser = new User({
            username,
            email,
            password : hashedPassword,
        })
        await newUser.save();

        return res.status(200).json({message : 'SignUp Successful'});
    }catch(err){
        console.log(errorHandler(500, 'Invalid'));
        next(errorHandler(500, 'Invalid'));
    }
}