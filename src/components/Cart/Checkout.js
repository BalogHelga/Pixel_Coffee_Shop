import classes from './Checkout.module.css';
import {useRef, useState} from "react";

const isEmpty = value => value.trim() ==='';
const isNotFiveChars = value => value.trim().length !== 5;
const Checkout = (props) => {
    const [formValidity, setFormValidity] = useState({
        name: true,
        street:true,
        city:true,
        postal:true
    });

    const nameInput = useRef();
    const streetInput = useRef();
    const postalInput = useRef();
    const cityInput = useRef();

    const confirmHandler = (event) => {
        event.preventDefault();

        const enteredName = nameInput.current.value;
        const enteredStreet = streetInput.current.value;
        const enteredPostal = postalInput.current.value;
        const enteredCity = cityInput.current.value;

        const enteredNameIsValid = !isEmpty(enteredName);
        const enteredStreetIsValid = !isEmpty(enteredStreet);
        const enteredCityIsValid = !isEmpty(enteredCity);
        const enteredPostalIsValid =!isNotFiveChars(enteredPostal);

        setFormValidity({
           name: enteredNameIsValid,
           street: enteredStreetIsValid,
           city: enteredCityIsValid,
           postal: enteredPostalIsValid
        });

        const formIsValid = enteredNameIsValid && enteredStreetIsValid && enteredCityIsValid && enteredPostalIsValid;

        if(!formIsValid) {
           return;
        }
        props.onConfirm({
            name: enteredName,
            street: enteredStreet,
            city: enteredCity,
            postal: enteredPostal
        });
    };

    return (
        <form className={classes.form} onSubmit={confirmHandler}>
            <div className={`${classes.control} ${formValidity.name ? '' : classes.invalid}`}>
                <label htmlFor='name'>Your Name</label>
                <input type='text' id='name' ref={nameInput} />
                {!formValidity.name && <p>Please enter a valid name!</p>}
            </div>
            <div className={`${classes.control} ${formValidity.street ? '' : classes.invalid}`}>
                <label htmlFor='street'>Street</label>
                <input type='text' id='street' ref={streetInput} />
                {!formValidity.street && <p>Please enter a valid street!</p>}
            </div>
            <div className={`${classes.control} ${formValidity.postal ? '' : classes.invalid}`}>
                <label htmlFor='postal'>Postal Code</label>
                <input type='text' id='postal' ref={postalInput}/>
                {!formValidity.postal && <p>Please enter a valid postal code!(5 numbers)</p>}
            </div>
            <div className={`${classes.control} ${formValidity.city ? '' : classes.invalid}`}>
                <label htmlFor='city'>City</label>
                <input type='text' id='city' ref={cityInput}/>
                {!formValidity.city && <p>Please enter a valid city!</p>}
            </div>
            <div className={classes.actions}>
                <button type='button' onClick={props.onCancel}>
                    Cancel
                </button>
                <button className={classes.submit}>Confirm</button>
            </div>
        </form>
    );
};

export default Checkout;