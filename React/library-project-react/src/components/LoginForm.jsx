import React, { useState } from 'react'

function LoginForm({handleLogin}) {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleUsernameInput = (e) => {
        setUsername(e.target.value);
    };

    const handlePasswordInput = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        handleLogin(username, password);
    };

  return (
    <form onSubmit={handleSubmit}>
        <fieldset>
            <label htmlFor="username">Username: </label>
            <input type="text" id="username" minLength={1} onChange={handleUsernameInput} />
        </fieldset>
        <fieldset>
            <label htmlFor="password">Password: </label>
            <input type="password" id="password" minLength={8} onChange={handlePasswordInput} />
        </fieldset>
        <button>Login</button>
    </form>
  )
}

export default LoginForm