import axios from "axios";
import { useEffect, useState } from "react";
import Pet from "../../../types/pet";
import Button from "../../input/button/button";
import Card from "../../input/card/card";
import "./pets.css";

const Pets = () => {
    const [pets, setPets] = useState<Pet[]>([])
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get("http://localhost:4000/getPets", {
            params: {
                includeNutrition: true
            },
            withCredentials: true
        }).then((res) => {
            console.log(res.data);
            setPets(res.data);
            setLoading(false);
        }).catch((err) => {
            console.log(err);
        })
    }, [])

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
                {
                    loading ? "Loading..." : <div className="cards-container">
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