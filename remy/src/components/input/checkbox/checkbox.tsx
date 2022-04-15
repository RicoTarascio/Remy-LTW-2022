import "./checkbox.css"

const Checkbox = ({ label, required, changeCallback }: { label: string, required: boolean, changeCallback: Function }) => {
    return (
        <div className="checkbox-container">
            <input type="checkbox" onClick={(e) => { changeCallback(e) }} />
            <h6 className="checkbox-label ui-text">
                {label} {required ? <span className="asterisc">*</span> : ""}
            </h6>
        </div>
    )
}

export default Checkbox;