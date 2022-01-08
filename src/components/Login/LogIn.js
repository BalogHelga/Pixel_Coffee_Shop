import Modal from "../UI/Modal";
import classes from './LogIn.module.css'
import {useRef, useState, useContext, Fragment} from "react";
import AuthContext from "../../store/auth-context";
import {Navigate} from "react-router-dom";

const isEmpty = value => value.trim() ==='';

const LogIn = (props) => {
    const loginCtx = useContext(AuthContext);

    const [formValidity, setFormValidity] = useState({
        name: true,
        password:true
    });

    const[isLogging, setIsLogging] = useState(false);
    const [didLog, setDidLog] = useState(false);
    const [isNotLog, setIsNotLog] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);

    const nameInput = useRef();
    const passwordInput = useRef();

    const loginHandler = async(event) => {
        event.preventDefault();

        const enteredName = nameInput.current.value;
        const enteredPass = passwordInput.current.value;

        if(enteredName.trim() === "admin" && enteredPass.trim() ==="admin") {
            console.log("aas");
            setIsAdmin(true);
        }

        const enteredNameIsValid = !isEmpty(enteredName);
        const enteredPassIsValid = !isEmpty(enteredPass);

        setFormValidity({
                name: enteredNameIsValid,
                password: enteredPassIsValid
            });

        const formIsValid = enteredNameIsValid && enteredPassIsValid;

        if(!formIsValid) {
            return;
        }
        else{
         const response = await fetch('http://127.0.0.1:8080/api/users/checkUser', {
                method:'POST',
                headers: {
                    'Access-Control-Allow-Origin': 'application/json',
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body:JSON.stringify({
                    username:enteredName,
                    password:enteredPass
                })
            }).catch(() => {
                 setIsLogging(true);
                 return;
             }
         );

            if(response.status === 202) {
                setIsLogging(false);
                setDidLog(true);
                loginCtx.onLogin(enteredName, enteredPass);
                localStorage.setItem("token",enteredName);
            }
            else {
                setIsNotLog(true);
            }
        }
    }

    const logInModalContent =
        <Fragment>
            <form className={classes.form} onSubmit={loginHandler}>
                <div className={classes.form}>
                    <div><label>Log Into Your Account</label></div>
                    <div className={`${classes.control} ${formValidity.name ? '' : classes.invalid}`}>
                        <input placeholder="Name" ref={nameInput}/>
                        {!formValidity.name && <p>Please enter a valid name!</p>}
                    </div>
                    <div className={`${classes.control} ${formValidity.password ? '' : classes.invalid}`}>
                        <input type="password" placeholder="Password" ref={passwordInput}/>
                        {!formValidity.password && <p>Please enter a valid password!</p>}
                    </div>
                    <div>
                        <button > Log in </button>
                        <button type='button' onClick={props.onClick}> Close </button>
                        {isNotLog && <p>Please enter username and password that match!</p>}
                    </div>
                </div>
            </form>
        </Fragment>

    const isLoggingInModalContent = <p>Sending log in data...</p>

    const didLogInModalContent =
        <Fragment>
            <form className={classes.form}>
            <p>Successfully logged into your account!</p>
                <button type='button' onClick={props.onClick}> Close </button>
            </form>
        </Fragment>

    return(
        <Fragment>
            {isAdmin && <Navigate to="/"/>}
            <Modal onClose={props.onClick}>
                {!isLogging && !didLog && logInModalContent}
                {isLogging && isLoggingInModalContent}
                {!isLogging && didLog && didLogInModalContent}
            </Modal>
        </Fragment>
    );
}
export default LogIn;
