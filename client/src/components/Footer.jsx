import React from "react";

const date = new Date();
const year = date.getFullYear();

function Footer(){
    return (
        <div className="footer">
        <p className="footer-para">Copyright &copy; {year}</p>
        </div>
    );
}

export default Footer;