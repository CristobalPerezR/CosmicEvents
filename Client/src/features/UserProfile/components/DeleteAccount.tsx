import { useNavigate } from "react-router-dom";
import LoadingDialog from "../../Shared/components/LoadingDialog";
import { useEffect, useRef, useState } from "react";
import { DeleteAccount_Service } from "../services/UserServices";

interface Props{
    show: boolean;
    onClose: () => void;
}


const DeleteAccount = ( { show, onClose }:Props ) => {
    const dialogRef = useRef<HTMLDialogElement>(null);

    const [dialog, SetDialog] = useState("");
    const [msg, SetMsg] = useState("");
    const navigate = useNavigate();
    
    useEffect(() => {
        if(show){
            dialogRef.current?.showModal();
        } else{        
            dialogRef.current?.close();
        }
    });
    
    // CLOSE THE DIALOG
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                onClose();
            }
        };

        window.addEventListener("keydown", handleKeyDown);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, []);

    const handle_DelAccount = async() => {
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
        <>
            <dialog className="DA-Dialog" ref={dialogRef}>
                <span> Are you sure you want to delete your account? </span>
                <div>
                    <button className="DA-DeleteButton" onClick={handle_DelAccount}> Delete Account </button>
                    <button className="DA-CancelButton" onClick={onClose}> Cancelar </button>
                </div>
            </dialog>
            {<LoadingDialog modus={dialog} onClose={() => SetDialog("")} msg={msg}/>}
        </>
    )
}

export default DeleteAccount;