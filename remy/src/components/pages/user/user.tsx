import { useEffect } from "react";
import useUser from "../../../hooks/useUser";
import Spinner from "../../commons/spinner/spinner";
import Button from "../../input/button/button";
import "./user.css";

const User = () => {
    const [user, loading, err] = useUser();

    useEffect(() => { }, [loading])
    return (
        <div className="page-container">
            <div className="title-container">
                <h1>Il tuo profilo</h1>
            </div>
            {
                loading ? <Spinner /> : user ? <>
                    <div className="userinfo-container">
                        <div className="firstname"><h3>Nome: {user.name}</h3></div>
                        <div className="lastname"><h3>Cognome: {user.surname}</h3></div>
                        <div className="email"><h3>Email: {user.email}</h3></div>
                    </div>
                    <div className="button-container">
                        <Button buttonType="Primary" onClickCallback={() => { }} text="Log out" icon="Logout"></Button>
                    </div>
                </> : "Errore"
            }

        </div>

    );
}

export default User;