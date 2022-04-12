/*
import { useState } from "react";
import { Icon } from "../../../icons/types";
import { InputType } from "../../input/textfield/inputTypes";
*/
import Textfield from "../../input/textfield/textfield";
import "./login.css";


const Login = () => {
    return(
        <>
        <h2>Login</h2>  
        <div className='textfield-holder'>
            <Textfield size="big" type="email" changeCallback={(e: any) => { console.log(e) }} placeholder='Inserisci la tua email' label='Email' required icon='Profile' />
        </div>

        <div className='textfield-holder'>
            <Textfield size="big" type="password" changeCallback={(e: any) => { console.log(e) }} placeholder='Inserisci la tua password' label='Password' required icon='Profile' />
        </div>

        <div>
            <input type='checkbox' name="ricordami" ></input>
            Ricordami
        </div>
        </>

    );
}

export default Login;