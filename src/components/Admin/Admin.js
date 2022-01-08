import {Fragment} from "react";
import HeaderAdmin from "./HeaderAdmin";
import CoffeeTable from "./CoffeeTable";

const Admin =()=>
{
    return (
        <Fragment >
            <HeaderAdmin/>
            <main>
                <CoffeeTable/>
            </main>
        </Fragment>
    );
}
export default Admin;