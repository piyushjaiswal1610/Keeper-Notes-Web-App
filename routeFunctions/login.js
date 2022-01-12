import express from "express";
import mongoose from "mongoose";
import issueTokens from "../tokens.js";
import Schema from "../database.js";
import jwt from "jsonwebtoken";

const User = mongoose.model("User", Schema.userSchema);

function login(req, res){

    const username = req.body.username;
    const password = req.body.password;
    var message = null;
    //ensuring no blank request
    if (username == null || password == null) {

        console.log(">> Attempt of unauthorized access detected.");
        res.status(401).send("<h2>Please enter username and password!</h2>");

    }
    else {

        //checking if user already registered 
        User.findOne({ Username: username }, function (err, foundUser) {

            if (foundUser) {
                if (foundUser.Password == password) {  //checking password
                    console.log(">> User login detected: " + foundUser.Username);
                    message="Login Success";
                    const accessToken = issueTokens(req, res);   
                    const responseData ={
                        Username: username,
                        Token: accessToken,
                        Message: message
                    };
                    const jsonContent = JSON.stringify(responseData);
                    res.status(200).send(jsonContent);
                    console.log(">> Login Success:  " + username);

                } else {
                    console.log(">> Attempt of unauthorized access detected.");
                    message="Invalid Password";
                    const responseData ={
                        Message: message
                    };
                    const jsonContent = JSON.stringify(responseData);
                    res.status(200).send(jsonContent);
                }
            } else {
                message="User Not Registered. Please sign up.";
                    const responseData ={
                        Message: message
                    };
                    const jsonContent = JSON.stringify(responseData);
                    res.status(200).send(jsonContent);
            }
        });
    }
}

export default login;