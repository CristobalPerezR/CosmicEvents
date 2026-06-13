import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import "./register.css"
import saturnicon from "/saturnicon2.png"
import PublicHeader from "../../Shared/publicHeader/MainHeader"

import { CheckUsername_Service, Register_Service, CheckEmail_Service } from "../services/AuthServices";
import LoadingDialog from "../../Shared/components/LoadingDialog";

import { SignTurnLeft, SignTurnLeftFill } from "react-bootstrap-icons";
import { useDebounce } from "../../Shared/hooks/useDebounce";

const RegisterPage = () => {
  
  // REGISTER LOGIC
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [checkpsw, setCheckPsw] = useState<true | false | null>(null);
  const [checkemail, setCheckEmail] = useState<true | false | null>(null);
  const [checkusername, setCheckUsername] = useState<true | false | null>(null);
  const [execute, setExecute] = useState(false);
   
  const [dialog, setDialog] = useState("");
  const [msg, setMsg] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    if (confirmPassword == ""){
      setCheckPsw(null);
    } else{
      if (password == confirmPassword) {
        setCheckPsw(true)
      } else{
        setCheckPsw(false)
      }
    }
  });

  const debouncedUsername = useDebounce<string>(username, 800);
  useEffect(() => {// Evitamos disparar la petición si el input está vacío
    if (!debouncedUsername.trim()) {
      setCheckUsername(null);
      return;
    }
    const verifyUsername = async () => {
      try {
        const response = await CheckUsername_Service(debouncedUsername);
        if (response){
          setCheckUsername(false);
        } else{
          setCheckUsername(true);
        };
        
      } catch (error) {
        console.error(error);
      };
    };

    verifyUsername();
  }, [debouncedUsername] );  

  const debouncedEmail = useDebounce<string>(email, 800);
  useEffect(() => {// Evitamos disparar la petición si el input está vacío
    if (!debouncedEmail.trim()) {
      setCheckEmail(null);
      return;
    }
    const verifyEmail = async () => {
      try {
        const response = await CheckEmail_Service(debouncedEmail);
        if (response){
          setCheckEmail(false);
        } else{
          setCheckEmail(true);
        };
        
      } catch (error) {
        console.error(error);
      };
    };

    verifyEmail();
  }, [debouncedEmail] );  
  
  const handle_register = async (e: React.SyntheticEvent) => {
      e.preventDefault();
      if (checkusername && name && checkemail){
        if (checkpsw){
          setExecute(true);
        } else{
          setMsg("Passwords do not match.")
          setDialog("Failed");
        }
      } else{
        setMsg("Please fill the form.")
        setDialog("Failed");
      }

      if (execute){
        setDialog("Loading");
        try{
            const res = await Register_Service(name, username, password, email);
            if (res.message === "User Created"){
                setMsg("");
                setDialog("Success");

                setTimeout(() => {
                    navigate('/login');
                }, 1000);

            } else{
              setMsg(res.message)
              setDialog("Failed")
            }
        } catch(err: any){
            setMsg("Something went wrong.");
            setDialog("Failed");
            console.log(err);
        }
      }
  }


  return(
    <PublicHeader>
      {<LoadingDialog modus={dialog} onClose={() => setDialog("")} msg={msg}/>}
      
      <main className="main-container-register">
        <div className="register-navbar">
            <h2 className="register-form-title">Create Account</h2>
            <Link to="/">
              {<SignTurnLeftFill className="active" size={25}></SignTurnLeftFill>}
              {<SignTurnLeft className="inactive" size={25}></SignTurnLeft>}
            </Link>
        </div>
        <div className="container-cards-register">
          <div className="register-card">
            <form className="register-form" onSubmit={handle_register}>
              <div className={`input-group ${checkusername === null ? "" : checkusername ? "good_psw" : "wrong_psw"}`}>
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
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className={`input-group ${checkemail === null ? "" : checkemail ? "good_psw" : "wrong_psw"}`}>
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
    </PublicHeader>
  );
};

export default RegisterPage;