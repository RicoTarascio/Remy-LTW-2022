import axios, { AxiosError } from "axios";
import { useRef, useState } from "react";
import Checkbox from "../../input/checkbox/checkbox";
import Textfield from "../../input/textfield/textfield";
import "./login.css";
import Button from "../../input/button/button";
import Spinner from "../../commons/spinner/spinner";
import { NavigationRouter } from "../../../controllers/requireNotAuth";
import isFormValid from "../../../controllers/isFormValid";
import Pets from "../pets/pets";


const Login = (router: NavigationRouter) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [checkbox, setCheckbox] = useState(false);
    const formRef = useRef<HTMLFormElement | null>(null);
    const [errorMessage, setErrorMessage] = useState("");
    const [loading, setLoading] = useState(false);


    const login = async (email: string, password: string) => {
        const formValidationErrors = isFormValid(formRef);
        if (formValidationErrors || loading) {
            setErrorMessage(formValidationErrors);
            return
        }
        try {
            setLoading(true);
            axios.get("http://localhost:4000/login", {
                params: {
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
        <>
            <div className="login-container">
                <div className="top"><h1>Remy</h1></div>
                <div className="artwork"></div>
                <div className="form">
                    <h2 className="login-title">Login</h2>
                    <form noValidate className="inner-form-container" ref={formRef} onSubmit={async (e) => { e.preventDefault(); await login(email, password) }} >
                        <div className="error-message-container">
                            <h3 className="error-message">{errorMessage}</h3>
                        </div>

                        <Textfield size="big" type="email" changeCallback={(e: any) => { setEmail(e.target.value) }} valid={!errorMessage} placeholder='esempio@email.com' label='Email' required icon='Profile' />

                        <Textfield size="big" type="password" changeCallback={(e: any) => { setPassword(e.target.value); }} valid={!errorMessage} placeholder='Inserisci la tua password' label='Password' required icon='Show' />

                        <Checkbox label="Ricordami" changeCallback={(e: any) => { setCheckbox(e.target.checked); }}></Checkbox>

                        <div className="button-spinner">
                            <Button buttonType="Primary" text="Login" onClickCallback={() => { }}></Button>
                            {
                                loading ? <Spinner></Spinner> : ""
                            }
                        </div>

                        <h3 className="registrati">Non hai un account? <span className="link" onClick={() => { router.navigate("/register"); }}>Registrati</span></h3>
                    </form>
                </div>
                <div className="bottom"></div>
            </div>
        </>
    );
}
export default Login;