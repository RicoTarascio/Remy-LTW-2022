import axios, { AxiosError } from "axios";
import { useEffect, useRef, useState } from "react";
import isFormValid from "../../../controllers/isFormValid";
import Spinner from "../../commons/spinner/spinner";
import Button from "../button/button";
import Textfield from "../textfield/textfield";
import "./addPetModal.css";

interface ObjectWithValue extends Element {
    value: string | number
}

const AddPetModal = ({ open, handleClose }: { open: boolean, handleClose: Function }) => {
    const formRef = useRef<HTMLFormElement>(null)
    const [errorMessage, setErrorMessage] = useState("");
    const [loading, setLoading] = useState(false)

    const addPet = () => {
        const formValidationError = isFormValid(formRef);
        if (formValidationError || loading) {
            setErrorMessage(formValidationError);
            return;
        }
        try {
            setLoading(true);
            axios.post("http://localhost:4000/addPet", {
                name: (formRef.current![0] as ObjectWithValue).value,
                species: (formRef.current![1] as ObjectWithValue).value,
                breed: (formRef.current![2] as ObjectWithValue).value,
                age: +(formRef.current![3] as ObjectWithValue).value,
                weight: +(formRef.current![4] as ObjectWithValue).value,
            }, {
                withCredentials: true
            }).then(() => {
                setLoading(false)
                handleClose();
            })
        } catch (err: any) {
            const axiosError = err as AxiosError;
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
                                <h2 className="loading-title">Aggiungendo {(formRef.current![0] as ObjectWithValue).value}...</h2>
                                <Spinner />
                            </div> : <>
                                <h2 className="modal-title">Aggiungi un pet</h2>
                                <form onSubmit={(e) => { e.preventDefault(); addPet() }} className="modal-fields" ref={formRef}>
                                    <Textfield valid={!errorMessage} placeholder="Nome del pet" required type="text" label="Nome" size="medium" changeCallback={() => { }} icon="Edit" />
                                    <Textfield valid={!errorMessage} placeholder="Cane" required type="text" label="Specie" size="medium" changeCallback={() => { }} icon="Edit" />
                                    <Textfield valid={!errorMessage} placeholder="Pastore Tedesco" required type="text" label="Razza" size="medium" changeCallback={() => { }} icon="Edit" />
                                    <div className="age-weight-container">
                                        <Textfield valid={!errorMessage} placeholder="5" required type="number" label="Età" size="medium" changeCallback={() => { }} icon="Anni" />
                                        <Textfield valid={!errorMessage} placeholder="10" required type="number" label="Peso" size="medium" changeCallback={() => { }} icon="Kg" />
                                    </div>
                                    <Button buttonType="Primary" text="Aggiungi" onClickCallback={() => { }} />
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

export default AddPetModal;