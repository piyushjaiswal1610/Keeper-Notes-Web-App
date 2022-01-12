import express from "express";
import mongoose from "mongoose";
import Schema from "../database.js";
import jwt from "jsonwebtoken";

const Note = mongoose.model("Note", Schema.noteSchema);

function addNotes(req, res){
    Note.updateOne({Username: req.body.username},{
        $push: {
            Notes: {
                title: req.body.title,
                content: req.body.content
            }
        }
    },
    function(err, result){
        let id;
        let note;
        if(err){
            res.status(400).send();
        }
        else{
            Note.findOne({Username: req.body.username},async function(err, foundUserNotes){
                
                if(foundUserNotes){
                    note = foundUserNotes.Notes;
                    const noteSize = note.length;
                       id= foundUserNotes.Notes[noteSize-1]._id.toString();
                       res.status(200).send(foundUserNotes.Notes[noteSize-1]._id.toString());
                       console.log("Successfully Added Notes");
                }else{
                    console.log("User not found");
                }
            });
            
        }
    });
    
}

export default addNotes;