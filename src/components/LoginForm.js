import React, { useState } from 'react'

const LoginForm = ({ onLogin }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = (e) => {
    e.preventDefault()

    onLogin({
      username,
      password
    })
  }
  return (
    <div>
      <h2>Login to application</h2>
      <form className="login-form" onSubmit={handleLogin}>
        <div className="login-form__control">
          <label htmlFor="username">Username</label>
          <input id="username" type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </div>
        <div className="login-form__control">
          <label htmlFor="password">Password</label>
          <input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button id="login-btn">Login</button>
      </form>
    </div>
  )
}

export default LoginForm
