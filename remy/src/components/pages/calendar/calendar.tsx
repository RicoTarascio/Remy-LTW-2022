import axios, { AxiosError, AxiosResponse } from "axios";
import { useEffect, useRef, useState } from "react";
import Pet from "../../../types/pet";
import PawLoading from "../../commons/pawLoading/pawLoading";
import "./calendar.css"
import CalendarCard from "./calendarCard/CalendarCard";
const hours = ["8:00", "9:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00"]
const Calendar = () => {
    const weekDays = ["Domenica", "Lunedì", "Martedì", "Mercoledì", "Giovedì", "Venerdì", "Sabato"];

    const [selectedDate, selectDate] = useState(new Date());
    const calendarRef = useRef<HTMLDivElement>(null)
    const [loadingPets, setLoadingPets] = useState(true);
    const [petsWithNutrition, setPetsWithNutrition] = useState<Pet[]>([]);

    const nutritionGridStyle = {
        width: '100%',
        height: '100%',
        gridTemplateRows: `repeat(${petsWithNutrition.length}, minmax(0, 1fr))`,
        gap: "32px"
    };

    const setNextDate = () => {
        selectDate(new Date(selectedDate.getTime() + 24 * 60 * 60 * 1000));
    }

    const setPrevDate = () => {
        selectDate(new Date(selectedDate.getTime() - 24 * 60 * 60 * 1000));
    }

    useEffect(() => {
        axios.get("http://localhost:4000/getPets", {
            params: {
                includeNutrition: true
            },
            withCredentials: true
        }).then((res) => {
            setPetsWithNutrition(res.data as Pet[]);
            setLoadingPets(false);
        }).catch(err => {
            const errAxios = err as AxiosError;
            console.log(errAxios)
        })
    }, [])

    useEffect(() => {
        const leftOffset = calcOffset(selectedDate.getHours(), selectedDate.getMinutes(), 86);
        if (calendarRef) calendarRef.current?.scrollTo({ left: leftOffset - (calendarRef.current.clientWidth / 2 - 150), behavior: "smooth" });
    }, [selectedDate, loadingPets])

    return (
        <div className="calendar-main">
            <h1 className="title">
                Calendario dei pasti
            </h1>
            <div className="date-container">
                <i className="ArrowLeft" onClick={() => setPrevDate()} />
                <div className="date-text-container">
                    <h4 className="when">{weekDays[selectedDate.getDay()]}</h4>
                    <h3 className="date">{selectedDate.toLocaleDateString("it-EU")}</h3>
                </div>
                <i className="ArrowRight" onClick={() => setNextDate()} />
            </div>

            <div className="calendar-container">
                <div className={"calendar" + (loadingPets ? " loading" : "")} ref={calendarRef}>
                    {
                        !loadingPets ? <>
                            <div className="hours-container">
                                <div className="hours">
                                    <div className="current-hour" style={{ marginLeft: calcOffset(selectedDate.getHours(), selectedDate.getMinutes(), 86) + "px" }}>
                                        {new Date().getHours() + ":" + (new Date().getMinutes() < 10 ? "0" + new Date().getMinutes() : new Date().getMinutes())}
                                    </div>
                                    {
                                        hours.map((h, i) => <p className="hour" key={i}>{h}</p>)
                                    }</div>
                            </div>
                            <div className="nutritions-container">
                                <div className="nutritions">
                                    <span className="current-hour-separator" style={{ marginLeft: calcOffset(selectedDate.getHours(), selectedDate.getMinutes(), 86) + 38 + "px" }} />
                                    {
                                        hours.map((h, i) => <div className="nutrition-colum" key={i}>
                                            <span className="separator" />
                                            <div className="nutrition-grid" style={nutritionGridStyle}>
                                                {
                                                    petsWithNutrition.map((pet, j) => {
                                                        return <div className="calendar-card-wrapper" key={j}>
                                                            {
                                                                pet.nutritionPlans![0].meals.map((meal, mealIndex) => {
                                                                    return betweenHours(i + 8, meal.hours, meal.minutes) && cardDateSelected(selectedDate, meal.weekDay) ?
                                                                        <CalendarCard pet={pet} nutritionIndex={mealIndex} key={mealIndex} style={{ marginLeft: calcCardOffset(i + 8, meal.hours, meal.minutes) + "px" }} selectedDate={selectedDate} /> : ""
                                                                })
                                                            }
                                                        </div>
                                                    })
                                                }
                                            </div>
                                        </div>)
                                    }
                                </div>
                            </div>
                        </> : <PawLoading />
                    }
                </div>
            </div>
        </div>
    )
}



const betweenHours = (referenceHours: number, toCheckHours: number, toCheckMinutes: number) => {
    const toCheckTime = toCheckHours + (toCheckMinutes < 10 ? toCheckMinutes / 10 : toCheckMinutes / 100);
    if (toCheckTime <= referenceHours + .3 && toCheckTime > referenceHours - .7) return true;
    return false;
}

const cardDateSelected = (selectedDate: Date, cardDay: number) => {
    if (selectedDate.getDay() === cardDay) return true;
    return false
}

const hourIndex = (hour: number) => {
    const index = hour - 8;
    if (index < 0) return null;
    return index;
}

const calcOffset = (hour: number, minutes: number, contentWidth: number) => {
    const index = hourIndex(hour);
    const minutesBase10 = (minutes * 100) / 60
    if (index) return (244 * index) + contentWidth + ((minutesBase10 * 244) / 100);
    return 0;
}

const calcCardOffset = (currentHour: number, hour: number, minutes: number) => {
    const minutesBase10 = (minutes * 100) / 60
    let offset = 0;
    if (hour < currentHour)
        offset = minutesBase10 - 50;
    else
        offset = minutesBase10 + 50;
    return ((offset * 244) / 100)
}

export default Calendar;