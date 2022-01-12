import express from "express";
import mongoose from "mongoose";
import Schema from "../database.js";
import jwt from "jsonwebtoken";

const Note = mongoose.model("Note", Schema.noteSchema);

function deleteNotes(req, res){

    const id = req.body.noteID;
    
    Note.updateOne({Username: req.body.username},{
        $pull: {
            Notes: {
                _id: {$in: id}
            }
        }
    },
    function(err, result){
        if(err){
            res.status(400).send();
        }
        else{
            res.status(200).send();
            console.log("Successfully Deleted Notes");
        }
    });
    res.status(200).send();
}

export default deleteNotes;