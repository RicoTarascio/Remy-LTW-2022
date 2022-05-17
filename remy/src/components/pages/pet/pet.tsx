import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./pet.css";
import Pet from "../../../types/pet";
import Button from "../../input/button/button";

const PetComponent = () => {
    const navigate = useNavigate();
    const petParams = useParams()
    const [pet, setPet] = useState<Pet>();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get("http://localhost:4000/getPet", {
            withCredentials: true,
            params: {
                includeNutrition: true,
                petID: petParams.petID
            },
        }).then(res => {
            console.log(res.data[0])
            setPet(res.data[0]);
            setLoading(false);
        })
    }, [])

    return (
        <>
            {
                loading ? <div>Loading...</div> : <div className="page-container">
                    <div className="petheader-container">
                        <div className="back-icon">
                            <i className="ArrowLeft" onClick={() => navigate("/pets")}></i>
                        </div>
                        <div className="name-container">
                            <h1 className="title">{pet!.name}</h1>
                        </div>
                    </div>
                    <div className="info-container">
                        <div className="pet-info">
                            <h3>{pet!.species}</h3>
                        </div>
                        <div className="pet-info">
                            <h3>{pet!.breed}</h3>
                        </div>
                        <div className="pet-info">
                            <h3>{pet!.age} anni</h3>
                        </div>
                        <div className="pet-info">
                            <h3>{pet!.weight} Kg</h3>
                        </div>                        
                    </div>
                    <div className="plan-container">
                        <div className="plan-title">
                            <h3>Piano nutrizionale</h3>
                        </div>
                        <div className="graphs">
                            <div className="graph1">
                                <h3 className="graph-title">Nutrienti</h3>
                                <h3></h3>
                            </div>
                            <div className="graph2">
                                <h3 className="graph-title">Prossimo pasto</h3>
                            </div>
                        </div>

                    </div>
                </div>
            }
        </>
    );
}

export default PetComponent;