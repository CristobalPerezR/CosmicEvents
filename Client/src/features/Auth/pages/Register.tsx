import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import "./register.css"
import saturnicon from "/saturnicon2.png"
import backicon from "../assets/return_icon_cut.png"
import Header from "../../Shared/publicHeader/MainHeader"

import { Register_Service } from "../services/AuthServices";
import LoadingDialog from "../../Shared/components/LoadingDialog";

const RegisterPage = () => {

  // REGISTER LOGIC
  const [username, setUsername] = useState("");
  const [name, SetName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [checkpsw, SetCheckPsw] = useState<true | false | null>(null);
  const [execute, SetExecute] = useState(false);
   
  const [dialog, SetDialog] = useState("");
  const [msg, SetMsg] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    if (confirmPassword == ""){
      SetCheckPsw(null);
    } else{
      if (password == confirmPassword) {
        SetCheckPsw(true)
      } else{
        SetCheckPsw(false)
      }
    }
  });
  
  const handle_register = async (e: React.SyntheticEvent) => {
      e.preventDefault();
      if (username && name && email){
        if (checkpsw){
          SetExecute(true);
        } else{
          SetMsg("Passwords do not match.")
          SetDialog("Failed");
        }
      } else{
        SetMsg("Please fill the form.")
        SetDialog("Failed");
      }

      if (execute){
        SetDialog("Loading");
        try{
            const res = await Register_Service(name, username, password, email);
            if (res.message === "User Created"){
                SetDialog("Success");

                setTimeout(() => {
                    navigate('/login');
                }, 1000);

            } else{
              SetMsg(res.message)
              SetDialog("Failed")
            }
        } catch(err: any){
            SetMsg("Something went wrong.");
            SetDialog("Failed");
            console.log(err);
        }
      }
  }


  return(
    <Header>
      {dialog === "Loading" && <LoadingDialog show={dialog === "Loading"} modus={dialog} onClose={() => SetDialog("")}/>}
      {dialog === "Success" && <LoadingDialog show={dialog === "Success"} modus={dialog} onClose={() => SetDialog("")}/>}
      {dialog === "Failed" && <LoadingDialog show={dialog === "Failed"} modus={dialog} onClose={() => SetDialog("")} msg={msg}/>}
      
      <main className="main-container-register">
        <div className="register-navbar">
            <h2 className="register-form-title">Create Account</h2>
            <Link to="/"><img className="register-backicon" src={backicon} /></Link>
        </div>
        <div className="container-cards-register">
          <div className="register-card">
            <form className="register-form" onSubmit={handle_register}>
              <div className="input-group">
                <label>Username</label>
                <input
                  type="text"
                  placeholder="Enter @username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>

              <div className="input-group">
                <label>Name</label>
                <input
                  type="text"
                  placeholder="Enter name"
                  value={name}
                  onChange={(e) => SetName(e.target.value)}
                />
              </div>

              <div className="input-group">
                <label>Email</label>
                <input
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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

              <div className={`input-group ${checkpsw === null ? "" : checkpsw ? "good_psw" : "wrong_psw"}`}>
                <label>Confirm Password</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                  }}
                />
              </div>

              <button type="submit" className="register-button" onClick={handle_register}>
                Register
              </button>
            </form>

            <p className="login-text">
              Already have an account? <Link className="login-link" to="/login">Log in</Link>
            </p>
          </div>
          <div className="register-image">
            <div className="logo-section">
              <img className="register-saturnicon" src={saturnicon} alt="Saturn Icon" />
              <h2>Cosmic Events</h2>
            </div>
          </div>
        </div>
      </main>
    </Header>
  );
};

export default RegisterPage;