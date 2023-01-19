import classes from './Paginate.module.css';

const Paginate = (props) => {

    let paginateNumber = []
    for(let i = 1; i <= Math.ceil(props.totalTodo / props.todoPerPage); i++) {
        paginateNumber.push(i)
    }
    

    return (
            <ul className={classes.paginateCont}>
            {paginateNumber.map(number => {
                return (
                    <li key={number} className={classes.paginate} onClick={()=>{props.paginate(number)}}>{number}</li>
                )
            })}
            </ul>
    )
}

export default Paginate;