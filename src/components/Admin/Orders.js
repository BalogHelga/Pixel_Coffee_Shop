import {Fragment, useEffect, useState} from "react";
import classes from "./CoffeeTable.module.css";
import classes2 from '../Login/LogIn.module.css'
import ReadOnlyRow2 from "./ReadOnlyRow2";
import HeaderOrders from "./HeaderOrders";
import Modal from "../UI/Modal";

const Orders =() =>{
    const [orders, setOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState(null);
    const [isSent, setIsSent] = useState(false);

    useEffect(() =>
    {   const fetchOrders = async () => {
        const response = await fetch('http://localhost:8080/api/orders/getAll');

        if(!response.ok) {
            throw new Error('Something went wrong!');
        }

        const responseData = await response.json();

        const loadedOrders = [];
        for(const key in responseData) {
            loadedOrders.push({
                id: responseData[key].id,
                userData: responseData[key].userData,
                orderedProducts: responseData[key].orderedProducts
            });
        }
        setOrders(loadedOrders);
        setIsLoading(false);
    };
        fetchOrders().catch(error => {
            setIsLoading(false);
            setHttpError(error.message);
        });

    },[]);

    if(isLoading) {
        return <div className={classes.div}>
            <p>Loading...</p>
        </div>
    }
    if(httpError) {
        return <div className={classes.div}>
            <p>{httpError}</p>
        </div>
    }
    async function deleteOrderHandler(order){
        await fetch('http://localhost:8080/api/orders/deleteOrder/'+order.id,
            {
                method: 'DELETE',
                body: JSON.stringify( {
                    id:order.id,
                    userData: order.userData,
                    orderedProducts: order.orderedProducts}
                ),
                headers:{
                    'Content-Type': 'application/json'
                }
            })
    }

    const handleDeleteClick = (order) => {
        const newOrders = [...orders];
        const index = orders.findIndex((order2) => order2.id === order.id);
        newOrders.splice(index, 1);
        setOrders(newOrders);
        deleteOrderHandler(order).then(r => console.log("done"));
        setIsSent(true);
    }

    const closeNotification = ()=> {
        setIsSent(false);
    }
    const isSendNotification = <Fragment>
        <Modal >
        <form className={classes2.form}>
            <p>Action made with success!</p>
            <button type='button' onClick={closeNotification}> Close </button>
        </form>
        </Modal>
    </Fragment>

    return (
        <Fragment>
        <HeaderOrders/>
        <div className={classes.flTable}>
            <form >
                <table>
                    <thead>
                    <tr>
                        <th>UserData</th>
                        <th>Products</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {orders.map((order)=>(
                        <Fragment>
                            <ReadOnlyRow2
                                order={order}
                                handleDeleteClick={handleDeleteClick}
                            />
                        </Fragment>
                    ) )}
                    </tbody>
                </table>
            </form>
        </div>
        {isSent && isSendNotification}
        </Fragment>
    );
}

export default Orders;