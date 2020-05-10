import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { setUser } from '../reducers/loginReducer'
import { LoginWrapper, LoginButton} from '../styled-components'

const LoginForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()

  const handleLogin = (e) => {
    e.preventDefault()
    dispatch(setUser(username, password))
  }

  return (
    <LoginWrapper>
      <h2>Login to application</h2>
      <form className="login-form" onSubmit={handleLogin}>
        <div className="login-form__control">
          <label htmlFor="username">Username: </label>
          <input id="username" type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </div>
        <div className="login-form__control">
          <label htmlFor="password">Password: </label>
          <input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <LoginButton id="login-btn">Login</LoginButton>
      </form>
    </LoginWrapper>
  )
}

export default LoginForm
