import "./card.css";
import pet from "../../../types/pet";


const Card = (params: pet) => {
    return (
        <div className="card-container" onClick={() => { console.log(params.name) }}>
            <div className="pet-name">
                <h2 className="htext">{params.name}</h2>
            </div>
            <div className="pet-animal">
                <h3 className="htext">{params.species}</h3>
            </div>
            <div className="pet-breed">
                <h4 className="htext">{params.breed}</h4>
            </div>
            <div className="pet-nutrition">
                <h5 className="n-row1">Devo mangiare in</h5>
                <h3 className="n-row2">{params.meals[0].hours} ore</h3>
                <h5 className="n-row3">{params.meals[0].productName}</h5>
            </div>
            <div className="arrow-icon">
                <i className="ArrowRightSquare" />
            </div>
        </div>
    );

}

export default Card;