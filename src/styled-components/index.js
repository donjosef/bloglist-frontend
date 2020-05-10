import styled from 'styled-components'
import { Link } from 'react-router-dom'

export const LoginWrapper = styled.div`
  height: 100vh;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`

export const LoginButton = styled.button`
  padding: 6px 12px;
  background: #43A6EB;
  text-transform: uppercase;
  border: none;
  color: white;
  border-radius: 2px;
  margin-top: 12px;
`

export const NewBlogButton = styled(LoginButton)`
  margin-top: 0;
  cursor: pointer;
`

export const CreateButton = styled(NewBlogButton)`
  background: #77d35b;
  margin-top: 7px;
`

export const CancelButton = styled(NewBlogButton)`
  background: red;
  margin-top: 7px;
`

export const Nav = styled.nav`
  display: flex;
  padding: 10px 20px;
  background: #acadc4;
  align-items: center;
  margin-bottom: 20px;
`

export const Links = styled.div`
  flex-grow: 1
`

export const StyledLink = styled(Link)`
 margin-right: 10px;
 color: black;
 text-decoration: none;
 text-transform: uppercase;
 :hover {
   text-decoration: underline;
 }
`