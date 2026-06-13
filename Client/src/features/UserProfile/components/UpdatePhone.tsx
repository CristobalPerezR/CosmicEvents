import LoadingDialog from "../../Shared/components/LoadingDialog";
import { useEffect, useRef, useState } from "react";

import "./accountchanges.css"
import { useDebounce } from "../../Shared/hooks/useDebounce";
import { CheckPhone_Service, UpdatePhone_Service } from "../services/UserServices";

interface Props{
    show: boolean;
    onClose: () => void;
}

const UpdatePhone = ( { show, onClose }:Props ) => {
    const dialogRef = useRef<HTMLDialogElement>(null);
    const [dialog, setDialog] = useState("");
    const [msg, setMsg] = useState("");

    const [newphone, setNewPhone] = useState("");
    const [confirmphone, setConfirmPhone] = useState("");
    const [checkphone, setCheckPhone] = useState<true|false|null>(null);
    const [checkphones, setCheckPhones] = useState<true|false|null>(null);

    
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
        if (confirmphone == ""){
            setCheckPhones(null);
        } else{
            if (newphone == confirmphone) {
                setCheckPhones(true)
            } else{
                setCheckPhones(false)
            }
        }
    });

    const phoneDebouce = useDebounce<string>(newphone, 800);
    useEffect(() => {
        if (!phoneDebouce.trim()) {
            setCheckPhone(null);
            return;
        }

        const verifyPhone = async() => {
            try{
                const res = await CheckPhone_Service(newphone);
                if (res){
                    setCheckPhone(false);
                } else{
                    setCheckPhone(true);
                };

            } catch(error){
                console.error(error);
            }
        }

        verifyPhone();
    }, [phoneDebouce]);

    const handle_UpdatePhone = async(e: React.SyntheticEvent) => {
        e.preventDefault();
        setDialog("Loading");
        try{
            const update = await UpdatePhone_Service(confirmphone);

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
                <h3> Update Phone </h3>
                <form onSubmit={handle_UpdatePhone}>
                    <div>
                        <input className={`${checkphone === null ? "" : checkphone ? "good" : "wrong"}`} type="text" placeholder="New Phone" value={newphone} onChange={(e) => {setNewPhone(e.target.value)}}/>
                        <input className={`${checkphones === null ? "" : checkphones && checkphone ? "good" : "wrong"}`} type="text" placeholder="Confirm Phone" value={confirmphone} onChange={(e) => {setConfirmPhone(e.target.value)}}/>
                    </div>
                    <button onClick={handle_UpdatePhone} disabled={!checkphone || !checkphones}> Save </button>
                </form>
            </dialog>
            <LoadingDialog modus={dialog} onClose={() => setDialog("")} msg={msg}/>
        </>
    )
}

export default UpdatePhone;