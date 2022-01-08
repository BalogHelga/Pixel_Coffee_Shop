import {Route, Routes} from "react-router-dom";
import App from "./App";
import Admin from "./components/Admin/Admin";
import Orders from "./components/Admin/Orders";


function MyRoute()
{
    return(
        <Routes>
            <Route exact path='/' element={<App/>} />
            <Route exact path='/admin' element={<Admin/>} />
            <Route exact path='/orders' element={<Orders/>} />
        </Routes>
    );
}
export default MyRoute;