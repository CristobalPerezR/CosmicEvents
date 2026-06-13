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
    const [dialog, setDialog] = useState("");
    const [msg, setMsg] = useState("");

    const [email, setEmail] = useState("");
    const [currentEmail, setCurrentEmail] = useState("");
    const [newEmail, setNewEmail] = useState("");
    const [confirmEmail, setConfirmEmail] = useState("");

    const [emailcheck, setEmailCheck] = useState<true|false|null>(null);
    const [currentcheck, setCurrentCheck] = useState<true|false|null>(null);
    const [existEmail, setExistEmail] = useState<true|false|null>(null);

    useEffect(() => {
        if (confirmEmail == ""){
            setEmailCheck(null);
        } else{
            if (newEmail == confirmEmail) {
                setEmailCheck(true)
            } else{
                setEmailCheck(false)
            }
        }
    });

    useEffect(() => {
        if (currentEmail == ""){
            setCurrentCheck(null);
        } else{
            if (email == currentEmail) {
                setCurrentCheck(true)
            } else{
                setCurrentCheck(false)
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
            setEmail(res.user_email);
        };

        getemail();
    }, []);

    const debouncedEmail = useDebounce<string>(newEmail, 800);
    useEffect(() =>{
        if (!debouncedEmail.trim()) {
            setExistEmail(null);
            return;
        }
        const verifyEmail = async () => {
            try {
                const response = await CheckEmail_Service(debouncedEmail);
                if (response){
                    setExistEmail(false);
                } else{
                    setExistEmail(true);
                };
            
            } catch (error) {
                console.error(error);
            };
        };
    
        verifyEmail();
    }, [debouncedEmail]);


    const handle_UpdateEmail = async(e: React.SyntheticEvent) => {
        e.preventDefault();
        setDialog("Loading");
        try{
            const update = await UpdateEmail_Service(confirmEmail)

            if (update){
                setMsg("");
                setDialog("Success");

                setTimeout(() => {
                    window.location.reload();
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
                <h3>Update Email</h3>
                <form onSubmit={handle_UpdateEmail}>
                    <div>
                        <input className={`${currentcheck === null ? "" : currentcheck ? "good" : "wrong"}`} type="email" placeholder="Current Email" value={currentEmail} onChange={(e) => {setCurrentEmail(e.target.value)}}/>
                        <input className={`${existEmail === null ? "" : existEmail ? "good" : "wrong"}`} type="email" placeholder="New Email" value={newEmail} onChange={(e) => {setNewEmail(e.target.value)}}/>
                        <input className={`${emailcheck === null ? "" : emailcheck && existEmail ? "good" : "wrong"}`} type="email" placeholder="Confirm Email" value={confirmEmail} onChange={(e) => {setConfirmEmail(e.target.value)}}/>
                    </div>
                    <button disabled={!currentcheck || !existEmail || !emailcheck} onClick={handle_UpdateEmail}>Save</button>
                </form>
            </dialog>
            <LoadingDialog modus={dialog} onClose={() => setDialog("")} msg={msg}/>
        </>
    )
}

export default UpdateEmail;