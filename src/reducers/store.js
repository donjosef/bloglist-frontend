import { createStore, combineReducers, applyMiddleware } from 'redux'
import blogsReducer from './blogsReducer'
import usersReducer from './usersReducer'
import notificationReducer from './notificationReducer'
import loginReducer from './loginReducer'
import thunk from 'redux-thunk'

const reducer = combineReducers({
  notification: notificationReducer,
  blogs: blogsReducer,
  users: usersReducer,
  user: loginReducer
})

const store = createStore(reducer, applyMiddleware(thunk))

export default store