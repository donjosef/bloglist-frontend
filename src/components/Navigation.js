import React from 'react'
import { useDispatch } from 'react-redux'
import { logoutUser } from '../reducers/loginReducer'

import { Nav, StyledLink, Links} from '../styled-components'

const Navigation = ({ user }) => { //impostare style flex per allineare link da fare!!!
  const dispatch = useDispatch()

  return (
    <Nav>
      <Links>
        <StyledLink to='/'>Blogs</StyledLink>
        <StyledLink to='/users'>Users</StyledLink>
      </Links>
      <p>
        <span style={{ marginRight: 10 }}>{user.username} logged in</span>
        <button onClick={() => dispatch(logoutUser())}>Logout</button>
      </p>
    </Nav>
  )
}

export default Navigation
