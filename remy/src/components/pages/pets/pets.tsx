import Card from "../../input/card/card";
import "./pets.css";

const Pets = () => {
    const pets = [
        {
            name: "Maya",
            breed: "German Shepard",
            type: "Dog",
            nutrition: {
                nextMeal: "Royal Canin Max Adult - 100g",
                when: "3 hours"
            }
        },
        {
            name: "Lucas",
            breed: "American Bulldog",
            type: "Dog",
            nutrition: {
                nextMeal: "Royal Canin Max Junior - 100g",
                when: "1 hour"
            }
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
                            return <Card type={pet.type} breed={pet.breed} name={pet.name} nutrition={pet.nutrition}></Card>
                        })
                    }
                </div>
            </div>
            
            
            
            
        </>
    );
}

export default Pets;