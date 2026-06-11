import "./profile.css"
import DefaultPhoto from "../assets/perfil_default.png"
import ChangePhoto from "../assets/changephoto.png"
import { useEffect, useState } from "react";
import UserHeader from "../../Shared/userHeader/UserHeader";
import { Gear, GearFill, Pen, PenFill } from "react-bootstrap-icons";
import { PersonAdd, PersonFillAdd, PersonDash, PersonFillDash } from "react-bootstrap-icons";
import { Floppy, FloppyFill } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";


const Profile = () => {

    const [displayname, SetDisplayName] = useState("Display name");
    const [username, SetUsername] = useState("Username");
    const [country, SetCountry] = useState("??");
    const [imageurl, SetImageUrl] = useState(DefaultPhoto);

    const [nposts, SetNPosts] = useState(0);
    const [nfollows, SetNFollows] = useState(0);
    const [nfollowers, SetNFollowers] = useState(0);

    const [editicon, SetEditIcon] = useState(true);
    const [settingicon, SetSettingIcon] = useState(true);

    const [own_user, SetOwn_User] = useState(true);
    const [followed, SetFollowed] = useState(false);

    const [editstate, SetEditState] = useState(false);

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user") as string);
        const location = JSON.parse(localStorage.getItem("location") as string);

        SetDisplayName(user.display_user);
        SetUsername(user.username);
        if (user.profile_image){SetImageUrl(user.profile_image)}
        if (location.country_sig){SetCountry(location.country_sig)}
    }, []);

    const navigate = useNavigate();
    const handleEdit = () => {
        SetEditState(false);
    }

    const handleSetting = () => {
        navigate("/profile/settings");
    }

    const handleFollow = () => {

    }

    const handleUnfollow = () => {

    }

    return(
        <UserHeader>
            <div className="the-container">
                <div className="Container-UserInfo">
                    <div className="UI-Perfil">
                        <div className="UI-Perfil-Image">
                            <img className="Image-Perfil" src={imageurl}/>
                            {editstate && <img className="Change-Photo" src={ChangePhoto}/>}
                        </div>
                        <div className="UI-Perfil-Name">
                            <div> {country} -
                                {!editstate && ` ${displayname}`} 
                                {editstate && 
                                <input
                                    type="text"
                                    value={displayname}
                                />}
                            </div>
                            <div> @{username} </div>
                            <div>
                                <div>Posts: {nposts}</div>
                                <div>Followers: {nfollowers}</div>
                                <div>Follows: {nfollows}</div>
                            </div>
                        </div>
                    </div>

                    <div className="UI-Buttons">
                        {own_user && !editstate && <button onClick={() => {SetEditState(!editstate)}} onMouseDown={() => {SetEditIcon(false)}} onMouseUp={() => {SetEditIcon(true)}}> 
                            {editicon && <Pen></Pen> }
                            {!editicon && <PenFill></PenFill> }
                            <label> Edit Profile </label>
                        </button>}

                        {own_user && editstate && <button onClick={handleEdit} onMouseDown={() => {SetEditIcon(false)}} onMouseUp={() => {SetEditIcon(true)}}> 
                            {editicon && <Floppy></Floppy> }
                            {!editicon && <FloppyFill></FloppyFill> }
                            <label> Save </label>
                        </button>}

                        {own_user && <button onClick={handleSetting} onMouseDown={() => {SetSettingIcon(false)}} onMouseUp={() => {SetSettingIcon(true)}}>
                            {settingicon && <Gear></Gear>}
                            {!settingicon && <GearFill></GearFill>}
                            <label> Settings </label>
                        </button>}


                        {!own_user && !followed && <button onClick={handleFollow} onMouseDown={() => {SetEditIcon(false)}} onMouseUp={() => {SetEditIcon(true)}}> 
                            {editicon && <PersonAdd></PersonAdd> }
                            {!editicon && <PersonFillAdd></PersonFillAdd> }
                            <label> Follow </label>
                        </button>}

                        {!own_user && followed && <button onClick={handleUnfollow} onMouseDown={() => {SetEditIcon(false)}} onMouseUp={() => {SetEditIcon(true)}}> 
                            {editicon && <PersonDash></PersonDash> }
                            {!editicon && <PersonFillDash></PersonFillDash> }
                            <label> Unfollow </label>
                        </button>}

                        {!own_user && <button disabled>
                            <label> -Not Implemented- </label>
                        </button>}
                    </div>

                    <hr />

                    <div className="UI-Posts">
                        -Posts Preview not implemented yet.-
                    </div>
                </div>
            </div>
        </UserHeader>
    );
};

export default Profile;