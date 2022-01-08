import classes from './AvailableCoffees.module.css';
import Card from "../UI/Card";
import CoffeeItem from "./CoffeeItem/CoffeeItem";
import Search from "../UI/Search";
import {useEffect, useState} from "react";
import CoffeeFilter from "./CoffeeFilter";

const AvailableCoffees = () => {
    const [coffees, setCoffees] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState(null);
    const [allCoffees, setAllCoffeess] = useState([]);

    useEffect(() =>
    {   const fetchCoffees = async () => {
        const response = await fetch('http://localhost:8080/api/product/getAll');

        if(!response.ok) {
            throw new Error('Something went wrong!');
        }
        const responseData = await response.json();

        const loadedCoffees = [];
        for(const key in responseData) {
            loadedCoffees.push({
                id: key,
                name: responseData[key].name,
                description: responseData[key].description,
                price: responseData[key].price
            });
        }
        setCoffees(loadedCoffees);
        setAllCoffeess(loadedCoffees);
        setIsLoading(false);
    };
        fetchCoffees().catch(error => {
            setIsLoading(false);
            setHttpError(error.message);
        });

    },[]);

    const [filteredPrice, setFilteredPrice] = useState('-');

    if(isLoading) {
        return <section className={classes.MealsLoading}>
            <p>Loading...</p>
        </section>
    }
    if(httpError) {
        return <section className={classes.MealsError}>
            <p>{httpError}</p>
        </section>
    }

    const coffeesList = coffees.map((coffee) =>
        <CoffeeItem
            key={coffee.id}
            id={coffee.id}
            name={coffee.name}
            description={coffee.description}
            price={coffee.price}
        />);


    function filterByName(name) {
        setCoffees(() => {
            return allCoffees.filter(coffee => {
                return coffee.name.toLowerCase().includes(name.toLowerCase());
            })
        })
    }

    function filterChangeHandler(selectedOrder) {
        setFilteredPrice(selectedOrder);

        if(selectedOrder === 'ascending') {
            const asc = coffees.sort((a,b) => {if(a.price < b.price) return -1; return 1});
            setCoffees(asc);
        }
        else if(selectedOrder === 'descending'){
            const desc = coffees.sort((a,b) => {if(a.price > b.price) return -1; return 1;});
            setCoffees(desc);
        }
    }

    return (
        <section className={classes.coffee}>
            <Card>
                <div>
                    <Search onInputName={filterByName}/>
                    <CoffeeFilter selected={filteredPrice} onChangeFilter={filterChangeHandler}/>
                </div>
                <hr/>
                <ul>{coffeesList}</ul>
            </Card>
        </section>
    );
};

export default AvailableCoffees;