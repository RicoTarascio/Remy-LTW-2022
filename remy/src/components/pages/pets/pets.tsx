import { useEffect, useState } from "react";
import { Outlet, useParams } from "react-router-dom";
import Nutrition from "../../../types/meal";
import Pet from "../../../types/pet";
import Button from "../../input/button/button";
import Card from "../../input/card/card";
import "./pets.css";

const Pets = () => {
    const [pets, setPets] = useState<Pet[]>([])

    return (
        <>
            <div className="page-container">
                <div className="title-container">
                    <div className="page-title">
                        <h1>Pets</h1>
                    </div>
                    <div className="newpet-button">
                        <Button buttonType="Secondary" onClickCallback={() => { }} text="Aggiungi pet" icon="Plus"></Button>
                    </div>
                </div>

                <div className="cards-container">
                    {
                        pets.map((pet) => {
                            return <Card pet={pet}></Card>
                        })
                    }
                </div>
            </div>
        </>

    );
}

export default Pets;