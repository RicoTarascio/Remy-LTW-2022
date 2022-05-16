import { useEffect, useState } from "react";
import { Icon } from "../../../icons/types";
import { InputType } from "./inputTypes";
import "./textfield.css";

interface TextFieldParams {
    type: InputType,
    changeCallback: Function,
    required: boolean,
    label?: string,
    placeholder: string,
    icon?: Icon,
    valid?: boolean,
    defaultValue?: string,
    size: string
}

const Textfield = (params: TextFieldParams) => {
    const [typeController, setTypeController] = useState(params.type);
    const [validClassname, setValidClassname] = useState("")
    const [value, setValue] = useState(params.defaultValue ? params.defaultValue : "")

    useEffect(() => {
        if (params.valid) setValidClassname("");
        else if (params.valid !== undefined) {
            if (!params.valid) setValidClassname("invalid")
        }
    }, [params.valid])

    return (
        <div className="textfield-container">
            <h6 className="textfield-label ui-text">
                {params.label} {params.required ? <span className="asterisc">*</span> : ""}
            </h6>
            <div className="input-icon">
                <input className={`textfield ${params.size} ${validClassname}`} max={20} maxLength={40} min={0} minLength={1} type={typeController} placeholder={params.placeholder} value={value} onChange={(e) => {
                    setValidClassname("");
                    setValue(e.target.value);
                    params.changeCallback(e)
                }} />
                {params.type === "password" ? <div className="hide-show-password" onClick={() => setTypeController(hideShowPassword(typeController))}><i className={`icon ${typeController === "password" ? "Show" : "Hide"}`}></i></div> : <i className={`icon ${params.icon}`}></i>}
            </div>
        </div>
    )
}

const hideShowPassword = (type: InputType): InputType => {
    if (type === "password") return "text"
    return "password";
}

export default Textfield;