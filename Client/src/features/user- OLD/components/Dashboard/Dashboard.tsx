import "./dashboard.css"
import { useState } from "react";

import nophoto from "../../assets/nophoto.webp"

const AccountResume = () => {

    const [followersnumber, SetFollowersSumber] = useState(0);
    const [followsnumber, SetFollowsSumber] = useState(0);

    const [totalcomments, SetTotalComments] = useState(0);
    const [totalphotos, SetTotalPhotos] = useState(0);

    const [favinstrument, SetFavInstrument] = useState("");
    const [favplace, SetFavPlace] = useState("");

    const [joinedin, SetJoinedIn] = useState("dd/mm/aaaa");
    const [lastconnection, SetLastConnection] = useState("dd/mm/aaaa")

    const [lastupdate, SetLastUpdate] = useState("dd/mm/aaaa mm:hh")


    return(
        <div className="Container-Setting-AR">
            <h2> Dashboard </h2>
            <div className="AR-Bests">
                <div className="BestPhoto">
                    <img src={nophoto}/>
                </div>
            </div>
            <div className="AR-Metrics">
                <div className="AR-Follows">
                    <span> Followers: {followersnumber} </span>
                    <span> Follows: {followsnumber} </span>
                </div>

                <div className="AR-Totals">
                    <span> Total Comments: {totalcomments} </span>
                    <span> Total Posts: {totalphotos} </span>
                </div>

                <div className="AR-Favoites">
                    <span> Favorite Instrument: {favinstrument} </span>
                    <span> Favorite Place: {favplace} </span>
                </div>

                <div className="AR-Historial">
                    <span> Joined in {joinedin} </span>
                    <span> Last connection: {lastconnection} </span>
                </div>
            </div>
            <div className="AR-Update-Time">
                <span>Last Update: {lastupdate}</span>
            </div>
        </div>
    );
};

export default AccountResume;