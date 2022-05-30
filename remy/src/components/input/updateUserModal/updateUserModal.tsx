import axios, { AxiosError } from "axios";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import isFormValid from "../../../controllers/isFormValid";
import UserController from "../../../controllers/userController";
import { User } from "../../../types/user";
import Spinner from "../../commons/spinner/spinner";
import Button from "../button/button";
import Textfield from "../textfield/textfield";
import "./updateUserModal.css";

interface ObjectWithValue extends Element {
    value: string | number
}

const UpdateUserModal = ({ user, open, handleClose }: { user: User, open: boolean, handleClose: Function }) => {
    const formRef = useRef<HTMLFormElement>(null)
    const [errorMessage, setErrorMessage] = useState("");
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate();

    const updateUser = () => {
        const formValidationError = isFormValid(formRef);
        if (formValidationError || loading) {
            setErrorMessage(formValidationError);
            return;
        }
        try {
            setErrorMessage("")
            setLoading(true);
            axios.post("http://localhost:4000/updateUser", {
                email: (formRef.current![0] as ObjectWithValue).value,
                name: (formRef.current![1] as ObjectWithValue).value,
                surname: (formRef.current![2] as ObjectWithValue).value,
            }, {
                withCredentials: true
            }).then(() => {
                handleClose();
                UserController.authChanged()
            }).catch((err) => {
                const axiosErr = err as AxiosError
                setErrorMessage(axiosErr.response?.data)
            }).finally(() => {
                setLoading(false)
            })
        } catch (err: any) {
            const axiosError = err as AxiosError;
            console.log(axiosError)
            setErrorMessage(axiosError.response?.data)
        }
    }

    useEffect(() => {
        if (open)
            document.getElementById("page")?.classList.add("hide-scroll");
        else document.getElementById("page")?.classList.remove("hide-scroll");
    }, [open])

    return (
        <>
            {
                open ? <div className="modal-container">
                    <div className="modal">
                        {
                            loading ? <div className="loading-modal">
                                <h2 className="loading-title">Modificando le informazioni di {user.name}...</h2>
                                <Spinner />
                            </div> : <>
                                <h2 className="modal-title">Aggiorna le tue informazioni</h2>
                                <form onSubmit={(e) => { e.preventDefault(); updateUser() }} className="modal-fields" ref={formRef}>
                                    <Textfield valid={!errorMessage} defaultValue={user.email} placeholder="Nuova email" required type="email" label="Email" size="medium" changeCallback={() => { }} icon="At" />
                                    <Textfield valid={!errorMessage} defaultValue={user.name} placeholder="Nuovo nome" required type="text" label="Nome" size="medium" changeCallback={() => { }} icon="Edit" />
                                    <Textfield valid={!errorMessage} defaultValue={user.surname} placeholder="Nuovo cognome" required type="text" label="Cognome" size="medium" changeCallback={() => { }} icon="Edit" />
                                    {
                                        errorMessage ? <h3 className="error-message">{errorMessage}</h3> : null
                                    }
                                    <Button buttonType="Primary" text="Aggiorna" onClickCallback={() => { }} />
                                </form>
                            </>
                        }

                    </div>
                    <div className="background" onClick={() => handleClose()} />
                </div> : ""
            }
        </>

    )


}

export default UpdateUserModal;