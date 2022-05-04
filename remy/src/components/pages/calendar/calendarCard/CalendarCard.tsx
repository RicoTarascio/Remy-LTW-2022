import Nutrition from "../../../../types/nutrition";
import Pet from "../../../../types/pet";
import Button from "../../../input/button/button";
import "./calendarCard.css";

const CalendarCard = ({ pet, nutritionIndex, style }: { pet: Pet, nutritionIndex: number, style: Object }) => {
    const nutrition = pet.meals[nutritionIndex];

    const today = new Date();
    const mealState = currentMealState(nutrition, today);

    return (
        <div className={"calendar-card-container " + mealState} style={style}>
            <div className="content-container">
                <div className="calendar-card-text-container">
                    <h4 className="calendar-card-pet-name">{pet.name}</h4>
                    <h3 className="product-name">{nutrition.productName}</h3>
                    <h2 className="product-quantity">{nutrition.quantity}g</h2>
                    <div className="done-container">
                        {
                            mealState === "done" ? <h4 className="done-text">Fatto alle ${nutrition.doneAt!.getHours() + ":" + nutrition.doneAt!.getMinutes()}</h4> :
                                mealState === "not-before" ? <h4 className="done-text" >Non prima delle {nutrition.when.getHours() + ":" + nutrition.when.getMinutes()}</h4> :
                                    <Button buttonType="Secondary" text="Fatto" onClickCallback={() => console.log("Done")} icon="TickSquare" />
                        }
                    </div>
                </div>
                <div className="image-container">
                    <div className="product-image"></div>
                </div>
            </div>
        </div>
    )
}

const currentMealState = (meal: Nutrition, today: Date) => {
    if (meal.doneAt) return "done";
    const todayWithMonthAdj = new Date(today.getFullYear(), today.getMonth() + 1, today.getDate(), today.getHours(), today.getMinutes(), today.getSeconds())
    if (meal.when.getTime() > todayWithMonthAdj.getTime()) return "not-before"
    return ""
    // if (meal.when.getDate() < )
    // if (meal.when.getHours() > today.getHours()) return "not-before"
    // if (meal.when.getHours() === today.getHours()) {
    //     if (meal.when.getMinutes() > today.getMinutes()) return "not-before"
    // }
    // return "";
}

export default CalendarCard;