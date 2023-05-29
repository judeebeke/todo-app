import React from "react";
import classes from './StarRating.module.css';

const StarRating = (props) => {
    return(
            <span className={`${classes.star} ${props.rate ? classes.selected : ""}`} onClick={props.onStarChange}></span>
    )
}
// Code for using the Star Component in other component!
//   const setStarRatingHandler = (id) => {
//     setRateStar(
//         Star.map((item) => {
//         return item.id <= id ? { ...item, rate: true } : item;
//       })
//     );
// };

export default StarRating;
    ;