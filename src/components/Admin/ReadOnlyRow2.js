import React from "react";

const ReadOnlyRow2 =({ order , handleDeleteClick})=> {
    return (
        <tr>
            <td>{order.userData}</td>
            <td>{order.orderedProducts}</td>
            <td>
                <button
                    type="button"
                    onClick={()=> handleDeleteClick(order)}>
                    Send Order
                </button>
                <button
                    type="button" onClick={() => handleDeleteClick(order)}> Reject </button>
            </td>
        </tr>
    );
};
export default ReadOnlyRow2;