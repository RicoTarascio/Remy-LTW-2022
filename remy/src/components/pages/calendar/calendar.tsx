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
                    when: new Date(2022, 5, 3, 16, 30),
                    productImage: "../../images/product.png"

                },
                {
                    productName: "Royal Canin Max Adult",
                    quantity: 40,
                    when: new Date(2022, 5, 3, 18, 30),
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
    const today = new Date();

    const nutritionGridStyle = {
        width: '100%',
        height: '100%',
        gridTemplateRows: `repeat(${animalsWithNutrition.length}, minmax(0, 1fr))`,
        gap: "32px"
    };

    return (
        <div className="calendar-main">
            <h1 className="title">
                Calendario
            </h1>
            <div className="date-container">
                <div className="date-text-container">
                    <h4 className="when">Oggi</h4>
                    <h3 className="date">{today.toLocaleDateString("it-EU")}</h3>
                </div>

            </div>
            <div className="calendar-container">
                <div className="calendar">
                    <div className="hours">
                        <div className="current-hour" style={{ marginLeft: calcOffset(today.getHours(), today.getMinutes(), 86) + "px" }}>
                            {today.getHours() + ":" + today.getMinutes().toPrecision(2).toString().replace(".", "")}
                        </div>
                        {
                            hours.map((h, i) => <p className="hour" key={i}>{h}</p>)
                        }</div>
                    <div className="nutritions">
                        <span className="current-hour-separator" style={{ marginLeft: calcOffset(today.getHours(), today.getMinutes(), 86) || "32" + "px" }} />
                        {
                            hours.map((h, i) => <div className="nutrition-colum" key={i}>
                                <span className="separator" />
                                <div className="nutrition-grid" style={nutritionGridStyle}>
                                    {
                                        animalsWithNutrition.map((pet, i) => {
                                            return <div className="calendar-card-wrapper" key={i}>
                                                {
                                                    pet.meals.map((meal, mealIndex) => {
                                                        return betweenHours(h, meal.when.getHours() + ":" + meal.when.getMinutes()) ? <CalendarCard pet={pet} nutritionIndex={mealIndex} key={mealIndex} style={{ marginLeft: calcCardOffset(meal.when.getHours(), meal.when.getMinutes()) || "32" + "px" }} /> : ""
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
    const minutesBase30 = (minutes * 30) / 100
    if (minutesBase30) return minutesBase30;
    return 122;
}

export default Calendar;