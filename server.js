import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";

dotenv.config();

import getNotes from "./routeFunctions/getNotes.js";
import addNotes from "./routeFunctions/addNotes.js";
import deleteNotes from "./routeFunctions/deleteNotes.js";
import signup from "./routeFunctions/signup.js";
import login from "./routeFunctions/login.js";
import verify from "./verify.js";

const app = express();
app.use(bodyParser.json());
app.use(cookieParser());
app.set("view engine", "ejs"); //ejs as templating engine
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());


const username = process.env.DBUsername;
const password = process.env.DBPassword;
const url ="mongodb+srv://" +process.env.DBUsername+ ":" +process.env.DBPassword+ "@keeper.y23nu.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

mongoose.connect(url,
{ useNewUrlParser: true, useUnifiedTopology: true }, err => {
    console.log('connected')
});

app.post("/getNotes", verify, getNotes);
app.patch("/addNotes", verify, addNotes);
app.patch("/deleteNotes", verify, deleteNotes);
app.post("/signup", signup);
app.post("/login", login);

if (process.env.NODE_ENV === 'production') {
    // Exprees will serve up production assets
    app.use(express.static('client/build'));
  
    // Express serve up index.html file if it doesn't recognize route

    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
  }

const port = 6000;

app.listen(process.env.PORT || port,  ()=> {
    console.log(`>> Server started successfully.` + process.env.PORT || port);
  });
  