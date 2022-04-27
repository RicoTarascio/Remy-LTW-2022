import { Icon } from "../../../icons/types";
import "./button.css"

type ButtonType = "Primary" | "Secondary" | "CTA";

interface ButtonParams {
    buttonType: ButtonType,
    onClickCallback: Function,
    text: string,
    icon?: Icon
}

const Button = (params: ButtonParams) => {
    return (
        <button className={params.buttonType} onClick={() => params.onClickCallback()}>
            <div className="button-inner">
                <h3 className="ui-text button-text">{params.text}</h3>
                <i className={`button-icon ${params.icon}`}></i>
            </div>
        </button>
    )
}

export default Button;