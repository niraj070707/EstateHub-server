const User = require("../models/userModel");
const bcryptjs = require('bcryptjs')

exports.signup = async (req, res)=>{
    const {username , email, password} = req.body;

    if(!username || !email || !password || username === '' || email === '' || password === ''){
        return res.status(400).json({message : 'All fields are required !!'});
    }

    const existUser = await User.findOne({
        $or: [
            { username: username },
            { email: email }
        ]
    });

    console.log(existUser);
    if(existUser){
        return res.status(400).json({message : 'Username or email already exist !!'});
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
        return res.status(500).json({message:err.message});
    }
}