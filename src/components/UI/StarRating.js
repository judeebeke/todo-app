import React from "react";
import classes from './StarRating.module.css';

const StarRating = (props) => {
    return(
            <span className={`${classes.star} ${props.rate ? classes.selected : ""}`} onClick={props.onStarChange}></span>
    )
}

export default StarRating;
    ;