import axios from "axios";
import { useEffect, useState } from "react";
import Nutrition from "../../../../types/meal";
import Pet from "../../../../types/pet";
import Button from "../../../input/button/button";
import "./calendarCard.css";

const CalendarCard = ({ pet, nutritionIndex, style, selectedDate }: { pet: Pet, nutritionIndex: number, style: Object, selectedDate: Date }) => {
    const meal = pet.nutritionPlans[0].meals[nutritionIndex];



    const today = new Date();
    const [mealCompletedDate, setMealCompletedDate] = useState<Date | undefined>(undefined)
    const [mealCompletedState, setMealCompletedState] = useState("");

    const currentMealState = (meal: Nutrition, today: Date, selectedDate: Date) => {
        meal.completedDates.forEach((date) => {
            const completedDate = new Date(date.when);
            if (selectedDate.getDate() === completedDate.getDate() && selectedDate.getMonth() === completedDate.getMonth() && selectedDate.getFullYear() === completedDate.getFullYear()) {
                setMealCompletedDate(completedDate)
                setMealCompletedState("done");
                return;
            }
        })
        if (selectedDate.getDate() > today.getDate()) {
            setMealCompletedDate(undefined)
            setMealCompletedState("not-before");
            return;
        };
        if (selectedDate.getDate() < today.getDate()) {
            setMealCompletedDate(undefined)
            setMealCompletedState("");
            return;
        }
        if (meal.hours > today.getHours()) {
            setMealCompletedDate(undefined)
            setMealCompletedState("not-before");
            return;
        };
        if (meal.hours === today.getHours() && meal.minutes < today.getMinutes()) {
            setMealCompletedDate(undefined)
            setMealCompletedState("not-before");
            return;
        };
        setMealCompletedDate(undefined);
        setMealCompletedState("");
        return;
    }



    const mealCompleted = () => {
        axios.post("http://localhost:4000/mealCompleted", {
            id: meal.id,
            when: selectedDate.toUTCString()
        }).then(() => {
            setMealCompletedState("done")
            setMealCompletedDate(selectedDate);
        })
    }

    useEffect(() => {
        currentMealState(meal, today, selectedDate);
    }, [])

    return (
        <div className={"calendar-card-container " + mealCompletedState} style={style}>
            <div className="content-container">
                <div className="calendar-card-text-container">
                    <h4 className="calendar-card-pet-name">{pet.name}</h4>
                    <h3 className="product-name">{meal.Product.name}</h3>
                    <h2 className="product-quantity">{meal.quantity}g</h2>
                    <div className="done-container">
                        {
                            mealCompletedState === "done" ? <h4 className="done-text">Fatto alle {mealCompletedDate!.getHours() + ":" + mealCompletedDate!.getMinutes()} del {mealCompletedDate!.getDate() + "/" + mealCompletedDate!.getMonth() + 1}</h4> :
                                mealCompletedState === "not-before" ? <h4 className="done-text" >Non prima delle {meal.hours + ":" + meal.minutes}</h4> :
                                    <Button buttonType="Secondary" text="Fatto" onClickCallback={() => mealCompleted()} icon="TickSquare" />
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



export default CalendarCard;