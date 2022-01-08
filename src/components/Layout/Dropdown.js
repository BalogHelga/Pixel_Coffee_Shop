import './Dropdown.css'
import { useContext, useState} from "react";
import LogIn from "../Login/LogIn";
import SignUp from "../Signup/SignUp";
import AuthContext from "../../store/auth-context";

const Dropdown = () =>{
    const loginCtx = useContext(AuthContext);

    const [dropdown, setDropdown] = useState(false);
    const [login, setLogin] = useState(false);
    const [signup, setSignup] = useState(false);

    const onClickHandlerLogin =()=> {
        setDropdown(false);
        setLogin(true);
    }

    const hideLogin =() => {
         setLogin(false);
    }

    const onClickHandlerCreateAccount =()=> {
        setSignup(true);
    }

    const hideSignup =() => {
        setSignup(false);
    }

    const onClickHandlerLogOut=()=> {
        localStorage.clear();
        loginCtx.onLogout();
    }

    return(
        <div>
            <ul className={dropdown ? "services-submenu clicked" : "services-submenu"} onClick={() => setDropdown(!dropdown)}>
                <li>
                    {!loginCtx.isAuthenticated &&<div  className="submenu-item" onClick={onClickHandlerLogin} >Log in</div>}
                    {!loginCtx.isAuthenticated && <div  className="submenu-item" onClick={onClickHandlerCreateAccount}>Create account</div>}
                    {loginCtx.isAuthenticated && <div  className="submenu-item" onClick={onClickHandlerLogOut}>Log out</div>}

                </li>
            </ul>
        {login && <LogIn onClick={hideLogin}/>}
        {signup && <SignUp onClick={hideSignup}/>}
        </div>
    );
}

export default Dropdown;