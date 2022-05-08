import "./card.css";
import Pet from "../../../types/pet";


const Card = ({ pet }: { pet: Pet }) => {
    return (
        <div className="card-container" onClick={() => { console.log(pet.name) }}>
            <div className="pet-name">
                <h2 className="htext">{pet.name}</h2>
            </div>
            <div className="pet-animal">
                <h3 className="htext">{pet.species}</h3>
            </div>
            <div className="pet-breed">
                <h4 className="htext">{pet.breed}</h4>
            </div>
            <div className="pet-nutrition">
                <h5 className="n-row1">Devo mangiare in</h5>
                <h3 className="n-row2">{pet.nutritionPlans[0].meals[0].hours} ore</h3>
                <h5 className="n-row3">{pet.nutritionPlans[0].meals[0].Product.name}</h5>
            </div>
            <div className="arrow-icon">
                <i className="ArrowRightSquare" />
            </div>
        </div>
    );

}

export default Card;