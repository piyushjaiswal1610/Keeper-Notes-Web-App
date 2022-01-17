import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import mongoose from "mongoose";
import Schema from "./database.js";

dotenv.config();

const User = mongoose.model("User", Schema.userSchema);


//function to issue tokens on successful login or signup
function issueTokens(req, res) {
    let payload = { username: req.body.username };
    let accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
        algorithm: "HS256",
        expiresIn: process.env.ACCESS_TOKEN_LIFE
    });
    let refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
        algorithm: "HS256",
        expiresIn: process.env.REFRESH_TOKEN_LIFE
    });

    User.updateOne(  //adding refresh token to database for future reference
        { Username: req.body.username },
        { $set: { RefreshToken: refreshToken } },
        function (err) {
            if (!err) {
                console.log(">> Refresh Token Added to database.");
            }
            else {
                console.log(">> Refresh Token adding to DB - Error Occurred: " + err);
            }
        }
    );

    return accessToken;

    //secure: true can be added
    res.cookie("jwt", accessToken, { httpOnly: true});  //sending cookies
    console.log(">> Tokens issued");
}



function refresh(req, res){
    
    let accessToken = req.body.accessToken;

    if (!accessToken) {   //checks whether access token exists or not
        console.log(">> Attempt of unauthorized access detected.");
        return res.status(403).send("<h2></h2>Unauthorized Access</h2>");
    }
    let refreshToken="";
    User.findOne(
        { Username: req.body.username }, function (err, foundUser) { //looking for refresh token in database
            if (foundUser) {
                refreshToken = foundUser.RefreshToken;

                //verifying the refresh token
                try {
                    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
                }
                catch (e) {
                    console.log(">> Verifying Refresh Token Error:" + e); //catching and logging error
                    console.log(">> Attempt of unauthorized access detected.");
                    return res.status(401).send("<h2>Unauthorized Access</h2>");
                }

            } else {
                console.log(">> Attempt of unauthorized access detected.");
                res.status(401).send("<h2>Unauthorized Access</h2>");
            }
        }

    )

    let payload = { username: req.body.username };
    let newToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, //creating new access Token
        {
            algorithm: "HS256",
            expiresIn: process.env.ACCESS_TOKEN_LIFE
        });
    //secure: true can be added
    const jsonContent = JSON.stringify(newToken);
    res.status(200).send(jsonContent);
    console.log(">> New Access Token Issued. User can continue accessing protected content.");
    console.log(">> New Access Token : " + newToken);
    return newToken;
}

export default issueTokens;
export {refresh};


