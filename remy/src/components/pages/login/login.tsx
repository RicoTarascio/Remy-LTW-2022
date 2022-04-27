/*
import { useState } from "react";
import { Icon } from "../../../icons/types";
import { InputType } from "../../input/textfield/inputTypes";
*/
import axios from "axios";
import { useState } from "react";
import Checkbox from "../../input/checkbox/checkbox";
import Textfield from "../../input/textfield/textfield";
import "./login.css";
import UserController from "../../../core/controllers/userController";
import Button from "../../input/button/button";


const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [checkbox, setCheckbox] = useState(false);

    const login = async (email: string, password: string) => {
        try {
            await axios.get("http://localhost:4000/login", {
                params: {
                    email: email,
                    plainPwd: password
                },
                withCredentials: true
            }).then(() => {
                UserController.authChanged();
            })
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <div className="login-container">
                <div className="top"><h1>Remy</h1></div>
                <div className="artwork"></div>
                <div className="form">
                    <h2 className="login-title">Login</h2>
                    <div className="inner-form-container" >
                        <Textfield size="big" type="email" changeCallback={(e: any) => { setEmail(e.target.value); }} placeholder='Inserisci la tua email' label='Email' required icon='Profile' />

                        <Textfield size="big" type="password" changeCallback={(e: any) => { setPassword(e.target.value); }} placeholder='Inserisci la tua password' label='Password' required icon='Show' />

                        <Checkbox label="Ricordami" changeCallback={(e: any) => { setCheckbox(e.target.checked); }} required></Checkbox>

                        <Button buttonType="Primary" text="Login" onClickCallback={async () => await login(email, password)}></Button>
                    </div>

                </div>
                <div className="bottom"></div>

            </div>
        </>
    );
}

export default Login;