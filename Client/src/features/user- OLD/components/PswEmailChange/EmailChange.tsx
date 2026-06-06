import { useState } from "react";
import { useNavigate } from "react-router-dom";

import LoadingDialog from "../../../Shared/components/LoadingDialog";
import "./emailapswchange.css"
import { GetEmail_Service, UpdateEmail_Service } from "../../services/UserServices";


const EmailChange = () => {
    const [currentemail, SetCurrentEmail] = useState("");
    const [newemail, SetNewEmail] = useState("");
    const [connewemail, SetConNewEmail] = useState("");

    const [dialog, SetDialog] = useState("");
    const [msg, SetMsg] = useState("");
    const navigate = useNavigate();


    const pre_check = async(e: React.SyntheticEvent) => {
        e.preventDefault();
        SetDialog("Loading");
        try{
            const res = await GetEmail_Service(currentemail);
            if (res.user_email){ // testear
                if (newemail == connewemail && newemail != ""){
                    handle_changeemail();
                } else{
                    SetMsg("Emails does not match.")
                    SetDialog("Failed");
                }
            } else{
                SetMsg("Wrong current email")
                SetDialog("Failed");
            }

        } catch (error: any){
            if (error.response?.status === 401){
                SetMsg("Token expired - logging out.");
                SetDialog("Failed");

                setTimeout(() => {
                    navigate('/home');
                }, 1000);

            } else{
                SetMsg("Something went wrong.");
                SetDialog("Failed");
            }
            console.log("Error:", error);
            throw error;
        }
    }


    const handle_changeemail = async() => {
        try{
            const res = await UpdateEmail_Service(connewemail);
            if (res > 0){
                SetMsg(": email changed");
                SetDialog("Success");

                setTimeout(() => {
                    navigate(0);
                }, 1000);

            } else{

            }

        } catch(error: any){
            if (error.response?.status === 401){
                SetMsg("Token expired - logging out.");
                SetDialog("Failed");

                setTimeout(() => {
                    navigate('/home');
                }, 1000);

            } else{
                SetMsg("Something went wrong.");
                SetDialog("Failed");
            }
            console.log("Error:", error);
            throw error;
        }
    }

    return(
        <div className="Container-Setting-PswC">
            {dialog === "Loading" && <LoadingDialog show={dialog === "Loading"} modus={dialog} onClose={() => SetDialog("")}/>}
            {dialog === "Success" && <LoadingDialog show={dialog === "Success"} modus={dialog} onClose={() => SetDialog("")} msg={msg}/>}
            {dialog === "Failed" && <LoadingDialog show={dialog === "Failed"} modus={dialog} onClose={() => SetDialog("")} msg={msg}/>}
            <h2>Email Change</h2>
            <form className="PswC-Form" onSubmit={pre_check}>
                <div>
                    <div>
                        <label>Current Email: </label>
                        <label>New Email: </label>
                        <label>Confirm New Email: </label>
                    </div>
                    <div>
                        <input
                        type="email"
                        placeholder="Current Password"
                        value={currentemail}
                        onChange={(e) => SetCurrentEmail(e.target.value)}
                        />
                        <input
                        type="email"
                        placeholder="New Password"
                        value={newemail}
                        onChange={(e) => SetNewEmail(e.target.value)}
                        />
                        <input
                        type="email"
                        placeholder="Confirm New Password"
                        value={connewemail}
                        onChange={(e) => SetConNewEmail(e.target.value)}
                        />
                    </div>
                </div>
                <div className="div-button">
                    <button type="submit" className="PswC-Button" onClick={pre_check}>
                        Confirm
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EmailChange;