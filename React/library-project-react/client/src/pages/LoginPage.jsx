import React, { useContext } from 'react'
// import {LoginForm} from '../components/LoginForm.jsx'
import { UserContext } from '../context/user.context.jsx'
import { useNavigate } from 'react-router-dom'
import LoginForm from '../components/LoginForm.jsx'

function LoginPage(props) {
    const {login} = useContext(UserContext)
    const navigate = useNavigate();
    
    const handleLogin = async(username, password) => {
        const response = await login(username, password);
        response === true ? navigate('/search-books') : navigate('/error');
    }
  return (
    <div>
        <LoginForm handleLogin={handleLogin}> </LoginForm>
    </div>
  )
}

export default LoginPage