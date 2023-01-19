import  ReactDOM  from 'react-dom';
import classes from './Modal.module.css';

const Overlay = (props) => {
    return(
        <div className={classes.overlay} onClick={props.onShow}></div>
    )
}

const ModalObject = (props) => {
    return(
        <div className={classes.modalObject}>
         <Overlay onShow={props.onShow} />
            <div className={classes.modal}>
                {props.children}
            </div>
        </div>
    )
}

const Modal = (props) => {
    const portalElement = document.getElementById('overlay')

    return (
        ReactDOM.createPortal(<ModalObject onShow={props.onShow}>{props.children}</ModalObject>, portalElement)
    )
}

export default Modal;