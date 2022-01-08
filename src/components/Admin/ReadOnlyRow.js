import React from "react";

const ReadOnlyRow =({ contact , handleEditClick, handleDeleteClick})=> {
    return (
        <tr>
            <td>{contact.name}</td>
            <td>{contact.description}</td>
            <td>{contact.price}</td>
            <td>
                <button
                    type="button"
                    onClick={(event)=> handleEditClick(event, contact)}>
                    Edit
                </button>
                <button
                    type="button" onClick={() => handleDeleteClick(contact)}> Delete </button>
            </td>
        </tr>
    );
};
export default ReadOnlyRow;