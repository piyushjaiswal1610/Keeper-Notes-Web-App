import React from "react";
import DeleteIcon from '@mui/icons-material/Delete';

function Note(props){
    return (
        <div className="note">
        <h1 className="note-heading">{props.title}</h1>
        <p className="note-para">{props.content}</p>
        <button className="delete-note-btn" onClick={() => {
        props.deleteNote(props.id)
        }}><DeleteIcon style={{
        height: "2rem",
        width: "2rem",
        margin: "0rem"
        }}/></button>
        </div>
    );
}

export default Note;