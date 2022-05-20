import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./pet.css";
import Pet from "../../../types/pet";
import Meal, { MealCompleted } from "../../../types/meal";
import PawLoading from "../../commons/pawLoading/pawLoading";
import Button from "../../input/button/button";

const PetComponent = () => {
    const navigate = useNavigate();
    const petParams = useParams()
    const [pet, setPet] = useState<Pet>();
    const [loading, setLoading] = useState(true);
    const [nextMeal, setNextMeal] = useState<Meal | undefined>()
    const [lastMeal, setLastMeal] = useState<Meal | undefined>()

    useEffect(() => {
        axios.get("http://localhost:4000/getPet", {
            withCredentials: true,
            params: {
                includeNutrition: true,
                petID: petParams.petID
            },
        }).then(res => {
            const pet = res.data[0]
            setPet(pet);
            setNextMeal(getPetNextMeal(pet))
            setLastMeal(getPetLastMeal(pet))
            setLoading(false);
        })
    }, [])


    const getPetNextMeal = (pet: Pet) => {
        if (!pet) return;

        const today = new Date();

        const nextMeal = pet.nutritionPlans?.[0]?.meals.find(meal => {
            if (meal.weekDay === today.getDay() && meal.hours > today.getHours()) return meal;
            else if (meal.weekDay === today.getDay() && meal.hours === today.getHours() && meal.minutes > today.getMinutes()) return meal;
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

    const getPetLastMeal = (pet: Pet) => {
        if (!pet) return;

        const meals = pet.nutritionPlans?.[0]?.meals.filter((meal) => meal.completedDates.length)
        meals?.forEach(meal => {
            meal.completedDates.sort((mealCompletedA, mealCompletedB) => sortMealCompletedDates(mealCompletedA, mealCompletedB))
        })
        meals?.sort((mealA, mealB) => sortMealCompletedDates(mealA.completedDates[0], mealB.completedDates[0]))
        return meals ? meals[0] : undefined
    }

    const sortMealCompletedDates = (mealCompletedA: MealCompleted, mealCompletedB: MealCompleted) => {
        const dateA = new Date(mealCompletedA.when);
        const dateB = new Date(mealCompletedB.when);
        if (dateA.getTime() < dateB.getTime()) return 1
        return -1;
    }

    return (
        <>
            {
                loading ? <PawLoading /> : <div className="page-container">
                    <div className="petheader">
                        <div className="petheader-container">
                            <div className="back-icon">
                                <i className="ArrowLeft" onClick={() => navigate("/pets")}></i>
                            </div>
                            <div className="name-container">
                                <h1 className="title">{pet!.name}</h1>
                            </div>
                        </div>
                        <div className="btn-container">
                            <Button buttonType="Secondary" onClickCallback={()=>{}} text="Elimina pet" icon="Delete"></Button>
                        </div>
                    </div>
                    
                    <div className="info-container">
                        <div className="pet-info">
                            {pet!.species}
                        </div>
                        <div className="pet-info">
                            {pet!.breed}
                        </div>
                        <div className="pet-info">
                            {pet!.age} anni
                        </div>
                        <div className="pet-info">
                            {pet!.weight} Kg
                        </div>
                    </div>
                    <div className="plan-container">
                        <h3 className="plan-title"> Piano nutrizionale</h3>
                        <div className="graphs">
                            <div className="nutrition-graph">
                                <h3 className="graph-title">Nutrienti</h3>
                                <div className="stats-container">
                                    <div className="stat">
                                        <h4 className="stat-label">Carboidrati</h4>
                                        <div className="indicator carbs">
                                            49%
                                        </div>
                                    </div>
                                    <div className="stat">
                                        <h4 className="stat-label">Proteine</h4>
                                        <div className="indicator proteins">
                                            30%
                                        </div>
                                    </div>
                                    <div className="stat">
                                        <h4 className="stat-label">Grassi</h4>
                                        <div className="indicator fats">
                                            21%
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {
                                nextMeal ? <div className="meal-card next-meal">
                                    <div className="meal-card-header">
                                        <h4 className="meal-card-when next-meal-when">{nextMeal.hours < 10 ? "0" + nextMeal.hours : nextMeal.hours}:{nextMeal.minutes < 10 ? "0" + nextMeal.minutes : nextMeal.minutes}</h4>
                                        <h3 className="meal-card-title next-meal-title">Prossimo pasto</h3>
                                    </div>

                                    <div className="meal-card-product-info">
                                        <h3 className="meal-card-product-name">{nextMeal.Product.name}</h3>
                                        <h3 className="meal-card-product-quantity">{nextMeal.quantity}g</h3>
                                        <div className="product-image-container">
                                            <img className="meal-card-product-image" src="http://localhost:4000/images/product.png" />
                                        </div>
                                    </div>
                                </div> : null
                            }


                            <div className="meal-card last-meal">
                                <div className="meal-card-header">
                                    <h4 className="meal-card-when last-meal-when">{new Date(lastMeal!.completedDates[0].when).getDate()} / {new Date(lastMeal!.completedDates[0].when).getMonth()} / {new Date(lastMeal!.completedDates[0].when).getFullYear()}</h4>
                                    <h3 className="meal-card-title last-meal-title">Ultimo pasto</h3>
                                </div>

                                <div className="meal-card-product-info">
                                    <h3 className="meal-card-product-name">{lastMeal?.Product.name}</h3>
                                    <h3 className="meal-card-product-quantity">{lastMeal?.quantity}g</h3>
                                    <div className="product-image-container">
                                        <img className="meal-card-product-image" src="http://localhost:4000/images/product.png" />
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            }
        </>


    );


}

export default PetComponent;