import classes from './Button.module.css';

const Button = (props) => {
    return (
        <button type={props.type} className={`${props.style} ${classes.btn}`} onClick={props.onShow} onChange={props.onChange}>{props.children}</button>
    )
}

export default Button;