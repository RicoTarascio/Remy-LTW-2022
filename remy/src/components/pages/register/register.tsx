import { useEffect, useState } from "react";
import Checkbox from "../../input/checkbox/checkbox";
import Textfield from "../../input/textfield/textfield";
import "./register.css";

const Register = () => {
    const[name, setName]=useState("");
    const[surname, setSurname]=useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [checkbox, setCheckbox] = useState(false);

    return(
        <div className="register-container">
            <div className="top"><h1>Remy</h1></div>
            <div className="artwork"></div>
            <div className="form">
                <h2 className="register-title">Signup</h2>
                <div className="inner-form-container">
                    <Textfield size="big" type="text" changeCallback={(e: any) => { setEmail(e.target.value); }} placeholder='Inserisci il tuo nome' label='Nome' required icon='Edit Square' />
                    
                    <Textfield size="big" type="text" changeCallback={(e: any) => { setEmail(e.target.value); }} placeholder='Inserisci il tuo cognome' label='Cognome' required icon='Edit Square' />
                    
                    <Textfield size="big" type="email" changeCallback={(e: any) => { setEmail(e.target.value); }} placeholder='Inserisci la tua email' label='Email' required icon='Profile' />
                    
                    <Textfield size="big" type="password" changeCallback={(e: any) => { setPassword(e.target.value); }} placeholder='Inserisci la tua password' label='Password' required icon='Show' />
                    
                    <Textfield size="big" type="password" changeCallback={(e: any) => { setPassword(e.target.value); }} placeholder='Conferma la tua password' label='Conferma password' required icon='Show' />
                    
                    <Checkbox label="Accetto i termini contrattuali" changeCallback={(e: any) => { setCheckbox(e.target.checked); }} required></Checkbox>
                    
                    <button onClick={() => { }}>Signup</button>
                </div>
            </div>
            <div className="bottom"></div>
        </div>
    );

}

export default Register;