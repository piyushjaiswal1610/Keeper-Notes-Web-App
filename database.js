import mongoose from "mongoose";

const Schema = mongoose.Schema;



var userSchema = new Schema({
    Username: String,
    Password: String,
    RefreshToken: String
});

var noteSchema = new Schema({
    Username: String,
    Notes: [
        {title: String,
        content: String}
    ]
});

export default {
    userSchema,
    noteSchema
  };
