import "./home.css";

const Home = () => {
    return (
        <div className="home-container">
            
            <div className="top">
                <div className="logo-container">
                    <h1>Home</h1>
                </div>
            </div>
            
            <div className="text-container">
                <div className="slogan-container-1">
                    <h1>Make your pets</h1>
                </div>
                <div className="slogan-container-2">
                    <h1>eat the right way</h1>
                </div>
                <div className="subtitle-container">
                    <h3>Remy è il dietologo di fiducia dei tuoi animali domestici</h3>
                </div>
                <div className="button-container">
                    <button>Start now</button>
                    <span></span>
                    <h6>It's free!</h6>
                </div>
            </div>

            
            
        </div>
    );
}

export default Home;