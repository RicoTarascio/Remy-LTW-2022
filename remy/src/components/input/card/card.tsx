import "./card.css";
import Pet from "../../../types/pet";
import { useNavigate } from "react-router-dom";


const Card = ({ pet }: { pet: Pet }) => {
    const navigate = useNavigate();


    const getPetNextMeal = (pet: Pet) => {
        if (!pet) return;

        const today = new Date();

        const nextMeal = pet.nutritionPlans?.[0]?.meals.find(meal => {
            if (meal.weekDay === today.getDay() && meal.hours > today.getHours()) return meal;
            else if (meal.hours === today.getHours() && meal.minutes > today.getMinutes()) return meal;
        })

        if (!nextMeal) {
            let differentDayMeal;
            let minDayFound = 6;
            pet.nutritionPlans?.[0]?.meals.forEach(meal => {
                if (meal.weekDay > today.getDay() && meal.weekDay < minDayFound) {
                    differentDayMeal = meal
                    minDayFound = meal.weekDay
                }
            })
            console.log(differentDayMeal)
            return differentDayMeal;
        }

        return nextMeal;
    }

    const nextMeal = getPetNextMeal(pet)

    return (
        <div className="card-container" onClick={() => { navigate("/pets/" + pet.id) }}>
            <div className="card-header">
                <div className="pet-name">
                    <h2 className="htext">{pet.name}</h2>
                </div>
                <div className="pet-species">
                    <h4 className="htext">{pet.species}</h4>
                </div>
            </div>
            <div className="card-body">
                <h4 className="card-body-info">{pet.breed}</h4>
                <div className="pet-age-weight">
                    <h4 className="card-body-info">{pet.age} anni</h4>
                    <h4 className="card-body-info">{pet.weight} Kg</h4>
                </div>
                <div className="pet-nutrition">
                    <div className="nutrition-info">
                        <h5 className="n-row1">Devo mangiare fra</h5>
                        <h3 className="n-row2">{nextMeal!.hours - new Date().getHours()} ore</h3>
                        <h5 className="n-row3">{nextMeal?.Product.name} - {nextMeal?.quantity}g</h5>
                    </div>
                </div>
                <div className="arrow-icon">
                    <i className="ArrowRightSquare" />
                </div>
            </div>

        </div>
    );

}

export default Card;