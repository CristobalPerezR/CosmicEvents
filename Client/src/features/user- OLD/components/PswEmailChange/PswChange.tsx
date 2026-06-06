import { useState } from "react";

import "./emailapswchange.css"


const PswChange = () => {
    const [currentpsw, SetCurrentPsw] = useState("");
    const [newpsw, SetNewPsw] = useState("");
    const [connewpsw, SetConNewPsw] = useState("");

    return(
        <div className="Container-Setting-PswC">
            <h2>Password Change</h2>
            <div className="PswC-Form">
                <div>
                    <div>
                        <label>Current Password: </label>
                        <label>New Password: </label>
                        <label>Confirm New Password: </label>
                    </div>
                    <div>
                        <input
                        type="password"
                        placeholder="Current Password"
                        value={currentpsw}
                        onChange={(e) => SetCurrentPsw(e.target.value)}
                        />
                        <input
                        type="password"
                        placeholder="New Password"
                        value={newpsw}
                        onChange={(e) => SetNewPsw(e.target.value)}
                        />
                        <input
                        type="password"
                        placeholder="Confirm New Password"
                        value={connewpsw}
                        onChange={(e) => SetConNewPsw(e.target.value)}
                        />
                    </div>
                </div>
                <div className="div-button">
                    <button type="submit" className="PswC-Button">
                        Confirm
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PswChange;