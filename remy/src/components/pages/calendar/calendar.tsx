import { useEffect, useRef, useState } from "react";
import Pet from "../../../types/pet";
import "./calendar.css"
import CalendarCard from "./calendarCard/CalendarCard";
const hours = ["8:00", "9:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00"]
const Calendar = () => {
    const animalsWithNutrition: Pet[] = [
        {
            name: "Maya",
            breed: "Dio",
            meals: [
                {
                    productName: "Royal Canin Max Adult",
                    quantity: 100,
                    when: new Date(2022, 5, 4, 16, 30),
                    productImage: "../../images/product.png"

                },
                {
                    productName: "Royal Canin Max Adult",
                    quantity: 40,
                    when: new Date(2022, 5, 4, 18, 30),
                    productImage: "../../images/product.png"
                },
                {
                    productName: "Royal Canin Max Adult",
                    quantity: 60,
                    when: new Date(2022, 5, 4, 13, 30),
                    productImage: "../../images/product.png"
                }
            ]
        },
        {
            name: "Lucas",
            breed: "Dio",
            meals: [
                {
                    productName: "Royal Canin Max Adult",
                    quantity: 30,
                    when: new Date(2022, 5, 3, 15),
                    productImage: "../../images/product.png"
                },
                {
                    productName: "Royal Canin Max Adult",
                    quantity: 30,
                    when: new Date(2022, 5, 3, 18),
                    productImage: "../../images/product.png"
                }
            ]
        },
        {
            name: "Doug",
            breed: "Dio",
            meals: [
                {
                    productName: "Royal Canin Max Adult",
                    quantity: 30,
                    when: new Date(2022, 5, 3, 15),
                    productImage: "../../images/product.png"
                },
                {
                    productName: "Royal Canin Max Adult",
                    quantity: 30,
                    when: new Date(2022, 5, 3, 18),
                    productImage: "../../images/product.png"
                }
            ]
        }
    ];
    const [selectedDate, selectDate] = useState(new Date());
    const calendarRef = useRef<HTMLDivElement>(null)

    const nutritionGridStyle = {
        width: '100%',
        height: '100%',
        gridTemplateRows: `repeat(${animalsWithNutrition.length}, minmax(0, 1fr))`,
        gap: "32px"
    };

    const setNextDate = () => {
        selectDate(new Date(selectedDate.getTime() + 24 * 60 * 60 * 1000));
    }

    const setPrevDate = () => {
        selectDate(new Date(selectedDate.getTime() - 24 * 60 * 60 * 1000));
    }

    useEffect(() => {
        const leftOffset = calcOffset(selectedDate.getHours(), selectedDate.getMinutes(), 86);
        if (calendarRef) calendarRef.current?.scrollTo({ left: leftOffset - (calendarRef.current.clientWidth / 2 - 100), behavior: "smooth" });
    })

    return (
        <div className="calendar-main">
            <h1 className="title">
                Calendario
            </h1>
            <div className="date-container">
                <i className="ArrowLeft" onClick={() => setPrevDate()} />
                <div className="date-text-container">
                    <h4 className="when">Oggi</h4>
                    <h3 className="date">{selectedDate.toLocaleDateString("it-EU")}</h3>
                </div>
                <i className="ArrowRight" onClick={() => setNextDate()} />
            </div>
            <div className="calendar-container">
                <div className="calendar" ref={calendarRef}>
                    <div className="hours">
                        <div className="current-hour" style={{ marginLeft: calcOffset(selectedDate.getHours(), selectedDate.getMinutes(), 86) + "px" }}>
                            {new Date().getHours() + ":" + new Date().getMinutes()}
                        </div>
                        {
                            hours.map((h, i) => <p className="hour" key={i}>{h}</p>)
                        }</div>
                    <div className="nutritions">
                        <span className="current-hour-separator" style={{ marginLeft: calcOffset(selectedDate.getHours(), selectedDate.getMinutes(), 86) + 38 + "px" }} />
                        {
                            hours.map((h, i) => <div className="nutrition-colum" key={i}>
                                <span className="separator" />
                                <div className="nutrition-grid" style={nutritionGridStyle}>
                                    {
                                        animalsWithNutrition.map((pet, i) => {
                                            return <div className="calendar-card-wrapper" key={i}>
                                                {
                                                    pet.meals.map((meal, mealIndex) => {
                                                        return betweenHours(h, meal.when.getHours() + ":" + meal.when.getMinutes()) && cardDateSelected(selectedDate, meal.when) ? <CalendarCard pet={pet} nutritionIndex={mealIndex} key={mealIndex} style={{ marginLeft: calcCardOffset(meal.when.getHours(), meal.when.getMinutes()) + "px" }} /> : ""
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
            </div>

        </div>
    )
}

const timeStringToFloat = (time: string) => {
    var hoursMinutes = time.split(/[.:]/);
    var hours = parseInt(hoursMinutes[0], 10);
    var minutes = hoursMinutes[1] ? parseInt(hoursMinutes[1], 10) : 0;
    return hours + minutes / 60;
}

const betweenHours = (reference: string, toCheck: string) => {
    const referenceFloat = timeStringToFloat(reference);
    const toCheckFloat = timeStringToFloat(toCheck);
    if (toCheckFloat >= referenceFloat - .5 && toCheckFloat < referenceFloat + .5) return true;
    return false;
}

const cardDateSelected = (selectedDate: Date, cardDate: Date) => {
    if (selectedDate.getDate() === cardDate.getDate() && selectedDate.getMonth() + 1 === cardDate.getMonth() && selectedDate.getFullYear() === cardDate.getFullYear()) return true;
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

const calcCardOffset = (hour: number, minutes: number) => {
    const minutesBase10 = (minutes * 100) / 60
    const offset = -minutesBase10 + 50;
    return ((offset * 244) / 100)
}

export default Calendar;