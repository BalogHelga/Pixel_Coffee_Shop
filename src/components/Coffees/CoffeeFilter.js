import classes from './CoffeeFilter.module.css';

function CoffeeFilter(props)
{
    function dropdownChangeHandler(event) {
        props.onChangeFilter(event.target.value);
    }

    return (
        <div className={classes.form}>
                <label> Filter by price</label>
                <select value={props.selected} onChange={dropdownChangeHandler}>
                    <option value='-'>------------</option>
                    <option value='ascending'>Ascending price</option>
                    <option value='descending'>Descending price</option>
                </select>
        </div>

    );
}
export default CoffeeFilter;