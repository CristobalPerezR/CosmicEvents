import "./deleteaccount.css"
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import { DeleteAccount_Service } from "../../services/UserServices";
import LoadingDialog from "../../../Shared/components/LoadingDialog";

const DeleteAccount = () => {
    const dialogRef = useRef<HTMLDialogElement>(null);

    const [dialog, SetDialog] = useState("");
    const [msg, SetMsg] = useState("");
    const navigate = useNavigate();

    const openDialog = () => {
        dialogRef.current?.showModal();
    };

    const closeDialog = () => {
        dialogRef.current?.close();
    };

    const handle_DA = async() => {
        SetDialog("Loading");

        try{
            const res = await DeleteAccount_Service();
            if (res > 0){
                SetMsg(": account deleted");
                SetDialog("Success");

                setTimeout(() => {
                    localStorage.removeItem("cosmic_token");
                    navigate('/home');
                }, 1000);
                
            } else{
                SetMsg("Something went wrong.");
                SetDialog("Failed");
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
        };
    };

    return(
        <div className="Container-Setting-DA">
            {dialog === "Loading" && <LoadingDialog show={dialog === "Loading"} modus={dialog} onClose={() => SetDialog("")}/>}
            {dialog === "Success" && <LoadingDialog show={dialog === "Success"} modus={dialog} onClose={() => SetDialog("")} msg={msg}/>}
            {dialog === "Failed" && <LoadingDialog show={dialog === "Failed"} modus={dialog} onClose={() => SetDialog("")} msg={msg}/>}
            <h2> Delete Account </h2>
            <div>
                <div>
                    <span> Do you want to delete your account? </span>
                </div>
                <div>
                    <button className="DA-DeleteButton" onClick={openDialog}> Delete </button>
                </div>
            </div>

            <dialog className="DA-Dialog" ref={dialogRef}>
                <span> Are you sure you want to delete your account? </span>
                <div>
                    <button className="DA-DeleteButton" onClick={handle_DA}> Delete Account </button>
                    <button className="DA-CancelButton" onClick={closeDialog}> Cancelar </button>
                </div>
            </dialog>
        </div>
    );
};

export default DeleteAccount;