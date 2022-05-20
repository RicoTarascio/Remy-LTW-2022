import axios from "axios";
import { useEffect, useState } from "react";
import Nutrition from "../../../../types/meal";
import Pet from "../../../../types/pet";
import Spinner from "../../../commons/spinner/spinner";
import Button from "../../../input/button/button";
import "./calendarCard.css";

const CalendarCard = ({ pet, nutritionIndex, style, selectedDate }: { pet: Pet, nutritionIndex: number, style: Object, selectedDate: Date }) => {
    const meal = pet.nutritionPlans![0].meals[nutritionIndex];



    const today = new Date();
    const [mealCompletedDate, setMealCompletedDate] = useState<Date | undefined>(undefined)
    const [mealCompletedState, setMealCompletedState] = useState("");
    const [settingMealCompleted, mealIsBeingCompleted] = useState(false);

    const currentMealState = (meal: Nutrition, today: Date, selectedDate: Date) => {
        let isMealCompleted = false;
        meal.completedDates.forEach((date) => {
            const completedDate = new Date(date.when);
            if (selectedDate.getDate() === completedDate.getDate() && selectedDate.getMonth() === completedDate.getMonth() && selectedDate.getFullYear() === completedDate.getFullYear()) {
                setMealCompletedDate(completedDate)
                setMealCompletedState("done");
                isMealCompleted = true;
            }
        })
        if (isMealCompleted) return
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
        if (meal.hours === today.getHours() && meal.minutes > today.getMinutes()) {
            setMealCompletedDate(undefined)
            setMealCompletedState("not-before");
            return;
        };
        setMealCompletedDate(undefined);
        setMealCompletedState("");
        return;
    }



    const mealCompleted = () => {
        mealIsBeingCompleted(true);
        axios({
            url: "http://localhost:4000/addMealCompleted",
            method: "POST",
            data: {
                mealID: meal.id,
                when: selectedDate.toUTCString()
            },
            withCredentials: true
        }).then((res) => {
            console.log(res)
            setMealCompletedState("done")
            setMealCompletedDate(selectedDate);
            mealIsBeingCompleted(false);
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
                            mealCompletedState === "done" ? <h4 className="done-text">Completato</h4> :
                                mealCompletedState === "not-before" ? <h4 className="done-text" >Non prima delle {meal.hours + ":" + (meal.minutes < 10 ? "0" + meal.minutes : meal.minutes)}</h4> :
                                    <div className="calendar-card-button-spinner">
                                        <Button buttonType="Secondary" text="Fatto" onClickCallback={() => !settingMealCompleted ? mealCompleted() : null} icon="TickSquare" />
                                        {
                                            settingMealCompleted ? <Spinner /> : ""
                                        }
                                    </div>

                        }
                    </div>
                </div>
                <div className="calendar-card-image-container">
                    <img className="calendar-card-product-image" src="http://localhost:4000/images/product.png" />
                </div>
            </div>
        </div>
    )
}



export default CalendarCard;