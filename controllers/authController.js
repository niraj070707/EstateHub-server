const User = require("../models/userModel.js");
const bcryptjs = require('bcryptjs');
const { errorHandler } = require("../utils/errorHandler");
const jwt = require('jsonwebtoken');

exports.signUp = async (req, res, next)=>{
    const {username , email, password} = req.body;

    if(!username || !email || !password || username === '' || email === '' || password === ''){
        return next(errorHandler(400, 'All fields are required !!'));
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
        next(err);
    }
}

exports.signIn = async (req, res, next)=>{
    const {email, password} = req.body;
    console.log(email);
    console.log(password);
    if(!email || !password){
        return next(errorHandler(400, 'All fields are required !!'));
    }
    try{
        const validUser = await User.findOne({ email });
        if(!validUser){return next(errorHandler(404, 'User not found !!'));}

        const validPssword = bcryptjs.compareSync(password, validUser.password);
        if(!validPssword){return next(errorHandler(401, 'Wrong credentials !!'));}
                  
        const {password : pass, ...userWithoutPassword} = validUser._doc;
        console.log(userWithoutPassword);
        const token = jwt.sign({id : validUser._id},process.env.SECRET_KEY);
        res.cookie('token', token, {httpOnly : true}).status(200).json(userWithoutPassword);
    }catch(err){
        next(err); 
    }
}

exports.googleAuth = async (req, res, next)=>{
    try{
        const validUser = await User.findOne({email : req.body.email});
        if(validUser){
            const {password : pass, ...userWithoutPassword} = validUser._doc;
            const token = jwt.sign({id : userWithoutPassword._id}, process.env.SECRET_KEY);
            res.cookie('token', token, {httpOnly : true}).status(200).json(userWithoutPassword);
        }else{
            const generatedPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
            const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
            const newUser = new User({
                username : req.body.name.split(" ").join("").toLowerCase() + Math.random().toString(36).slice(-4),
                email : req.body.email,
                password : hashedPassword,
                avatar : req.body.photoUrl,
            })
            await newUser.save();
            const {password : pass, ...userWithoutPassword} = newUser._doc;
            const token = jwt.sign({id : userWithoutPassword._id}, process.env.SECRET_KEY);
            res.cookie('token', token, {httpOnly : true}).status(200).json(userWithoutPassword);
        }
    }catch(err){
        next(err);
    }
}

exports.signOut = async (req, res, next) => {
    try{
        res.clearCookie('token');
        res.status(200).json('User has been logged out!');
    }catch(err){
        next(err);
    }
}