import "./checkbox.css"

const Checkbox = ({ label, changeCallback }: { label: string, changeCallback: Function }) => {
    return (
        <div className="checkbox-container">
            <input className="box" type="checkbox" onClick={(e) => { changeCallback(e) }} />
            <h6 className="checkbox-label ui-text">
                {label}
            </h6>
        </div>
    )
}

export default Checkbox;