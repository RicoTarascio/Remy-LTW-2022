/*
import { useState } from "react";
import { Icon } from "../../../icons/types";
import { InputType } from "../../input/textfield/inputTypes";
*/
import axios from "axios";
import { useRef, useState } from "react";
import Checkbox from "../../input/checkbox/checkbox";
import Textfield from "../../input/textfield/textfield";
import "./login.css";
import UserController from "../../../core/controllers/userController";
import Button from "../../input/button/button";


const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [checkbox, setCheckbox] = useState(false);
    const formRef = useRef<HTMLFormElement | null>(null);

    const login = async (email: string, password: string) => {
        if (!isFormValid()) return;
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

    const isFormValid = () => {

        if (formRef.current) {
            let valid = true;
            for (let index = 0; index < formRef.current.length; index++) {
                const current = formRef.current[index] as HTMLInputElement;
                if (!current.value) {
                    current.setCustomValidity("error")
                    valid = false
                }
            }
            return valid
        }
        return false
    }

    return (
        <>
            <div className="login-container">
                <div className="top"><h1>Remy</h1></div>
                <div className="artwork"></div>
                <div className="form">
                    <h2 className="login-title">Login</h2>
                    <form className="inner-form-container" ref={formRef} onSubmit={async (e) => { e.preventDefault(); await login(email, password) }}>
                        <Textfield size="big" type="email" changeCallback={(e: any) => { isFormValid(); setEmail(e.target.value); }} placeholder='Inserisci la tua email' label='Email' required icon='Profile' />

                        <Textfield size="big" type="password" changeCallback={(e: any) => { isFormValid(); setPassword(e.target.value); }} placeholder='Inserisci la tua password' label='Password' required icon='Show' />

                        <Checkbox label="Ricordami" changeCallback={(e: any) => { setCheckbox(e.target.checked); }} required></Checkbox>
                        <Button buttonType="Primary" text="Login" onClickCallback={() => { }}></Button>
                    </form>

                </div>
                <div className="bottom"></div>

            </div>
        </>
    );
}

export default Login;