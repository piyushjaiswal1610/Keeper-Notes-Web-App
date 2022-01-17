import React from "react";  
import Fab from '@mui/material/Fab';
import Zoom from '@mui/material/Zoom';

  

function AddNote(props){
    const [noteTitle, setNoteTitle] = React.useState("");
    const [note, setNote] = React.useState("");
    const [title, setTitle] = React.useState("hidden");
    const [textAreaRows, setTextAreaRows] = React.useState("1");
    const [zoomAnimation, setZoomAnimation] = React.useState(false);

    function handleTitleChange(event){
        setNoteTitle(event.target.value);
    }

    function handleNoteChange(event){
        setNote(event.target.value);
    }

    function clear(){
        setNoteTitle("");
        setNote("");

    }

    function add(){
        props.addNote(noteTitle, note)
    }
    function handleAnimation(){
        setTitle("text");
        setTextAreaRows("4");
        setZoomAnimation(true);

    }

    return(<div className="add-notes-box">
    <input type={title} placeholder="Title" className="title-input" value={noteTitle} onChange={handleTitleChange}></input>
    <br></br>
    <textarea type="text" placeholder="Take a note.." className="note-input" rows={textAreaRows} value={note} onChange={handleNoteChange} onClick={handleAnimation}></textarea>
    <Zoom in={zoomAnimation}>
    <Fab className="add-note-button"  style={{
        backgroundColor: "#f5ba13",
        width: "8rem",
        height: "8rem",
        fontSize: "1.5rem",
        float: "right",
        position: "relative",
        bottom: "8rem"
    }} onClick={
        function(event){
        add();
        clear();
        }}><h2 className="btnText">Add</h2></Fab>
        </Zoom>
    </div>);

}
export default AddNote;
