import loginService from '../services/login'
import  { notificationError } from './notificationReducer'
const initialState = null

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
  case 'SET_USER':
    return action.user
  case 'LOGOUT_USER':
    return action.user
  default:
    return state
  }
}

export const setUser = (username, password) => {
  return async dispatch => {
    try {
      const user = await loginService.login({ username, password })
      localStorage.setItem('user', JSON.stringify(user))
      dispatch({
        type: 'SET_USER',
        user
      })
    } catch (err) {
      dispatch(notificationError(`${err.response.data.error}`, 4000))
    }
  }
}

export const logoutUser = () => {
  localStorage.removeItem('user')
  return {
    type: 'LOGOUT_USER',
    user: null
  }
}

export default loginReducer