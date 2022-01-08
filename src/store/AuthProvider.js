import AuthContext from './auth-context'
import { useState} from "react";

const defaultAuthState = {
    isAuthenticated:false,
    username:'',
    token: ''
}

const AuthProvider = (props) =>{
    const [isLoggedIn, setIsLoggedIn] = useState(defaultAuthState)

    const loginHandler = async (username, password) =>{

        setIsLoggedIn({
            isAuthenticated:true,
            username:username,
            token:''
        });

    };

    const logoutHandler = () => {
        setIsLoggedIn({
            isAuthenticated:false,
            username:'',
            token:''
        });
    };

    const authContext = {
        isAuthenticated: isLoggedIn.isAuthenticated,
        token: isLoggedIn.token,
        username:isLoggedIn.username,
        onLogin: loginHandler,
        onLogout: logoutHandler
    };

    return <AuthContext.Provider value={authContext}>
        {props.children}
    </AuthContext.Provider>
}

export default AuthProvider;