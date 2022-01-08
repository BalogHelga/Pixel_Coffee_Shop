import {Fragment,useEffect, useState} from "react";
import classes from './CoffeeTable.module.css'
import classes2 from './ProductsTable.module.css'
import classes3 from '../Login/LogIn.module.css'
import { nanoid } from "nanoid";
import EditableRow from "./EditableRow";
import ReadOnlyRow from "./ReadOnlyRow";
import Modal from "../UI/Modal";


const CoffeeTable = () =>{

    const [coffees, setCoffees] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState(null);

    useEffect(() =>
    {   const fetchCoffees = async () => {
        const response = await fetch('http://localhost:8080/api/products/getAll');

        if(!response.ok) {
            throw new Error('Something went wrong!');
        }

        const responseData = await response.json();

        const loadedCoffees = [];
        for(const key in responseData) {
            loadedCoffees.push({
                id: responseData[key].id,
                name: responseData[key].name,
                description: responseData[key].description,
                price: responseData[key].price
            });
        }
        setCoffees(loadedCoffees);
        setIsLoading(false);
    };
        fetchCoffees().catch(error => {
            setIsLoading(false);
            setHttpError(error.message);
        });

    },[]);

    async function addCoffeeHandler(coffee){
        const response = await fetch('http://localhost:8080/api/products/addProduct', {
            method: 'POST' ,
            body: JSON.stringify({
                name: coffee.name,
                description : coffee.description,
                price : coffee.price
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();
        console.log(data);
    }

    async function  updateCoffeeHandler(coffee){
        const response = await fetch('http://localhost:8080/api/products/put/'+ coffee.id,{
            method: 'PUT',
            body: JSON.stringify({
                name: coffee.name,
                description : coffee.description,
                price : coffee.price
            }),
            headers:{
                'Content-Type': 'application/json'
            }
        })
        const data = await response.json();
        console.log(data);
    }

    async function deleteCoffeeHandler(coffee){
        const response = await fetch('http://localhost:8080/api/products/delete/'+ coffee.id,{
            method: 'DELETE',
            body: JSON.stringify( {
                name: coffee.name,
                description : coffee.description,
                price : coffee.price}
            ),
            headers:{
                'Content-Type': 'application/json'
            }
        })
        const data = await response.json();
        console.log(data);
    }

    const [addFormData, setAddFromData] =useState({
        name:"",
        description:"",
        price:"",
    });

    const [editFormData, setEditFormData] =useState({
        name:"",
        description:"",
        price:"",
    });

    const [editContactId, setEditContactId] = useState(null);

    const [popup, setPopup] = useState(false);

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

    const handleAddFromChange = (event) =>{
        event.preventDefault();
        const fieldName = event.target.getAttribute("name");
        const fieldValue = event.target.value;

        const newFormData = {...addFormData};
        newFormData[fieldName] = fieldValue;
        setAddFromData(newFormData);
    }

    function isNumeric(str) {
        if (typeof str != "string") return false
        return !isNaN(str) && !isNaN(parseFloat(str))
    }

    const handleAddFromSubmit = (event) =>{
        event.preventDefault();
        const newContact ={
            id: nanoid(),
            name: addFormData.name,
            description: addFormData.description,
            price: addFormData.price,
        };
        if( isNumeric(newContact.price)) {
            const newCoffees = [...coffees, newContact];
            setCoffees(newCoffees);
            console.log(newContact);
            addCoffeeHandler(newContact).then(r => console.log("done"));
        }
        else {
            setPopup(true);
        }
    };

    const handleEditFormChange =(event) => {
        event.preventDefault();
        const fieldName = event.target.getAttribute("name");
        const fieldValue = event.target.value;
        const newFormData ={ ...editFormData };
        newFormData[fieldName]=fieldValue;
        setEditFormData(newFormData);
    };

    const handleEditFormSubmit =(event) =>{
        event.preventDefault();
        const editedContact={
            id: editContactId,
            name: editFormData.name,
            description: editFormData.description,
            price: editFormData.price,
        };
        const newCoffees=[...coffees];
        const index = coffees.findIndex( (contact)=> contact.id === editContactId);
        newCoffees[index]= editedContact;
        setCoffees(newCoffees);
        updateCoffeeHandler(editedContact).then(r => console.log("done"));
        setEditContactId(null);
    };

    const handleEditClick = (event, contact) =>{
        event.preventDefault();
        setEditContactId(contact.id);
        const formValues={
            name: contact.name,
            description: contact.description,
            price: contact.price,
        }
        setEditFormData(formValues);
    }

    const handleCancelClick =() =>{
        setEditContactId(null);
    };

    const handleDeleteClick = (contact) =>{
        const newCoffees = [...coffees];
        const index = coffees.findIndex((contact2) => contact2.id === contact.id);

        newCoffees.splice(index, 1);

        setCoffees(newCoffees);
        deleteCoffeeHandler(contact).then(r => console.log("done"));
    };

    const closeNotification=()=> {
        setPopup(false);
    }

    const notANumber = <Fragment>
        <Modal>
            <form className={classes3.form}>
            <p>The price must be an number!</p>
            <button  onClick={closeNotification}>Ok</button>
            </form>
        </Modal>
    </Fragment>

    return (
        <div >
            <form onSubmit={handleEditFormSubmit}>
                <table className={classes2.flTable}>
                    <thead>
                    <tr>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Price</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {coffees.map((contact)=>(
                        <Fragment>
                            { editContactId === contact.id ? (
                                <EditableRow
                                    editFormData ={editFormData}
                                    handleEditFormChange={handleEditFormChange}
                                    handleCancelClick={handleCancelClick}/>
                            ): (
                                <ReadOnlyRow
                                    contact={contact}
                                    handleEditClick={handleEditClick}
                                    handleDeleteClick={handleDeleteClick}/>
                            )}
                        </Fragment>
                    ) )}
                    </tbody>
                </table>
            </form>
            <h2 className={classes.h2}> Add coffee</h2>
            <form className={classes2.flTable} onSubmit={handleAddFromSubmit}>
                <div>
                <input type="text"
                       name="name"
                       required="required"
                       placeholder="Enter name"
                       onChange={handleAddFromChange}
                />
                <input type="text"
                       name="description"
                       required="required"
                       placeholder="Enter description"
                       onChange={handleAddFromChange}
                />
                <input type="text"
                       name ="price"
                       required="required"
                       placeholder="Enter price"
                       onChange={handleAddFromChange}
                />
                <button type="submit"> Add </button>
                </div>
            </form>
            {popup && notANumber}
        </div>
    );
};
export default  CoffeeTable;