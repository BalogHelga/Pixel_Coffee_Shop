import classes from './CoffeesSummary.module.css';
import {useState, useRef, useEffect, useContext, Fragment} from "react";
import Editable from "../UI/Editable";
import AuthContext from "../../store/auth-context";

const CoffeesSummary =() =>
{
    const inputRef = useRef();
    const [task, setTask] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState(null);
    const loginCtx = useContext(AuthContext);

    useEffect(() =>
    {
        const handleSummaryLoad = async () =>{

            const response = await fetch('http://127.0.0.1:8080/api/summary/1');

            if(!response.ok) {
                throw new Error('Something went wrong!');
            }
            const responseData = await response.json();
            setTask(responseData.description);
            setIsLoading(false);
        }
        handleSummaryLoad().catch(error => {
            setIsLoading(false);
            setHttpError(error.message);
        });

    },[]);

    if(isLoading) {
        return <div className={classes.summary}>
            <p>Loading...</p>
        </div>
    }
    if(httpError) {
        return <div className={classes.summary}>
            <p>{httpError}</p>
        </div>
    }

    async function handleSummaryChange(summary){

         await fetch('http://127.0.0.1:8080/api/summary/put', {
            method: 'PUT',
            body: JSON.stringify({
                description: summary
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        setTask(summary);
    }

    return(
    <section className={classes.summary}>
        {loginCtx.username==="admin"?<Editable
                text={task}
                placeholder=""
                childRef={inputRef}
                type="input"
                value={inputRef}
            >
                <input
                    ref={inputRef}
                    type="text"
                    name="task"
                    placeholder=""
                    value={task}
                    onChange={ e => handleSummaryChange(e.target.value)}
                />
            </Editable>:<Fragment >{task}</Fragment>
        }
    </section>
    );
}
export default CoffeesSummary;