import axios from "axios";
import { useEffect, useState } from "react";
import Pet from "../../../types/pet";
import PawLoading from "../../commons/pawLoading/pawLoading";
import AddPetModal from "../../input/addPetModal/addPetModal";
import Button from "../../input/button/button";
import Card from "../../input/card/card";
import "./pets.css";

const Pets = () => {
    const [pets, setPets] = useState<Pet[]>([])
    const [loading, setLoading] = useState(true);
    const [showAddPet, setShowAddPet] = useState(false);

    useEffect(() => {
        axios.get("http://localhost:4000/getPets", {
            params: {
                includeNutrition: true
            },
            withCredentials: true
        }).then((res) => {
            setPets(res.data);
            setLoading(false);
        }).catch((err) => {
            console.error(err);
        })
    }, [showAddPet])


    return (
        <>
            <AddPetModal open={showAddPet} handleClose={() => setShowAddPet(false)} />
            <div className="page-container">
                <div className="title-container">
                    <div className="page-title">
                        <h1>Pets</h1>
                    </div>
                    <div className="newpet-button">
                        <Button buttonType="Secondary" onClickCallback={() => { if (!showAddPet) setShowAddPet(true) }} text="Aggiungi pet" icon="Plus"></Button>
                    </div>
                </div>
                {
                    loading ? <PawLoading /> : <div className="cards-container">
                        {
                            pets.map((pet, i) => {
                                return <Card pet={pet} key={i}></Card>
                            })
                        }
                    </div>
                }

            </div>
        </>
    );
}

export default Pets;