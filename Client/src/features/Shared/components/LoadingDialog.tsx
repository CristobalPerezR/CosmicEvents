import { useEffect, useRef, useState } from "react";
import { XLg, CheckCircleFill, XOctagonFill } from "react-bootstrap-icons"
import { HourglassTop, HourglassSplit } from "react-bootstrap-icons";

import "./components.css"

interface Props {
    show: boolean;
    modus: string;
    onClose: () => void;
    msg?: string;
}

const Dialogs = ( { show, modus, onClose, msg}: Props ) => {
    const dialogRef = useRef<HTMLDialogElement>(null);
    const [dots, SetDots] = useState("");

    const [frameindex, SetFrameIndex] = useState(0);

    useEffect(() => {
        if(show){
            dialogRef.current?.showModal();
        } else{        
            dialogRef.current?.close();
        }
    });

    // LOADING ANIMATION
    useEffect(() => {
        const interval = setInterval(() => {
            SetFrameIndex((prev) => {
                if (prev === 3) return 0;
                return prev + 1;
            });
            
            SetDots((prev) => {
            if (prev === "...") return "";
            return prev + ".";
            });

        }, 500);

        return () => clearInterval(interval);
    }, []);


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

    return(
        <dialog className="User_Dialog" ref={dialogRef}>
            <div className="Close_Dialog">
                <XLg className="Close_Icon" onClick={onClose}></XLg>
            </div>
            <div className="Content_Dialog">
                {modus === "Loading" && 
                    <>
                        {frameindex === 0 && <HourglassTop size={40}></HourglassTop>}
                        {frameindex === 1 && <HourglassSplit size={40}></HourglassSplit>}
                        {frameindex === 2 && <HourglassTop size={40} style={{transform: "rotate(180deg)"}}></HourglassTop>}
                        {frameindex === 3 && <HourglassTop className="SpinAnimation" size={40}></HourglassTop>}
                        <span> Loading{dots} </span>
                    </>
                }

                {modus === "Failed" && 
                    <>
                        <XOctagonFill className="FailIcon" size={40}></XOctagonFill>
                        <span> {msg} </span>
                    </>
                }

                {modus === "Success" && 
                    <>
                        <CheckCircleFill className="SuccessIcon" size={40}></CheckCircleFill>
                        <span> Success{msg} </span>
                    </>
                }
            </div>
        </dialog>
    )
}

interface MainProps {
    modus: string;
    onClose: () => void;
    msg?: string;
}

const LoadingDialog = ( { modus, onClose, msg}: MainProps ) => {
    return(
        <>
            {modus === "Loading" && <Dialogs show={modus === "Loading"} modus={modus} onClose={onClose}/>}
            {modus === "Success" && <Dialogs show={modus === "Success"} modus={modus} onClose={onClose} msg={msg}/>}
            {modus === "Failed" && <Dialogs show={modus === "Failed"} modus={modus} onClose={onClose} msg={msg}/>}
        </>
    )
}

export default LoadingDialog