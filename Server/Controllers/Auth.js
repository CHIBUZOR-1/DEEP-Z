const bcrypt = require('bcryptjs');
const validator = require('validator');
const crypto = require('crypto');
const { setCookiesWithToken } = require('../Utilities/verifyToken');
const userModel = require('../models/userModel');
const jwt = require('jsonwebtoken');

const signUp = async(req, res) => {
    try {
        const { username, firstname, lastname, phoneNumber, email, password } = req.body;
        if(!firstname || !lastname || !phoneNumber || !email || !password) {
            return res.send({ success: false, message: "All fields required"});
        }
        const existsUsername = await userModel.findOne({username});
        if(existsUsername) {
            return res.json({
                success: false,
                message: "Username already in use"
            })
        }

        const existsEmail = await userModel.findOne({email});
        if(existsEmail) {
            return res.json({
                success: false,
                message: "Email already in use"
            })
        }
        // validating email format & password
        if(!validator.isEmail(email)) {
            return res.json({
                success: false,
                message: "Enter a valid Email Address"
            })
        }
        if(password.length < 6) {
            return res.json({
                success: false,
                message: "Please enter a strong password"
            })
        }
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(password, `${salt}`);
        const newUser = await new userModel({
            username,
            firstname,
            lastname,
            phoneNumber,
            email,
            password: `${hashedPassword}`,
            verified: true
        }).save();
        res.status(201).json({
            success: true,
            error: false,
            message: "Registered sucessfully"
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            error: true,
            message: "An error occurred!"
        })
    }
}

const signIn = async(req, res)=> {
    try {
        const { firstInput, password } = req.body;
        if(!firstInput || !password) {
            return res.status(400).send({success: false, message: "field required"})
        }
        const user = await userModel.findOne({ 
            $or: [
                { username: firstInput },
                { email: firstInput }
            ] 
        });
        if(!user) {
            return res.json({
                error: true,
                success: false,
                message: "User not found"
            })
        } 
        setCookiesWithToken(user._id, res);
        const details = {
            id: user._id,
            username: user.username,
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email,
            phone: user.phoneNumber,
            profilePic: user.profileImg,
        };
        res.status(200).json({
            success: true,
            message: "Login successful",
            details
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            error: true,
            message: "An error occurred!"
        })
    }
}
const signOut = async(req, res) => {
    try {
        res.cookie("jwt", "", { maxAge: 0});
        res.cookie("socket", "", { maxAge: 0});
        res.status(200).json({
            success: true,
            message: "Logged Out successfully"
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: true,
            success: false,
            message: "An error occured!"
        })
    }
}

const forgotPassword = async(req, res) => {
    try {
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            error: true,
            message: "An error occurred!"
        })
    }
}

const resetPassword = async(req, res) => {
    try {
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            error: true,
            message: "An error occurred!"
        })
    }
}

const verifyEmail = async(req, res)=> {
    try {
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            error: true,
            message: "An error occurred!"
        })
    }
}

const googleAuthSignUp = async(req, res)=> {
    try {
        const { username, firstname, lastname,  email} = req.body;
        if(!username || !firstname || !lastname  || !email) {
            return res.send({error: "ll fields  are required"});
        }
        const existsEmail = await userModel.findOne({email});
        if(existsEmail) {
            return res.status(400).json({
                success: false,
                message: "Email already in use"
            })
        }
        
        const newUser = await new userModel({
            username,
            firstname,
            lastname,
            email,
            verified: true,
            googleId: req.body.googleId
        }).save();

        res.status(201).json({
            success: true,
            error: false,
            message: "Registered sucessfully"
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            error: true,
            message: "Error Ocurred"
        })
    }
}
const googleAuthLogin = async(req, res)=> {
    try {
        const {email, googleId} = req.body;
        const user = await userModel.findOne({ email, googleId });
        if (!user) { 
            return res.status(400).json({ success: false, message: "User not found or incorrect credentials" }); 
        }
        setCookiesWithToken(user._id, res);
        socketToken(user._id, res);
        const details = {
            id: user._id,
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email,
            gender: user.gender,
            profilePic: user.profileImg,
            coverImage: user.coverImg
        };
        res.status(200).json({
            success: true,
            message: "Login successful",
            details
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({
            error: true,
            message: "Error Ocurred"
        });
    }
}

const updateProfile = async(req, res)=> {
    try {
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            error: true,
            message: "An error occurred!"
        })
    }
}

module.exports = { signUp, signIn, signOut, googleAuthLogin, googleAuthSignUp, updateProfile, forgotPassword, verifyEmail, resetPassword }