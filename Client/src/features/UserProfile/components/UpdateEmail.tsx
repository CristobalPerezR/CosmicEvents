import LoadingDialog from "../../Shared/components/LoadingDialog";
import { useEffect, useRef, useState } from "react";

import "./accountchanges.css"
import { CheckEmail_Service, GetEmail_Service, UpdateEmail_Service } from "../services/UserServices";
import { useDebounce } from "../../Shared/hooks/useDebounce";

interface Props{
    show: boolean;
    onClose: () => void;
}

const UpdateEmail = ( { show, onClose }:Props ) => {
    const dialogRef = useRef<HTMLDialogElement>(null);
    const [dialog, SetDialog] = useState("");
    const [msg, SetMsg] = useState("");

    const [email, SetEmail] = useState("");
    const [currentEmail, SetCurrentEmail] = useState("");
    const [newEmail, SetNewEmail] = useState("");
    const [confirmEmail, SetConfirmEmail] = useState("");

    const [emailcheck, SetEmailCheck] = useState<true|false|null>(null);
    const [currentcheck, SetCurrentCheck] = useState<true|false|null>(null);
    const [existEmail, SetExistEmail] = useState<true|false|null>(null);

    useEffect(() => {
        if (confirmEmail == ""){
            SetEmailCheck(null);
        } else{
            if (newEmail == confirmEmail) {
                SetEmailCheck(true)
            } else{
                SetEmailCheck(false)
            }
        }
    });

    useEffect(() => {
        if (currentEmail == ""){
            SetCurrentCheck(null);
        } else{
            if (email == currentEmail) {
                SetCurrentCheck(true)
            } else{
                SetCurrentCheck(false)
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

    useEffect(() => {
        const getemail = async() =>{
            const res = await GetEmail_Service();
            SetEmail(res.user_email);
        };

        getemail();
    }, []);

    const debouncedEmail = useDebounce<string>(newEmail, 800);
    useEffect(() =>{
        if (!debouncedEmail.trim()) {
            SetExistEmail(null);
            return;
        }
        const verifyEmail = async () => {
            try {
                const response = await CheckEmail_Service(debouncedEmail);
                if (response){
                    SetExistEmail(false);
                } else{
                    SetExistEmail(true);
                };
            
            } catch (error) {
                console.error(error);
            };
        };
    
        verifyEmail();
    }, [debouncedEmail]);


    const handle_UpdateEmail = async(e: React.SyntheticEvent) => {
        e.preventDefault();
        SetDialog("Loading");
        try{
            const update = await UpdateEmail_Service(confirmEmail)

            if (update){
                SetMsg("");
                SetDialog("Success");

                setTimeout(() => {
                    window.location.reload();
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
                <h3>Update Email</h3>
                <form onSubmit={handle_UpdateEmail}>
                    <div>
                        <input className={`${currentcheck === null ? "" : currentcheck ? "good" : "wrong"}`} type="email" placeholder="Current Email" value={currentEmail} onChange={(e) => {SetCurrentEmail(e.target.value)}}/>
                        <input className={`${existEmail === null ? "" : existEmail ? "good" : "wrong"}`} type="email" placeholder="New Email" value={newEmail} onChange={(e) => {SetNewEmail(e.target.value)}}/>
                        <input className={`${emailcheck === null ? "" : emailcheck && existEmail ? "good" : "wrong"}`} type="email" placeholder="Confirm Email" value={confirmEmail} onChange={(e) => {SetConfirmEmail(e.target.value)}}/>
                    </div>
                    <button disabled={!currentcheck || !existEmail || !emailcheck} onClick={handle_UpdateEmail}>Save</button>
                </form>
            </dialog>
            <LoadingDialog modus={dialog} onClose={() => SetDialog("")} msg={msg}/>
        </>
    )
}

export default UpdateEmail;