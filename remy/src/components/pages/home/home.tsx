import { useNavigate } from "react-router";
import useUser from "../../../hooks/useUser";
import "./home.css";

const Home = () => {
    const [user, loading, err] = useUser();
    const navigate = useNavigate();
    return (
        <div className="home-container">
            <div className="top">
                <div className="logo-container">
                    <h1>Home</h1>
                </div>
            </div>
            {
                loading ? <p>Caricando le informazioni sull'utente...</p> :
                    user ? <div><h3>Bentornato {user.name}!</h3></div> :
                        ""
            }
            <div className="text-container">
                <div className="slogan-container">
                    <h1 className="main">Make your pets <span><h1 className="main orange">eat the right way</h1></span></h1>
                </div>
                <div className="subtitle-container">
                    <h3>Remy è il dietologo di fiducia dei tuoi animali domestici</h3>
                </div>
                <div className="button-container">
                    <button onClick={() => { navigate("login") }}>Start now</button>
                    <h6 className="free-label">It's free!</h6>
                </div>
            </div>
        </div>
    );
}

export default Home;