import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { BrowserRouter, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './reducers/store'

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Route>
        <App />
      </Route>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
)