import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import AddNote from "./AddNote";
import Note from "./Note";
import axios from "axios";
import { useLocation } from 'react-router-dom';

function App(){

    const location = useLocation();
    const {Username, Token} = location.state;

    const [Notes, setNoteList] = React.useState([]);

    //let username = JSON.stringify(Username);
    let username = Username.username;
    let token = Token.token;
    axios.post('/getNotes',{
        'username': username,
        'accessToken': token
    }).then((res) => {
        setNoteList(res.data);
    });
    

    function addNote(title, content){
        axios.patch('/addNotes',{
            'username': username,
            'accessToken': token,
            'title': title,
            'content': content 
        }).then((res) => {
            if( res.status === 200){
                const newEntry = {
                    id: res.data,
                    title: title,
                    content: content
                };
                setNoteList((prevValues) => {
                    return[...prevValues, newEntry];
                });
            }
            else{
                setNoteList((prevValues)=> {
                    return[...prevValues];
                });
            }
            
        });
        
    }

    function deleteNote(id){
        axios.patch('/deleteNotes',{
            'noteID': id,
            'username': username,
            'accessToken': token
        }).then((res)=> {
            if(res.status === 200){
                setNoteList((prevValue) => {
                    const filteredList = prevValue.filter((note, index) => {
                        return note.id !== id;
                    });
                    return filteredList
                });
            } else {
                setNoteList((prevValues)=> {
                    return[...prevValues];
                });
            }
        });

    }

    return(
        <div>
        <Header />
        
        <AddNote addNote={addNote}/>
        {Notes.map((noteEntry, index) => (
            <Note key={index} id={noteEntry._id} title={noteEntry.title} content={noteEntry.content}
                deleteNote={deleteNote}
            />
          ))}
          
        <Footer />
        </div>
    );
}


export default App;