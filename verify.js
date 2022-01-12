import jsonwebtoken from "jsonwebtoken";
import { refresh } from "./tokens.js";
import jwt from "jsonwebtoken";

function verify(req, res, next) {
    let accessToken = req.body.accessToken;
    if (!accessToken) {
        console.log(">> Attempt of unauthorized access detected. Access token not found");
        return res.status(403).send("<h1>Unauthorized Access!</h1><br><h2>Please sign up or login.</h2>");
    }

    let payload;
    //verifying access token 
    try {
        payload = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
        next(); //middleware function
    }
    catch (e) {
        console.log(e);  //catching error and its type
        if (e.name == "TokenExpiredError") {
            refresh(req, res);                  // function to re-issue access token
        }
    }
}

export default verify;