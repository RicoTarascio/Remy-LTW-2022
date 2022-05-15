import { useParams } from "react-router-dom";
import "./pet.css";

const Pet = () => {
    const petParams = useParams()
    return (
        <div className="petpage-container">
            <div className="petheader-container">
                <div className="back-icon">
                    <i className="ArrowLeft"></i>
                </div>
                <div className="name-container">
                    <h1>Pet {petParams.petID}</h1>
                </div>
            </div>
            <div className="info-container">
                <h3 className="pet-info">Specie:</h3>

                <h3 className="pet-info">Razza:</h3>

                <h3 className="pet-info">Età:</h3>

                <h3 className="pet-info">Peso:</h3>
            </div>
            <div className="plan-container">
                <div className="plan-title">
                    <h2>Piano nutrizionale</h2>
                </div>
                <div className="graphs">
                    <div className="graph1"></div>
                    <div className="graph2"></div>
                </div>

            </div>


        </div>
    );
}

export default Pet;