import classes from './SignUp.module.css'
import Modal from "../UI/Modal";
import {useRef, useState, Fragment} from "react";

const isEmpty = value => value.trim() ==='';
const isNotMoreThenFiveChars = value => value.trim().length < 5;
const SignUp = (props) =>
{
    const [formValidity, setFormValidity] = useState({
        name: true,
        address: true,
        password:true,
        email: true,
        phone: true
    });
    const [isSigning, setIsSigning] = useState(false);
    const [didSign, setDidSign] = useState(false);
    const [isBadName, setIsBadName] = useState(false);

    const nameInput = useRef();
    const addressInput = useRef();
    const passwordInput = useRef();
    const emailInput = useRef();
    const phoneInput = useRef();

    const signUpHandler = async (event) => {
        event.preventDefault();

        const enteredName = nameInput.current.value;
        const enteredAddress = addressInput.current.value;
        const enteredPass = passwordInput.current.value;
        const enteredEmail = emailInput.current.value;
        const enteredPhone = phoneInput.current.value;

        const enteredNameIsValid = !isNotMoreThenFiveChars(enteredName);
        const enteredAddressIsValid = !isEmpty(enteredAddress);
        const enteredPassIsValid = !isNotMoreThenFiveChars(enteredPass);
        const enteredEmailIsValid = !isEmpty(enteredEmail);
        const enteredPhoneIsValid = !isEmpty(enteredPhone);

        setFormValidity({
                name: enteredNameIsValid,
                address: enteredAddressIsValid,
                password: enteredPassIsValid,
                email: enteredEmailIsValid,
                phone: enteredPhoneIsValid
            });

        const formIsValid = enteredNameIsValid && enteredPassIsValid && enteredAddressIsValid && enteredEmailIsValid &&enteredPhoneIsValid;

        if (!formIsValid) {
            return;
        }
        else{
           const response =  await fetch('http://127.0.0.1:8080/api/users/newClient', {
                method:'POST',
                headers: {'Access-Control-Allow-Origin': 'application/json',
                    'Accept': 'application/json',
                    'Content-Type': 'application/json' },
                body:JSON.stringify({
                    username: enteredName,
                    address: enteredAddress,
                    password: enteredPass,
                    email:enteredEmail,
                    phone_number: enteredPhone
                })
            }).catch(() => {
               setIsSigning(true);
               return;
           });

           if(response.status === 404) {
               setIsBadName(true);
           }
           else {
               setIsSigning(false);
               setDidSign(true);

           }
        }
    }

    const signModalContent =
        <Fragment>
            <form className={classes.form} onSubmit={signUpHandler}>
                <div className={classes.form}>
                    <div><label>Create Your Account</label></div>
                    <div className={`${classes.control} ${formValidity.name ? '' : classes.invalid}`}>
                        <input placeholder="Name" ref={nameInput}/>
                        {!formValidity.name && <p>Please enter a valid name!(min 6 characters)</p>}
                    </div>
                    <div className={`${classes.control} ${formValidity.password ? '' : classes.invalid}`}>
                        <input type="password" placeholder="Password" ref={passwordInput}/>
                        {!formValidity.password && <p>Please enter a valid password!(min 6 characters)</p>}
                    </div>
                    <div className={`${classes.control} ${formValidity.address ? '' : classes.invalid}`}>
                        <input placeholder="Address" ref={addressInput}/>
                        {!formValidity.name && <p>Please enter a valid address!</p>}
                    </div>
                    <div className={`${classes.control} ${formValidity.email ? '' : classes.invalid}`}>
                        <input placeholder="Email" ref={emailInput}/>
                        {!formValidity.name && <p>Please enter a valid email!</p>}
                    </div>
                    <div className={`${classes.control} ${formValidity.phone ? '' : classes.invalid}`}>
                        <input placeholder="Phone Number" ref={phoneInput}/>
                        {!formValidity.phone && <p>Please enter a valid phone number!</p>}
                    </div>
                    <div>
                        <button > Sign Up </button>
                        <button type='button' onClick={props.onClick}> Close </button>
                        {isBadName && <p>The username already exists</p>}
                    </div>
                </div>
            </form>
        </Fragment>

    const isSigningModalContent =<p>Sending your new account data...</p>

    const didSignModalContent =
        <Fragment>
            <form className={classes.form}>
                <p>Your account has been created! </p>
                <p>Please log into your new account!</p>
                <button type='button' onClick={props.onClick}> Close </button>
            </form>
        </Fragment>

    return(
        <Modal onClose={props.onClick}>
            {!isSigning && !didSign && signModalContent}
            {isSigning && isSigningModalContent}
            {!isSigning && didSign && didSignModalContent}
        </Modal>
    );
}

export default SignUp;