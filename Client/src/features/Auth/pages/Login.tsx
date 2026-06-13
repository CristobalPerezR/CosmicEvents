import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import "./login.css"
import saturnicon from "/saturnicon2.png"
import Header from "../../Shared/publicHeader/MainHeader"

import { Login_Service } from "../services/AuthServices";
import LoadingDialog from "../../Shared/components/LoadingDialog";

import { SignTurnLeft, SignTurnLeftFill } from "react-bootstrap-icons";


const LoginPage = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [msg, SetMsg] = useState("");
    const [dialog, SetDialog] = useState("");

    const navigate = useNavigate();

    const handle_login = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        SetDialog("Loading");

        try{
            const res = await Login_Service(username, password);
            if (res.token){
                SetMsg("");
                SetDialog("Success");

                setTimeout(() => {
                    localStorage.setItem('cosmic_token', res.token);
                    localStorage.setItem('user', JSON.stringify(res.user));
                    localStorage.setItem('location', JSON.stringify(res.location));
                    navigate('/AstroHub');
                }, 1000);

            } else{
                SetMsg("Incorrect username or password.");
                SetDialog("Failed");
            }
        } catch(err: any){
            SetMsg("Something went wrong.");
            SetDialog("Failed");
            console.log(err);
        }
    }

    return(
        <Header>
            {<LoadingDialog modus={dialog} onClose={() => SetDialog("")} msg={msg}/>}

            <main className="main-container-login">
                <div className="login-navbar">
                    <h2 className="login-form-title">Create Account</h2>
                    <Link to="/">
                        {<SignTurnLeftFill className="active" size={25}></SignTurnLeftFill>}
                        {<SignTurnLeft className="inactive" size={25}></SignTurnLeft>}
                    </Link>
                </div>
                <div className="container-cards-login">
                    <div className="login-card">
                        <form className="login-form" onSubmit={handle_login}>
                        <div className="input-group">
                            <label>Username</label>
                            <input
                            type="text"
                            placeholder="Enter username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>

                        <div className="input-group">
                            <label>Password</label>
                            <input
                            type="password"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        <button type="submit" className="login-button">
                            Login
                        </button>
                        </form>

                        <p className="register-text">
                        Don't have an account? <Link className="register-link" to="/register">Register</Link>
                        </p>
                    </div>
                    <div className="login-image">
                        <div className="logo-section">
                        <img className="login-saturnicon" src={saturnicon} alt="Saturn Icon" />
                        <h2>Cosmic Events</h2>
                        </div>
                    </div>
                </div>
            </main>
        </Header>
    );
};

export default LoginPage;