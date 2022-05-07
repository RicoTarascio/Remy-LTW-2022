import Nutrition from "../../../types/nutrition";
import Card from "../../input/card/card";
import "./pets.css";

const Pets = () => {
    const pets = [
        {
            name: "Maya",
            breed: "German Shepard",
            species: "Dog",

            meals: [{
                productName: "Royal Canin Max Adult - 100g", hours: 18, minutes: 30, quantity: 200, productImage: "", weekDay: 6,
            }]

        },
        {
            name: "Lucas",
            breed: "American Bulldog",
            species: "Dog",
            meals: [{
                productName: "Royal Canin Max Junior - 100g", hours: 18, minutes: 30, quantity: 200, productImage: "", weekDay: 6,
            }]

        }];

    return (
        <>
            <div className="page-container">
                <div className="page-title">
                    <h1>Pets</h1>
                </div>
                <div className="cards-container">
                    {
                        pets.map((pet) => {
                            return <Card species={pet.species} breed={pet.breed} name={pet.name} meals={pet.meals}></Card>
                        })
                    }
                </div>
            </div>




        </>
    );
}

export default Pets;