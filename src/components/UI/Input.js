import React from 'react';
import classes from './Input.module.css';

const Input = (props) => {
    return <input onChange={props.onType} className={`${classes.input} ${props.style}`} type={props.type} value={props.value} id={props.id} placeholder={props.placeholder} />
} 

export default Input;