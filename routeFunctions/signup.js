import express from "express";
import mongoose from "mongoose";
import issueTokens from "../tokens.js";
import Schema from "../database.js";
import jwt from "jsonwebtoken";

const User = mongoose.model("User", Schema.userSchema);
const Note = mongoose.model("Note", Schema.noteSchema);

function signup(req, res){
    const username = req.body.username;
    const password = req.body.password;

    var message = null;
    User.findOne({ Username: username }, function (err, foundUser) {
        if (!foundUser) {  //ensuring no duplicate entry or signup              

            //creating new user document
            const newUser = new User({
                Username: username,
                Password: password
            });
            
            newUser.save(function (errors) {   //saving user data to database
                if(errors){
                    consle.log(errors);
                }
                if (!errors) {
                    message="Registration Successful. Please click login.";
                    const accessToken = issueTokens(req, res);
                    createNotesArray(req, res);
                    const responseData ={
                        Username: username,
                        Token: accessToken,
                        Message: message
                    };
                    const jsonContent = JSON.stringify(responseData);
                    res.status(200).send(jsonContent);
                    console.log(">> New User Registered Successfully:  " + username);
                } else {
                    message="Registration failed. Please try again.";
                    const responseData ={
                        Message: message
                    };
                    console.log(responseData);
                    const jsonContent = JSON.stringify(responseData);
                    res.status(200).send(jsonContent);
                    console.log(errors);
                }
            });
        }
        else {
            message="Already registered. Please click login.";
            const responseData ={
                Message: message
            };
            console.log(responseData);
            const jsonContent = JSON.stringify(responseData);
            res.status(200).send(jsonContent);
        }
    })

}

export default signup;

function createNotesArray(req, res){
    const username = req.body.username;
    Note.findOne({ Username: username }, function (err, foundUser) {
        if (!foundUser) {  //ensuring no duplicate entry or signup              

            //creating new user document
            const newUserNote = new Note({
                Username: username,
                Notes: []
            });

            newUserNote.save(function (errors) {   //saving user data to database
                if (!errors) {
                    res.status(200).send();
                    console.log(username + "Notes Array Added");
                } else {
                    res.send();
                    console.log("Notes Array Addition Failed" + errors);
                }
            });
        }
        else {
            console.log("Notes Array Already exist");
            res.send();
        }
    })
}