import React from "react";
import EventNoteIcon from '@mui/icons-material/EventNote';
import {Link} from 'react-router-dom';

function Header(props){

    function handleClick(){
        window.location.replace("/");
    }

return (
    
    <div className="header-bar">
    <Link to="/notes" style={{ textDecoration: 'none' }}><h1 className="header-text"><EventNoteIcon style={{ textDecoration: 'none' }}/> Notes Keeper</h1></Link>
    <div hidden={(props.value) === "signinPage" ? true : false}>
    <button  className="log-out-button" onClick={handleClick}>Log Out</button>
    </div>
    </div>
   
);
}

export default Header;