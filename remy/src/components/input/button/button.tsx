import { Icon } from "../../../icons/types";
import "./button.css"

type ButtonType = "Primary" | "Secondary" | "CTA";

interface ButtonParams {
    buttonType: ButtonType,
    onClickCallback: Function,
    text: string,
    icon?: Icon,
    typeOfAction?: "Dangerous"
}

const Button = (params: ButtonParams) => {
    return (
        <button className={params.buttonType + " " + params.typeOfAction} onClick={() => params.onClickCallback()}>
            <div className="button-inner">
                <h3 className="ui-text button-text">{params.text}</h3>
                {
                    params.icon ? <i className={`button-icon ${params.icon}`} /> : <div className="empty" />
                }

            </div>
        </button>
    )
}

export default Button;