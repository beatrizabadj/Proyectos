import React, { useContext } from 'react'
import {UserContext} from '../context/user.context';
import { Navigate } from 'react-router-dom';

function MyLibraryPage() {
    const {user, setUser} = useContext(UserContext)
    if(!user.isLoggedIn) return <Navigate to ={"/login"} />
   
  return (
    <div>MyLibraryPage</div>
  )
}

export default MyLibraryPage