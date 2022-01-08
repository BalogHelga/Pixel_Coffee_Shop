import React from "react";

const EditableRow =({
                        editFormData,
                        handleEditFormChange ,
                        handleCancelClick
                    })=>
{
    return(
        <tr>
            <td>
                <input
                    type="text"
                    required="required"
                    placeholder="Enter a name.."
                    name ="name"
                    value = {editFormData.name}
                    onChange = {handleEditFormChange}>
                </input>
            </td>
            <td>
                <input type="text"
                       required="required"
                       placeholder="Enter the description"
                       name ="description"
                       value={editFormData.description}
                       onChange = {handleEditFormChange}>
                </input>
            </td>
            <td>
                <input type="text"
                       required="required"
                       placeholder="Enter the price"
                       name ="price"
                       value ={editFormData.price}
                       onChange = {handleEditFormChange}>
                </input>
            </td>
            <td>
                <button type="submit" > Save</button>
                <button type="submit" onClick={handleCancelClick}> Cancel</button>
            </td>
        </tr>

    );
};
export  default  EditableRow;