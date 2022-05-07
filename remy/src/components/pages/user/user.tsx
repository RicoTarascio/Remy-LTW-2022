import Button from "../../input/button/button";
import "./user.css";

const User = ()=>{
    return(
        <div className="page-container">
            <div className="title-container">
                <h1>Il tuo profilo</h1>
            </div>
            <div className="userinfo-container">
                <div className="firstname"><h3>Nome:</h3></div>
                <div className="lastname"><h3>Cognome:</h3></div>
                <div className="email"><h3>Email:</h3></div>
            </div>
            <div className="button-container">
                <Button buttonType="Primary" onClickCallback={()=>{}} text="Log out" icon="Logout"></Button>
            </div>
        </div>
        
    );
}

export default User;