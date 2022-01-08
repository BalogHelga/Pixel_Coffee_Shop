import React from "react";

const AuthContext = React.createContext({
    isAuthenticated: false,
    username:'',
    token: '',
    onLogin: (name,password) => {},
    onLogout:() => {}
});

export default AuthContext;