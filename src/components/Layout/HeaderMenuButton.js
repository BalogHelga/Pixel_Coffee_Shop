import classes from './HeaderMenuButton.module.css'
import menuIcon from './lines.png';
import Dropdown from "./Dropdown";
import {useState} from "react";

const HeaderMenuButton = () => {

    const [dropdown, setDropdown] = useState(false);

    return(
        <ul className={classes.ul} onMouseEnter={()=>{setDropdown(true)}} onMouseLeave={() =>{setDropdown(false)}}>
            <button className={classes.button} >
            <span className={classes.img}>
                <img src={menuIcon} width="25" height="25" alt=''/>
            </span>
            </button>
            {dropdown && <Dropdown />}
        </ul>
    );
}
export default HeaderMenuButton;