import axios from "axios";
import { useEffect, useState } from "react";
import { User } from "../../../types/user";
import Button from "../../input/button/button";
import "./user.css";

const UserProfile = () => {
    const [user, setUser] = useState<User>()
    const [loadingUserInfo, setLoading] = useState(true);



    useEffect(() => {
        axios.get("http://localhost:4000/getUser", {
            withCredentials: true
        }).then(res => {
            setUser(res.data)
            setLoading(false);
        })
    }, [])
    return (
        <div className="page-container">
            {
                loadingUserInfo ? <>
                    <h1 className="profile-title">Il tuo profilo</h1>
                    <div className="profile-loading-scheleton" />
                </> : user ? <>
                    <div className="profile-top-container">
                        <h1 className="profile-title">Il tuo profilo</h1>
                        <Button buttonType="Secondary" onClickCallback={() => { }} text="Log out" icon="Logout"></Button>
                    </div>
                    <div className="profile-info-container">
                        <div className="profile-info">
                            <div className="labels">
                                <h3 className="profile-label">Nome:</h3>
                                <h3 className="profile-label">Cognome:</h3>
                                <h3 className="profile-label">Email:</h3>
                            </div>
                            <div className="texts">
                                <h3 className="profile-text">{user.name}</h3>
                                <h3 className="profile-text">{user.surname}</h3>
                                <h3 className="profile-text">{user.email}</h3>
                            </div>
                        </div>
                        <Button buttonType="Secondary" onClickCallback={() => { }} text="Modifica" icon="Edit"></Button>
                    </div>
                </> : "Errore"
            }

        </div>

    );
}

export default UserProfile;