import classes from './Header.module.css';
import classes2 from './HeaderMenuButton.module.css';
import pixel from '../../assets/pixel-jeff-cafe.jpg';
import {useContext, Fragment, useEffect, useState} from 'react';
import HeaderCartButton from "./HeaderCartButton";
import HeaderMenuButton from "./HeaderMenuButton";
import AuthContext from "../../store/auth-context";
import {Navigate} from "react-router-dom";

const Header =  (props) => {
    const authCtx = useContext(AuthContext);
    const [isAction, setIsAction] = useState(false);
    useEffect(()=> {
        const log = localStorage.getItem("token");
        if(log) {
            console.log(log);
            authCtx.onLogin(log,log);
        }
    },[]);

    const actionsHandler=()=> {
        setIsAction(true);
    }

    return <Fragment>
        <header className={classes.header}>
            <h1>Pixel Coffee Shop</h1>

            {authCtx.isAuthenticated && <h1>Hello,{authCtx.username}</h1>}
            <div className={classes.clickers}>
                {authCtx.username === "admin" && <button className={classes2.button} onClick={actionsHandler}>Actions</button>}
            <HeaderCartButton onClick={props.onShowCart}/>
            <HeaderMenuButton/>
                {isAction && <Navigate to='/admin'/>}
            </div>
        </header>
        <div className={classes['main-image']}>
            <img src={pixel} alt="title"/>
        </div>
    </Fragment>
}
export default Header;