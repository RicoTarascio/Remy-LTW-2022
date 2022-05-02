import {Nutrition} from "./nutrition";
import "./card.css";


type pet={
    type: string,
    breed: string,
    name: string
    nutrition: Nutrition
}



const Card=(params: pet) =>{
    return(
        <div className="card-container">
            <div className="pet-name">
                <h2 className="htext">{params.name}</h2>
            </div>
            <div className="pet-type">
                <h3 className="htext">{params.type}</h3>
            </div>
            <div className="pet-breed">
                <h4 className="htext">{params.breed}</h4>
            </div>
            <div className="pet-nutrition"> 
                <h5 className="n-row1">I need to eat in</h5>
                <h3 className="n-row2">{params.nutrition.when}</h3>
                <h5 className="n-row3">{params.nutrition.nextMeal}</h5> 
            </div>
            <div className="arrow-icon">
                
            </div>
        </div>
    );
    
}

export default Card;