import classes from "./Search.module.css";
import {useState} from "react";

function Search(props) {
    const [name,setName] = useState('');

    function submitHandler(event){
        event.preventDefault();
        props.onInputName(name);
        setName('');
    }

    function nameHandler(event){
        setName(event.target.value);
    }

    return (
        <div className={classes.form}>
            <form onSubmit={submitHandler}>
                <input placeholder="Enter the product's name" value={name} type='text' onChange={nameHandler}/>
                <button  type='submit'>Search</button>
            </form>
        </div>
    );
}

export default Search;