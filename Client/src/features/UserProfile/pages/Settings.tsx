import { useEffect, useState } from "react";
import UserHeader from "../../Shared/userHeader/UserHeader";
import "./settings.css"
import DeleteAccount from "../components/DeleteAccount";
import { GetEmail_Service, GetPhone_Service, GetSettings_Service, UpdateSettings_Service } from "../services/UserServices";
import LoadingDialog from "../../Shared/components/LoadingDialog";
import EditCityCountry from "../components/EditCityCountry";
import UpdateEmail from "../components/UpdateEmail";
import UpdatePassword from "../components/UpdatePassword";
import UpdatePhone from "../components/UpdatePhone";


const Settings = () =>{ 
    const [dialog, SetDialog] = useState("");
    const [msg, SetMsg] = useState("");

    const [city, SetCity] = useState("City");
    const [country, SetCountry] = useState("Country");
    const [useremail, SetUserEmail] = useState("xxxx@xxxx.cl")
    const [phone, SetPhone] = useState("+XX X XXXX XXXX");

    const [shomodal, SetShowModal] = useState("");

    const [notifications, setNotifications] = useState({
        receive: false,
        Catalogue: false,
        CEvents: false,
        likesresume: false,
        newfolowers: false,
    });

    const [old_notifications, setOld_Notifications] = useState({
        receive: false,
        Catalogue: false,
        CEvents: false,
        likesresume: false,
        newfolowers: false,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = e.target;

        if (name === "receive" && !checked) {
            setNotifications({
                receive: false,
                Catalogue: false,
                CEvents: false,
                likesresume: false,
                newfolowers: false,
            });
            return;
        }

        setNotifications({
            ...notifications,
            [name]: checked,
        });
    }


    const getuseremail = async() => {
        const res = await GetEmail_Service();
        SetUserEmail(res.user_email);
    };

    const getnotsettings = async() => {
        const res = await GetSettings_Service();
        setNotifications({
            receive: res.ns_enabled,
            Catalogue: res.ns_catalogue,
            CEvents: res.ns_nearby_events,
            likesresume: res.ns_likes_summary,
            newfolowers: res.ns_new_followers,
        });

        setOld_Notifications({
            receive: res.ns_enabled,
            Catalogue: res.ns_catalogue,
            CEvents: res.ns_nearby_events,
            likesresume: res.ns_likes_summary,
            newfolowers: res.ns_new_followers,
        });
    };

    const getuserphone = async() => {
        const res = await GetPhone_Service();
        if (res.user_phone){
            SetPhone(res.user_phone);
        }
    }

    useEffect(() => { //Get Configurations
        const location = JSON.parse(localStorage.getItem("location") as string);

        if (location.country){SetCountry(location.country)};
        if (location.city){SetCity(location.city)};
        getuseremail();
        getnotsettings();
        getuserphone();
    }, []);

    const handle_NotifUpdate = async(e: React.SyntheticEvent) => {
        e.preventDefault();

        if (JSON.stringify(old_notifications) != JSON.stringify(notifications)){
            SetDialog("Loading");
            try{
                const update = await UpdateSettings_Service(
                    notifications.receive,
                    notifications.Catalogue,
                    notifications.CEvents,
                    notifications.newfolowers,
                    notifications.likesresume
                );

                if (update){
                    SetMsg("");
                    SetDialog("Success");

                    setTimeout(() => {
                        window.location.reload();
                    }, 1000);

                } else{
                    SetMsg("Something went wrong.");
                    SetDialog("Failed");
                }

            } catch(err : any){
                SetMsg("Something went wrong.");
                SetDialog("Failed");
                console.log(err);
            }
        }
    }


    return(
        <UserHeader>
            <div className="the-container">
                <div className="Container-Settings">
                    <div className="Set-EmailPswLoc">
                        <h2> Account </h2>
                        <div>
                            <div>
                                <a> Email: {useremail} </a>
                                <button className="Change" onClick={() => {SetShowModal("UE")}}> Change </button>
                            </div>
                            <div>
                                <button className="Change_PSW" onClick={() => {SetShowModal("UPs")}}> Change Password </button>
                            </div>
                            <div>
                                <a> Location: {city}, {country} </a>
                                <button className="Change" onClick={() => {SetShowModal("ECC")}}>
                                    {city === "City" && "Add"}
                                    {city != "City" && "Change"}
                                </button>
                            </div>
                            <div>
                                <a> Phone: {phone} </a>
                                <button className="Change" onClick={() => {SetShowModal("UPh")}}>
                                    {phone === "+XX X XXXX XXXX" && "Add"}
                                    {phone != "+XX X XXXX XXXX" && "Change"}
                                </button>
                            </div>
                        </div>
                        <button className="Set-DelButton" onClick={() => {SetShowModal("DA")}}> Delete Account </button>
                    </div>

                    <hr />

                    <div className="Set-Notifications">
                        <h2> Notifications </h2>
                        <div className="Not-Forms">
                            <div>
                                <a> Receive notifications </a>
                                <label className="switch">
                                    <input
                                        type="checkbox"
                                        name="receive"
                                        checked={notifications.receive}
                                        onChange={handleChange}
                                    />
                                    <span className="slider"></span>
                                </label>
                            </div>
                            
                        </div>



                        <div className="Notif-Expand">
                            <div>
                                Events
                                <div>
                                    <a> Catalogue </a>
                                    <label className="switch">
                                        <input
                                            type="checkbox"
                                            name="Catalogue"
                                            checked={notifications.Catalogue}
                                            onChange={handleChange}
                                            disabled={!notifications.receive}
                                        />
                                        <span className="slider"></span>
                                    </label>
                                </div>
                                <div>
                                    <a> Nearby Events </a>
                                    <label className="switch">
                                        <input
                                            type="checkbox"
                                            name="CEvents"
                                            checked={notifications.CEvents}
                                            onChange={handleChange}
                                            disabled={!notifications.receive}
                                        />
                                        <span className="slider"></span>
                                    </label>
                                </div>
                            </div>

                            <div>
                                Posts - Not Implemented
                                <div>
                                    <a> New Followers </a>
                                    <label className="switch">
                                        <input
                                            type="checkbox"
                                            name="newfolowers"
                                            checked={notifications.newfolowers}
                                            onChange={handleChange}
                                            disabled={!notifications.receive}
                                        />
                                        <span className="slider"></span>
                                    </label>
                                </div>
                                <div>
                                    <a> Likes Summary </a>
                                    <label className="switch">
                                        <input
                                            type="checkbox"
                                            name="likesresume"
                                            checked={notifications.likesresume}
                                            onChange={handleChange}
                                            disabled={!notifications.receive}
                                        />
                                        <span className="slider"></span>
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div> <button onClick={handle_NotifUpdate}>Save</button> </div>
                    </div>
                </div>
            </div>

            {shomodal === "DA" && <DeleteAccount show={shomodal === "DA"} onClose={() => {SetShowModal("")}} />}
            {shomodal === "ECC" && <EditCityCountry show={shomodal === "ECC"} onClose={() => {SetShowModal("")}} />}
            {shomodal === "UE" && <UpdateEmail show={shomodal === "UE"} onClose={() => {SetShowModal("")}} />}
            {shomodal === "UPs" && <UpdatePassword show={shomodal === "UPs"} onClose={() => {SetShowModal("")}} />}
            {shomodal === "UPh" && <UpdatePhone show={shomodal === "UPh"} onClose={() => {SetShowModal("")}} />}
            <LoadingDialog modus={dialog} onClose={() => {SetDialog("")}} msg={msg}/>
        </UserHeader>
    )
}

export default Settings;