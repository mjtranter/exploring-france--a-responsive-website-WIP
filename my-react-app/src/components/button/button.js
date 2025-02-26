import './button.css';

export default function Button({type, text, onClick}) {

    return (
        <button className={"button " + type} type="button" onClick={onClick}><b>{text}</b></button>
    )
}