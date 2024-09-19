const bcrypt = require('bcrypt');
const user = require('../model/userModel');
const jwt = require('jsonwebtoken');

require('dotenv').config();

exports.signup = async (req,res) => {
    try {
        const {name, email, password, role} = req.body;
        const existuser = await user.findOne({email});
        if(existuser){
            return res.status(400).json({
                success: false,
                message: 'user Already Exist'
            })
        }

        let hashedpassword;
        try{
            hashedpassword = await bcrypt.hash(password,10);
        }catch(err){
            return res.status(500).json({
                sucsess: false,
                message: "Error while hashing Password"
            });
        }

        const userData = await user.create({
            name,
            email,
            password: hashedpassword,
            role
        })

        return res.status(200).json({
            success: true,
            message: 'User Created Successfully'
        })



    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: 'user cannot be register'
        })
    }
}


exports.login = async (req,res) => {
    try {
        
        const {email, password} = req.body;
        
        if(!email || !password){
            return res.status(400).json({
                success: false,
                message: "Please Fill out all fields"
            })
        }

        const userexist = await user.findOne({email});
        if(!userexist){
            return res.status(401).json({
                success: false,
                message: "unauthorized access"
            })
        }

        const payload = {
            email: userexist.email,
            id: userexist._id,
            role: userexist.role
        }

        if(await bcrypt.compare(password, userexist.password)){
            let token = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: "2h"});

            userexist.token = token;
            userexist.password = undefined;

            const option = {
                expires : new Date( Date.now() + 30000),
                httpOnly: true
            }

            res.cookie("token", token, option).status(200).json({
                success: true,
                token,
                userexist,
                message: "User Logged in successfully"
            })
        }else{
            return res.status(403).json({
                success: false,
                message: "Password Incorrect"
            })
        }

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Login Failure"
        })
    }
}