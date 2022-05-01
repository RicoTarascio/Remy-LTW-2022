import "./pets.css";

const Pets = () => {
    const pets = [
        {
            name: "Maya",
            breed: "German Shepard",
            type: "Dog",
            nutrition: {
                nextMeal: "Royal Canin Max Adult - 100g",
                when: "3h"
            }
        },
        {
            name: "Lucas",
            breed: "American Bulldog",
            type: "Dog",
            nutrition: {
                nextMeal: "Royal Canin Max Junior - 100g",
                when: "1h"
            }
        }];

    return (
        <>
            <h1>Pets</h1>
            {
                pets.map((pet) => {
                    return <h1 key={pet.name}>{pet.name}</h1>
                })
            }
        </>
    );
}

export default Pets;