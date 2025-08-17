import React, { createContext, useState } from 'react'

const UserContext = createContext();

function UserProviderWrapper(props){
    const [user, setUser] = useState({
        username: 'bea',
        password: '12345678',
        isLoggedIn: false,
    });

    const login = async(username, password) => {
        if (username === user.username && password === user.password) {
            setUser({...user, isLoggedIn: true});
            return true;
        }
        return false;
    }
  return (
    <UserContext.Provider value={{user, setUser, login}}> 
        {props.children}
    </UserContext.Provider>
  )
}

export {UserProviderWrapper, UserContext};