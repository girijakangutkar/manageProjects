const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")
const saltRounds = 10;
const authModel = require("../model/AuthModel");

exports.signUpController = async(req, res) => {
    try {
        const {userName, email, password, userRole} = req.body;

        const existingUser = await authModel.findOne({email});

        if(existingUser){
            return res.status(400).json({msg: "Email already exists"});
        }

        bcrypt.hash(password, saltRounds, async function(err, hash){
            if(err){
                return res.status(500).json({msg: "Something went wrong while hashing the password"})
            }

            const newUser = new authModel({
                userName,
                email, 
                password: hash, 
                userRole: userRole || "user"
            })

            await newUser.save();
           res.status(201).json({msg: "User sign up success"}); 
        })
    } catch (error) {
        console.log(error.message)
        res.status(500).json({msg: "something went wrong at signup"})
    }
}

exports.loginController = async(req, res) => {
    try {
        const { email, password } = req.body;
        const user = await authModel.findOne({email});
    
        if(!email || !password){
            res.status(400).json({msg: "User name and password is requried"})
        }

        if(!user){
            return res.status(404).json({msg: "User does not exists, please signup"})
        }

        bcrypt.compare(password, user.password, function(err, result) {
            if(err || !result) {
                return res.status(400).json({msg: "Wrong password"});
            }

            const userRole = user.userRole || "user";
            const token = jwt.sign(
                {userId: user._id, role: userRole},
                process.env.JWT_SECRET,
                {expiresIn: "1d"}
            );

            res.status(200).json({msg: "User logged in", token})
        })
    } catch (error) {
        console.log(error.message)
        res.status(500).json({
            msg: "Something went wrong while logging in"
        })
    }
}

exports.logoutController = async(req, res) => {
    try {
        return res.status(200).json({
            msg: "Logout successful. Remove token from client storage."
        });
    } catch (error) {
        console.log(error.message);

        return res.status(500).json({
            msg: "Something went wrong while logging out"
        });
    }
}