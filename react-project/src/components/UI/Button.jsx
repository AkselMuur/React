import './Button.css'

const Button = (props)=> {
    return(
        <button className="button" 
        type={props.type|| 'button'} 
        onClick={props.onClick}>{props.children} 
        disabled={props.disabled}
        </button>
    )
}

export default Button