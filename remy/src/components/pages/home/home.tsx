import { useNavigate } from "react-router";
import useUser from "../../../hooks/useUser";
import Button from "../../input/button/button";
import "./home.css";

const Home = () => {
    const navigate = useNavigate();
    return (
        <div className="home-all-container">
            <div className="home-header">
                <div className="logo-container" />
                <div className="home-action-buttons-container">
                    <Button buttonType="Secondary" text="Signup" onClickCallback={() => navigate("/register")} />
                    <Button buttonType="Primary" text="Login" onClickCallback={() => navigate("/login")} />
                </div>
            </div>
            <div className="home-container">

                <div className="text-container">
                    <div className="slogan-container">
                        <h1 className="main">Make your pets <span><h1 className="main orange">eat the right way</h1></span></h1>
                    </div>
                    <div className="subtitle-container">
                        <h3 className="subtitle">Remy è il dietologo di fiducia dei tuoi animali domestici</h3>
                    </div>
                    <div className="button-container">
                        <Button buttonType="CTA" text="Inizia ora" onClickCallback={() => navigate("/register")} icon="ArrowRightSquare" />
                        <h6 className="free-label">È gratis!</h6>
                    </div>
                </div>

            </div>
            <div className="home-bg" />
        </div>

    );
}

export default Home;