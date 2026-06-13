import { Link, useNavigate } from "react-router-dom";
import "./userheader.css"

import saturnicon from "/saturnicon2.png";
import { useEffect, useState } from "react";

import { GearFill, BoxArrowLeft, InfoLg, Camera2, PersonBoundingBox, PersonFill, Calendar2Event } from "react-bootstrap-icons";
import { CaretDown, CaretDownFill } from "react-bootstrap-icons";

import { useAuth } from "../../../context/AuthContext";

interface Headerprops {
    children: React.ReactNode;
    showHeader?: boolean;
}

const UserHeader = ( { children, showHeader = true }: Headerprops ) => {
    const [menuid, setMenuId] = useState(0) // 1: Explore | 2: Help | 3: Account | 0: None

    const navigate = useNavigate();
    const { logout } = useAuth();

    const handle_logout = () => {
        logout();
        navigate("/home");
    }

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape"){
                setMenuId(0);
            }
        };

        window.addEventListener("keydown", handleKeyDown);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, []);

    return (
        <>
            <header className={`UserHeader-nav-bar ${showHeader ? "header-visible" : "header-hidden"}`}>
                <nav className="UserHeader-container">
                    <div className="UserHeader-title-container">
                        <Link className="UserHeader-title" to="/AstroHub">
                            <img className="UserHeader-title-icon" src={saturnicon}/>
                        </Link>
                        
                        <Link className="UserHeader-title" to="/AstroHub">
                            <h2>Cosmic Events</h2>
                        </Link>
                    </div>
                    
                    <div className="UserHeader-items">
                        <div> <Link to="/AstroHub"> Astro-Hub </Link> </div>
                        <div> <Link to="/SkyMap"> SkyViewer </Link> </div>
                        <div> <a className={`UserLinks-deploy ${menuid==1 ? "opened" : ""}`} onClick={() => 
                            {if (menuid == 1){setMenuId(0)}else{setMenuId(1)}}}> 
                            {menuid === 1 && <>Explore <CaretDownFill></CaretDownFill></>}
                            {menuid != 1 && <>Explore <CaretDown></CaretDown></>}
                            </a>
                        </div>
                        <div> <a className={`UserLinks-deploy ${menuid==2 ? "opened" : ""}`} onClick={() => 
                            {if (menuid == 2){setMenuId(0)}else{setMenuId(2)}}}>
                            {menuid === 2 && <>Help <CaretDownFill></CaretDownFill></>}
                            {menuid != 2 && <>Help <CaretDown></CaretDown></>}
                            </a>
                        </div>
                        <div> <a className={`UserLinks-deploy ${menuid==3 ? "opened" : ""}`} onClick={() =>
                            {if (menuid == 3){setMenuId(0)}else{setMenuId(3)}}}>
                            {menuid === 3 && <>Account <CaretDownFill></CaretDownFill></>}
                            {menuid != 3 && <>Account <CaretDown></CaretDown></>}
                            </a>
                        </div>
                    </div>
                </nav>
            </header>
            <div className="Dropdowns_Menues">
                <div className={`Dropdown_Explore ${showHeader && menuid==1 ? "openmenu" : "closemenu"}`}>
                    <div> <Link to=""> <Calendar2Event size={13}></Calendar2Event> Event Search </Link> </div>
                    <div> <Link to=""> <Camera2 size={13}></Camera2> Equipment </Link> </div>
                    <div> <Link to=""> <PersonBoundingBox size={13}></PersonBoundingBox> User List </Link> </div>
                </div>
                
                <div className={`Dropdown_Help ${showHeader && menuid==2 ? "openmenu" : "closemenu"}`}>
                    <div> <Link to=""> <InfoLg></InfoLg> What is this site? </Link> </div>
                    <div> <Link to=""> <InfoLg></InfoLg> About Us </Link> </div>
                </div>

                <div className={`Dropdown_Setting ${showHeader && menuid==3 ? "openmenu" : "closemenu"}`}>
                    <div> <Link to={`/profile/${JSON.parse(localStorage.getItem("user") as string).username}`}> <PersonFill size={13}></PersonFill> Profile </Link> </div>
                    <div> <Link to={`/profile/${JSON.parse(localStorage.getItem("user") as string).username}/settings`}> <GearFill size={13}></GearFill> Settings </Link> </div>
                    <hr />
                    <div> <a onClick={handle_logout}> <BoxArrowLeft size={13}></BoxArrowLeft> Log Out </a> </div>
                </div>
            </div>
            { children }
        </>
    );
};

export default UserHeader;