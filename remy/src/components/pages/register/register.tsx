import axios, { AxiosError } from "axios";
import { useEffect, useRef, useState } from "react";
import isFormValid from "../../../controllers/isFormValid";
import { NavigationRouter } from "../../../controllers/requireNotAuth";
import Spinner from "../../commons/spinner/spinner";
import Button from "../../input/button/button";
import Checkbox from "../../input/checkbox/checkbox";
import Textfield from "../../input/textfield/textfield";
import "./register.css";

const Register = (router: NavigationRouter) => {
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordRepeat, setPasswordRepeat] = useState("");
    const [checkbox, setCheckbox] = useState(false);
    const [loading, setLoading] = useState(false);
    const formRef: React.MutableRefObject<HTMLFormElement | null> = useRef(null);
    const [errorMessage, setErrorMessage] = useState("");

    const register = (name: string, surname: string, email: string, password: string, passwordRepeat: string) => {
        const formValidationErrors = isFormValid(formRef);
        const passwordValidationErrors = passwordValidation(password, passwordRepeat)
        if (formValidationErrors || loading) {
            setErrorMessage(formValidationErrors);
            return
        } else if (passwordValidationErrors) {
            setErrorMessage(passwordValidationErrors);
            return;
        }
        try {
            setLoading(true);
            axios.get("http://localhost:4000/register", {
                params: {
                    name: name,
                    surname: surname,
                    email: email,
                    plainPwd: password
                },
                withCredentials: true
            }).then(() => {
                router.navigate("/", { replace: true })
            }).catch((err) => {
                const errAxios = err as AxiosError;
                setErrorMessage(errAxios.response?.data)
            }).finally(() => setLoading(false))
        } catch (error: any) {
            setErrorMessage(error.message)
            setLoading(false);
        }
    }

    return (
        <div className="register-container">
            <div className="top"><h1>Remy</h1></div>
            <div className="artwork"></div>
            <div className="form">
                <h2 className="register-title">Signup</h2>
                <form ref={formRef} noValidate className="inner-form-container" onSubmit={(e) => { e.preventDefault(); register(name, surname, email, password, passwordRepeat); }}>
                    <div className="error-message-container">
                        <h3 className="error-message">{errorMessage}</h3>
                    </div>

                    <Textfield valid={!errorMessage} size="big" type="text" changeCallback={(e: any) => { setName(e.target.value); }} placeholder='Mario' label='Nome' required icon='Edit Square' />

                    <Textfield valid={!errorMessage} size="big" type="text" changeCallback={(e: any) => { setSurname(e.target.value); }} placeholder='Rossi' label='Cognome' required icon='Edit Square' />

                    <Textfield valid={!errorMessage} size="big" type="email" changeCallback={(e: any) => { setEmail(e.target.value); }} placeholder='esempio@email.com' label='Email' required icon='Profile' />

                    <Textfield valid={!errorMessage} size="big" type="password" changeCallback={(e: any) => { setPassword(e.target.value); }} placeholder='Inserisci la tua password' label='Password' required icon='Show' />

                    <Textfield valid={!errorMessage} size="big" type="password" changeCallback={(e: any) => { setPasswordRepeat(e.target.value); }} placeholder='Conferma la tua password' label='Conferma password' required icon='Show' />

                    <Checkbox label="Accetto i termini contrattuali" changeCallback={(e: any) => { setCheckbox(e.target.checked); }}></Checkbox>

                    <div className="button-spinner">
                        <Button buttonType="Primary" text="Signup" onClickCallback={() => { }}></Button>
                        {
                            loading ? <Spinner /> : ""
                        }
                    </div>
                </form>
            </div>
            <div className="bottom"></div>
        </div>
    );

}

const passwordValidation = (password1: string, password2: string) => {
    if (password1 !== password2) return "Le password non sono uguali";
    if (password1.includes(" ") || password2.includes(" ")) return "La password non deve contentere spazi";
    if (password1.length < 6 || password2.length < 6) return "La password deve essere lunga almeno 6 caratteri";
    return ""
}

export default Register;
