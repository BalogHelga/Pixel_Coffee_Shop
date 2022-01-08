import classes from '../Layout/HeaderMenuButton.module.css'
import {Navigate} from "react-router-dom";
import {Fragment,useState} from "react";
const OrderButton  = () =>{
    const [isPressed, setIsPressed] = useState(false);

    return (
        <Fragment>
        <button className={classes.button} onClick={()=>setIsPressed(true)}>
            <div>Orders </div>
        </button>
        {isPressed && <Navigate to='/orders'/>}
        </Fragment>
    );
};
export default OrderButton;