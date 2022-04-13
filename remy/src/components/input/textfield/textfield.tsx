import { useState } from "react";
import { Icon } from "../../../icons/types";
import { InputType } from "./inputTypes";
import "./textfield.css";
const Textfield = (
    { type, changeCallback, required, label, placeholder, icon, size }:
        { type: InputType, changeCallback: Function, required: boolean, label: string | undefined, placeholder: string | undefined, icon: Icon, size: string }) => {

    const [typeController, setTypeController] = useState(type);
    return (
        <div className="textfield-container">
            <h6 className="textfield-label ui-text">
                {label} {required ? <span className="asterisc">*</span> : ""}
            </h6>
            <div className="input-icon">
                <input className={`textfield ${size}`} type={typeController} placeholder={placeholder} required={required} onChange={(e) => { changeCallback(e) }} />
                {type === "password" ? <div className="hide-show-password" onClick={() => setTypeController(hideShowPassword(typeController))}><i className={`icon ${typeController == "password" ? "Show" : "Hide"}`}></i></div> : <i className={`icon ${icon}`}></i>}

            </div>
        </div>
    )
}

const hideShowPassword = (type: InputType): InputType => {
    if (type === "password") return "text"
    return "password";
}

export default Textfield;