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
    const [dialog, setDialog] = useState("");
    const [msg, setMsg] = useState("");

    const [currentpsw, setCurrentPsw] = useState("");
    const [newpsw, setNewPsw] = useState("");
    const [confirmpsw, setConfirmPsw] = useState("");

    const [checkpsw, setCheckPsw] = useState<true|false|null>(null);
    const [matchpsw, setMatchPsw] = useState<true|false|null>(null);

    useEffect(() => {
        if (confirmpsw == ""){
            setMatchPsw(null);
        } else{
            if (newpsw == confirmpsw) {
                setMatchPsw(true)
            } else{
                setMatchPsw(false)
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
            setCheckPsw(null);
            return;
        }
        const verifypsw = async() =>{
            try{
                const res = await CheckPassword_Service(currentpsw);
                if (res){
                    setCheckPsw(true);
                } else{
                    setCheckPsw(false);
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
        setDialog("Loading");

        if (!checkpsw || !matchpsw){
            setMsg("Please fill the form.")
            setDialog("Failed");
            return;
        }

        try{
            const update = await UpdatePassword_Service(confirmpsw);

            if (update){
                setMsg(": logging out.");
                setDialog("Success");

                setTimeout(() => {
                    localStorage.removeItem("user");
                    localStorage.removeItem("cosmic_token");
                    localStorage.removeItem("location");
                    navigate("/login");
                }, 500);

            } else{
                setMsg("Something went wrong.");
                setDialog("Failed");
            }

        } catch(err: any){
            setMsg("Something went wrong.");
            setDialog("Failed");
            console.log(err);
        }
    }


    return (
        <>
            <dialog className="Account_Changes" ref={dialogRef}>
                <h3>Update Password</h3>
                <form onSubmit={handle_UpdatePassword}>
                    <div>
                        <input className={`${checkpsw === null ? "" : checkpsw ? "good" : "wrong"}`} type="password" placeholder="Current Password" value={currentpsw} onChange={(e) => {setCurrentPsw(e.target.value)}}/>
                        <input type="password" placeholder="New Password" value={newpsw} onChange={(e) => {setNewPsw(e.target.value)}}/>
                        <input className={`${matchpsw === null ? "" : matchpsw ? "good" : "wrong"}`} type="password" placeholder="Confirm Password" value={confirmpsw} onChange={(e) => {setConfirmPsw(e.target.value)}}/>
                    </div>
                    <button onClick={handle_UpdatePassword} disabled={!checkpsw || !matchpsw}> Save </button>
                </form>
            </dialog>
            <LoadingDialog modus={dialog} onClose={() => setDialog("")} msg={msg}/>
        </>
    )
}

export default UpdatePassword;