import { useEffect, useState } from "react";
import UserHeader from "../../Shared/userHeader/UserHeader";
import "./settings.css"


const Settings = () =>{

    const [notifications, setNotifications] = useState({
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

    useEffect(() => { //Get Configurations

    }, []);

    const handle_NotifUpdate = () => {}

    const handle_LocUpdate = () => {

    }

    return(
        <UserHeader>
            <div className="the-container">
                <div className="Container-Settings">
                    <div className="Set-EmailPswLoc">
                        <h2> Account </h2>
                        <div>
                            <div>
                                <a> Email: {"xxxx@xxxx.cl"} </a>
                                <button disabled={true}> Change </button>
                            </div>
                            <div>
                                <button disabled={true}> Change Password </button>
                            </div>
                            <div>
                                <a> Location: {"City"}, {"Country"} </a>
                                <button onClick={handle_LocUpdate}> Change </button>
                            </div>
                        </div>
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
                        <div> <button>Save</button> </div>
                    </div>
                </div>
            </div>
        </UserHeader>
    )
}

export default Settings;