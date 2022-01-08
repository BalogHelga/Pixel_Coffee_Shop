import {Fragment} from "react";
import CoffeesSummary from "./CoffeesSummary";
import AvailableCoffees from "./AvailableCoffees";

const Coffees = () =>
{
    return(
        <Fragment>
            <CoffeesSummary/>
            <AvailableCoffees/>
        </Fragment>
    );

}
export default Coffees;
