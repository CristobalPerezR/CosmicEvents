import LoadingDialog from "../../Shared/components/LoadingDialog";
import { useEffect, useRef, useState } from "react";

import "./accountchanges.css"
import { useDebounce } from "../../Shared/hooks/useDebounce";
import { CheckPassword_Service, UpdatePassword_Service } from "../services/UserServices";
import { useNavigate } from "react-router-dom";

interface Props{
    show: boolean;
    onClose: () => void;
}

const UpdatePassword = ( { show, onClose }:Props ) => {
    const dialogRef = useRef<HTMLDialogElement>(null);
    const [dialog, SetDialog] = useState("");
    const [msg, SetMsg] = useState("");

    const [currentpsw, SetCurrentPsw] = useState("");
    const [newpsw, SetNewPsw] = useState("");
    const [confirmpsw, SetConfirmPsw] = useState("");

    const [checkpsw, SetCheckPsw] = useState<true|false|null>(null);
    const [matchpsw, SetMatchPsw] = useState<true|false|null>(null);

    useEffect(() => {
        if (confirmpsw == ""){
            SetMatchPsw(null);
        } else{
            if (newpsw == confirmpsw) {
                SetMatchPsw(true)
            } else{
                SetMatchPsw(false)
            }
        }
    });

    
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

    const pswDebounce = useDebounce<string>(currentpsw, 800);
    useEffect(() =>{
        if (!pswDebounce.trim()) {
            SetCheckPsw(null);
            return;
        }
        const verifypsw = async() =>{
            try{
                const res = await CheckPassword_Service(currentpsw);
                if (res){
                    SetCheckPsw(true);
                } else{
                    SetCheckPsw(false);
                }
            } catch (error){
                console.error(error);
            }
        }
        verifypsw();
    }, [pswDebounce]);


    const navigate = useNavigate();
    const handle_UpdatePassword = async(e: React.SyntheticEvent) => {
        e.preventDefault();
        SetDialog("Loading");

        if (!checkpsw || !matchpsw){
            SetMsg("Please fill the form.")
            SetDialog("Failed");
            return;
        }

        try{
            const update = await UpdatePassword_Service(confirmpsw);

            if (update){
                SetMsg(": logging out.");
                SetDialog("Success");

                setTimeout(() => {
                    localStorage.removeItem("user");
                    localStorage.removeItem("cosmic_token");
                    localStorage.removeItem("location");
                    navigate("/login");
                }, 500);

            } else{
                SetMsg("Something went wrong.");
                SetDialog("Failed");
            }

        } catch(err: any){
            SetMsg("Something went wrong.");
            SetDialog("Failed");
            console.log(err);
        }
    }


    return (
        <>
            <dialog className="Account_Changes" ref={dialogRef}>
                <h3>Update Password</h3>
                <form onSubmit={handle_UpdatePassword}>
                    <div>
                        <input className={`${checkpsw === null ? "" : checkpsw ? "good" : "wrong"}`} type="password" placeholder="Current Password" value={currentpsw} onChange={(e) => {SetCurrentPsw(e.target.value)}}/>
                        <input type="password" placeholder="New Password" value={newpsw} onChange={(e) => {SetNewPsw(e.target.value)}}/>
                        <input className={`${matchpsw === null ? "" : matchpsw ? "good" : "wrong"}`} type="password" placeholder="Confirm Password" value={confirmpsw} onChange={(e) => {SetConfirmPsw(e.target.value)}}/>
                    </div>
                    <button onClick={handle_UpdatePassword} disabled={!checkpsw || !matchpsw}> Save </button>
                </form>
            </dialog>
            <LoadingDialog modus={dialog} onClose={() => SetDialog("")} msg={msg}/>
        </>
    )
}

export default UpdatePassword;