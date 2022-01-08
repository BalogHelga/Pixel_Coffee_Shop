import classes from './Cart.module.css';
import {Fragment, useContext, useState} from "react";
import Modal from "../UI/Modal";
import CartContext from "../../store/cart-context";
import CartItem from "./CartItem";
import Checkout from "./Checkout";
import AuthContext from "../../store/auth-context";

const Cart = (props) => {
    const [isCheckout, setIsCheckout] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [didSubmit, setDidSubmit] = useState(false);

    const cartCtx = useContext(CartContext);
    const loginCtx = useContext(AuthContext);

    let totalAmount = cartCtx.totalAmount;
    if(loginCtx.isAuthenticated) {
         totalAmount -= totalAmount / 5;
    }
    totalAmount = totalAmount.toFixed(2);
    totalAmount += ' lei';
    const hasItems = cartCtx.items.length > 0;

    const cartItemRemoveHandler = id =>{
        cartCtx.removeItem(id);
    };

    const cartItemAddHandler = item =>{
        cartCtx.addOneItem(item);
    }

    const orderHandler=()=>{
        setIsCheckout(true);
    }

    const submitOrderHandler = async (userData) => {
        let userDataString = "";
        userDataString += "Username: "+ userData.name + ", Street:" + userData.street + ", City: " + userData.city + ", Postal code: " + userData.postal;
        let orderedItemsString = "";
        for(const i in cartCtx.items) {
            let itemString = "";
            itemString += "Product: " + cartCtx.items[i].name + ", Amount:" + cartCtx.items[i].amount + ", Price:" + cartCtx.items[i].price;
            orderedItemsString += itemString + "------\n";
        }
        orderedItemsString += "Total price " + cartCtx.totalAmount.toFixed(2);

        setIsSubmitting(true);

       await fetch('http://127.0.0.1:8080/api/orders/addOrder', {
           method:'POST',
           headers: { 'Content-Type': 'application/json' },
           body:JSON.stringify({
               id:userData.id,
               userData: userDataString,
               orderedProducts: orderedItemsString
           })
       });
       setIsSubmitting(false);
       setDidSubmit(true);
       cartCtx.clearCart();
    };

    const cartItems = <ul className={classes['cart-items']}>
        {cartCtx.items.map((item) =>
            <CartItem key={item.id}
                      name={item.name}
                      amount={item.amount}
                      price={item.price}
                      onRemove={cartItemRemoveHandler.bind(null,item.id)}
                      onAdd={cartItemAddHandler.bind(null, item)}/>)}
            </ul>;


    const modalActions = <div className={classes.actions}>
        <button className={classes['button--alt']} onClick={props.onClose}>Close</button>
        {hasItems && <button className={classes.button} onClick={orderHandler}>Order</button>}
    </div>

    const cartModalContent = <Fragment>
        {cartItems}
        <div className={classes.total}>
            <span>Total Amount</span>
            <span>{totalAmount}</span>
        </div>
        {loginCtx.isAuthenticated && <p>20% discount for having an account</p>}
        {isCheckout &&<Checkout onConfirm={submitOrderHandler} onCancel={props.onClose}/>}
        {!isCheckout && modalActions}
    </Fragment>

    const isSubmittingModalContent = <p>Sending order data...</p>;

    const didSubmitModalContent = <Fragment>
        <p>Successfully sent the order!</p>
        <div className={classes.actions}>
            <button className={classes.button} onClick={props.onClose}>Close</button>
        </div>
    </Fragment>;

    return (
        <Modal onClose={props.onClose}>
            {!isSubmitting && !didSubmit && cartModalContent}
            {isSubmitting && isSubmittingModalContent}
            {!isSubmitting && didSubmit && didSubmitModalContent}
        </Modal>
    );
}
export default Cart;