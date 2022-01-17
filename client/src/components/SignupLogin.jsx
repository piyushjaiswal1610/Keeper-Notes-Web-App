import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import Button from '@mui/material/Button';
import axios from "axios";
import { Link } from "react-router-dom";


function SignupLogin() {

    const [isHidden, setHidden] = React.useState(true);
    const [btnText, setbtnText] = React.useState("Login");
    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [labelStatus, setLabelStatus] = React.useState("Not Registered? Click here to signup");
    const [statusLabel, setStatusLabel] = React.useState("Note: Please set your username & password");
    const [isRedirectHidden, setRedirectHidden] = React.useState(true);
    const [isButtonHidden, setButtonHidden] = React.useState(false);
    const [token, setToken] = React.useState("");


    function handleDynamicClick() {
        setHidden((prevValue) => {
            return !prevValue;
        })
        setbtnText((prevValue) => {
            if (prevValue === "Login") {
                return "Sign Up";
            }
            else {
                return "Login";
            }
        })
        setLabelStatus((prevValue) => {
            if (prevValue === "Not Registered? Click here to signup") {
                return "Already Registered? Login here";
            } else {
                return "Not Registered? Click here to signup";
            }
        })
        setUsername("");
        setPassword("");

    }

    function handleUsernameChange(event) {
        setUsername(event.target.value);
    }
    function handlePasswordChange(event) {
        setPassword(event.target.value);
    }

    function handleButtonClick() {
        if (btnText === "Sign Up") {
            axios.post('/signup', {
                'username': username,
                'password': password
            }).then((res) => {
                setStatusLabel(res.data.Message);
                if (res.data.Message === "Already registered. Please click login." || res.data.Message === "Registration Successful. Please click login.") {
                    setLabelStatus("Please Login");
                    setbtnText("Login");
                }
            });

        }
        
        if (btnText === "Login") {
            axios.post('/login', {
                'username': username,
                'password': password
            }).then((res) => {
                setHidden(false);
                setStatusLabel(res.data.Message);
                
                if (res.data.Message === "Login Success") {
                    //redirect
                    setToken(res.data.Token);
                    setLabelStatus("Click Button to access your notes")
                    setButtonHidden(true);
                    setRedirectHidden(false);
                }
                if (res.data.Message === "User Not Registered. Please sign up.") {
                    setLabelStatus("Click sign up.");
                    setbtnText("Sign Up");
                }
                if (res.data.Message === "Invalid Password") {
                    setLabelStatus("Enter correct password");
                    setPassword("");
                }
            });

        }

    }


    return (
        <div>
            <Header value="signinPage" />
            <div className="login-page-label">
                <h7 hidden={isHidden}>{statusLabel}</h7>
            </div>
            <div className="login-signup-box">
                <div className="inputArea">
                    <input placeholder="Username" className="title-input login-input" value={username} onChange={handleUsernameChange}></input>
                    <input type="password" placeholder="Password" className="title-input login-input" value={password} onChange={handlePasswordChange}></input>
                </div>
                <h5 className="activate-signup-btn" onClick={handleDynamicClick}>{labelStatus}</h5>
                <br></br>
                <div className="login-btn"  hidden={isButtonHidden}>
                    <Button style={{
        backgroundColor: "#f5ba13",
        color: "white",
        fontSize: "1rem",
        marginTop: "1rem"
    }} variant="contained" color="inherit" onClick={handleButtonClick}>{btnText}</Button>
                </div>
                <div className="login-btn"  hidden={isRedirectHidden}>
                <Link to="/notes" state={
                        {
                            Username: {username},
                            Token: {token}
                        }
                    } style={{ textDecoration: 'none' }}><Button style={{
        backgroundColor: "#f5ba13",
        color: "white",
        fontSize: "1rem",
        marginTop: "1rem"
    }} variant="contained" color="inherit" className="custom-btn-style">View Notes </Button> </Link>
                </div>
            </div>
            <Footer />
        </div>

    );
}

export default SignupLogin;