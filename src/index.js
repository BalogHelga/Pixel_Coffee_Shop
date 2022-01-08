import ReactDOM from 'react-dom';

import './index.css';
import {BrowserRouter} from "react-router-dom";

import MyRoute from "./MyRoute";

ReactDOM.render(
    <BrowserRouter>
        <MyRoute/>
    </BrowserRouter>,
    document.getElementById('root')
);