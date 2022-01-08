import {Fragment, useState} from "react";
import classes from '../Layout/Header.module.css'
import pixel from "../../assets/pixel-jeff-cafe.jpg";
import classes2 from "../Layout/HeaderMenuButton.module.css";
import {Navigate} from "react-router-dom";
const HeaderOrder =  () => {
    const [isLogout, setIsLogout] = useState(false);
    const [isProducts, setIsProducts] =useState(false);
    return (
        <Fragment>
            <header className={classes.header}>
                <h1>Pixel Coffee Shop</h1>
                <div className={classes.clickers}>
                    <button className={classes2.button} onClick={()=>setIsProducts(true)}>Products</button>
                    <button className={classes2.button} onClick={()=>setIsLogout(true)}>Home</button>
                </div>
                {isLogout && <Navigate to='/'/>}
                {isProducts && <Navigate to='/admin'/>}
            </header>
            <div className={classes['main-image']}>
                <img src={pixel} alt="title"/>
            </div>
        </Fragment>
    );
}
export default HeaderOrder;