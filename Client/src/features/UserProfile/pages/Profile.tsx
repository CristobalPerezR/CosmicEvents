import "./profile.css"
import DefaultPhoto from "../assets/perfil_default.png"
import ChangePhoto from "../assets/changephoto.png"
import { useEffect, useState } from "react";
import UserHeader from "../../Shared/userHeader/UserHeader";
import { Gear, GearFill, Pen, PenFill } from "react-bootstrap-icons";
import { PersonAdd, PersonFillAdd, PersonDash, PersonFillDash } from "react-bootstrap-icons";
import { Floppy, FloppyFill } from "react-bootstrap-icons";
import { useNavigate, useParams } from "react-router-dom";

import { useAuth, type User } from "../../../context/AuthContext";

import LoadingDialog from "../../Shared/components/LoadingDialog";
import { UpdateDisplayname_Service } from "../services/UserServices";


const Profile = () => {
    const { user, location, login} = useAuth();
    const { userlink } = useParams<{ userlink: string }>();
    const own_user = user?.username === userlink;
    const [dialog, setDialog] = useState("");
    const [msg, setMsg] = useState("");


    const [displayname, setDisplayName] = useState("Display name");
    const [username, setUsername] = useState("Username");
    const [country, setCountry] = useState("??");
    const [imageurl, setImageUrl] = useState(DefaultPhoto);

    const [copydisplayname, setCopyDisplayname] = useState("");
    const [copyimageurl, setCopyImageUrl] = useState("");

    const [nposts, setNPosts] = useState(0);
    const [nfollows, setNFollows] = useState(0);
    const [nfollowers, setNFollowers] = useState(0);

    const [editicon, setEditIcon] = useState(true);
    const [settingicon, setSettingIcon] = useState(true);

    const [followed, setFollowed] = useState(false);

    const [editstate, setEditState] = useState(false);

    useEffect(() => {
        if (own_user){
            const user = JSON.parse(localStorage.getItem("user") as string);
            const location = JSON.parse(localStorage.getItem("location") as string);

            setDisplayName(user.display_user);
            setCopyDisplayname(user.display_user);
            setUsername(user.username);
            if (user.profile_image){setImageUrl(user.profile_image)}
            setCopyImageUrl(imageurl);
            if (location.country_sig){setCountry(location.country_sig)}   
        } else{

        }
    }, [own_user]);

    const navigate = useNavigate();

    const handleFollow = () => {}

    const handleUnfollow = () => {}

    const handleSaveChanges = async() => {
        if (imageurl === copyimageurl && displayname === copydisplayname){
            setEditState(false)
            return;
        }
        setDialog("Loading");
        try{
            const update = await UpdateDisplayname_Service(displayname);

            if (update){
                setMsg("");
                setDialog("Success");

                const updateUser: User = {
                    ...user!,
                    display_user: displayname,
                    profile_image: imageurl
                }

                login(updateUser, location, localStorage.getItem('cosmic_token')!);

                setTimeout(() => {
                    setEditState(false);
                    setDialog("");
                }, 600);

            } else{
                setMsg("Something went wrong.");
                setDialog("Failed");
            }

        } catch(err : any){
            setMsg("Something went wrong.");
            setDialog("Failed");
            console.log(err);
        }
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
                                    onChange={(e) => {setDisplayName(e.target.value)}}
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
                        {own_user && !editstate && <button onClick={() => {setEditState(!editstate)}} onMouseDown={() => {setEditIcon(false)}} onMouseUp={() => {setEditIcon(true)}}> 
                            {editicon && <Pen></Pen> }
                            {!editicon && <PenFill></PenFill> }
                            <label> Edit Profile </label>
                        </button>}

                        {own_user && editstate && <button onClick={handleSaveChanges} onMouseDown={() => {setEditIcon(false)}} onMouseUp={() => {setEditIcon(true)}}> 
                            {editicon && <Floppy></Floppy> }
                            {!editicon && <FloppyFill></FloppyFill> }
                            <label> Save </label>
                        </button>}

                        {own_user && <button onClick={() => {navigate(`/profile/${JSON.parse(localStorage.getItem("user") as string).username}/settings`)}} onMouseDown={() => {setSettingIcon(false)}} onMouseUp={() => {setSettingIcon(true)}}>
                            {settingicon && <Gear></Gear>}
                            {!settingicon && <GearFill></GearFill>}
                            <label> Settings </label>
                        </button>}


                        {!own_user && !followed && <button onClick={handleFollow} onMouseDown={() => {setEditIcon(false)}} onMouseUp={() => {setEditIcon(true)}}> 
                            {editicon && <PersonAdd></PersonAdd> }
                            {!editicon && <PersonFillAdd></PersonFillAdd> }
                            <label> Follow </label>
                        </button>}

                        {!own_user && followed && <button onClick={handleUnfollow} onMouseDown={() => {setEditIcon(false)}} onMouseUp={() => {setEditIcon(true)}}> 
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
            <LoadingDialog modus={dialog} onClose={() => setDialog("")} msg={msg} />
        </UserHeader>
    );
};

export default Profile;