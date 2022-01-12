import express from "express";
import mongoose from "mongoose";
import Schema from "../database.js";
import jwt from "jsonwebtoken";

const Note = mongoose.model("Note", Schema.noteSchema);

var notesArray =[];

function getNotes(req, res){
    Note.findOne({Username: req.body.username}, function(err, foundUserNote){
        
        if(!err){
            notesArray = foundUserNote.Notes;
            const responseData = JSON.stringify(notesArray);
            res.status(200).send(responseData);
        }
        else{
            res.status(400).send();
        }

    });
}

export {notesArray};
export default getNotes;