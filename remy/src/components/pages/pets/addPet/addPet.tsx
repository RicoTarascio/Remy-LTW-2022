import Textfield from "../../../input/textfield/textfield";
import "./addPet.css";

const AddPet=()=>{
    return(
        <div className="addPet-container">
            <h2>Aggiungi pet</h2>
            <div className="form-container">
                <form>
                    

                    <Textfield size="big" type="text" placeholder="Pastore Tedesco" label="Razza" icon="Edit" changeCallback={()=>{}} required/>

                    <Textfield size="big" type="text" placeholder="Fido" label="Nome" icon="Edit" changeCallback={()=>{}} required/>

                    <Textfield size="big" type="text" placeholder="10kg" label="Peso" icon="Edit" changeCallback={()=>{}} required/>

                    <Textfield size="big" type="text" placeholder="8" label="Età" icon="Edit" changeCallback={()=>{}} required/>
                </form>
            </div>
        </div>
    );
}

export default AddPet;