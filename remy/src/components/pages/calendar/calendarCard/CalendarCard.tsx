import { useEffect } from "react";
import Nutrition from "../../../../types/meal";
import Pet from "../../../../types/pet";
import Button from "../../../input/button/button";
import "./calendarCard.css";

const CalendarCard = ({ pet, nutritionIndex, style, selectedDate }: { pet: Pet, nutritionIndex: number, style: Object, selectedDate: Date }) => {
    const meal = pet.nutritionPlans[0].meals[nutritionIndex];

    const today = new Date();
    const mealState = currentMealState(meal, today, selectedDate);

    return (
        <div className={"calendar-card-container " + mealState} style={style}>
            <div className="content-container">
                <div className="calendar-card-text-container">
                    <h4 className="calendar-card-pet-name">{pet.name}</h4>
                    <h3 className="product-name">{meal.Product.name}</h3>
                    <h2 className="product-quantity">{meal.quantity}g</h2>
                    <div className="done-container">
                        {
                            mealState === "done" ? <h4 className="done-text">Fatto alle {meal.doneAt!.getHours() + ":" + meal.doneAt!.getMinutes()} del {meal.doneAt!.getDate() + "/" + meal.doneAt!.getMonth() + 1}</h4> :
                                mealState === "not-before" ? <h4 className="done-text" >Non prima delle {meal.hours + ":" + meal.minutes}</h4> :
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

const currentMealState = (meal: Nutrition, today: Date, selectedDate: Date) => {
    if (meal.doneAt) return "done";
    if (selectedDate.getDate() > today.getDate()) return "not-before";
    if (selectedDate.getDate() < today.getDate()) return ""
    if (meal.hours > today.getHours()) return "not-before";
    if (meal.hours === today.getHours() && meal.minutes < today.getMinutes()) return "not-before";
    return ""
}

export default CalendarCard;