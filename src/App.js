import React, { useEffect } from 'react'
import Blog from './components/Blog'
import FullBlog from './components/FullBlog'
import Toggle from './components/Toggle'
import LoginForm from './components/LoginForm'
import NewBlogForm from './components/NewBlogForm'
import Notification from './components/Notification'
import Navigation from './components/Navigation'
import User from './components/User'
import FullUser from './components/FullUser'

import { useSelector, useDispatch } from 'react-redux'
import { initBlogs, removeBlog, updateBlog } from './reducers/blogsReducer'
import { initUsers } from './reducers/usersReducer'

import { Route, useRouteMatch } from 'react-router-dom'

import { NewBlogButton, CancelButton } from './styled-components'

const App = () => {
  const blogs = useSelector(state => state.blogs)
  const users = useSelector(state => state.users)
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()
  const blogMatch = useRouteMatch('/blogs/:blogId')
  const userMatch = useRouteMatch('/users/:userId')

  //blog to be passed to FullBlog component that will render that specific blog object
  const fullBlog = blogMatch ? blogs.find(blog => blog.id === blogMatch.params.blogId) : null
  const fullUser = userMatch ? users.find(user => user.id === userMatch.params.userId) : null

  useEffect(() => {
    dispatch(initBlogs())
    dispatch(initUsers())
  }, [])

  useEffect(() => {
    const user = localStorage.getItem('user')
    if (user) {
      dispatch({
        type: 'SET_USER',
        user: JSON.parse(user)
      })
    }
  }, [])

  const handleUpdateBlog = async (blog) => {
    dispatch(updateBlog(blog))
  }

  const handleDeleteBlog = async (blogId) => {
    dispatch(removeBlog(blogId, user))
  }

  return (
    <div>
      <Notification />
      {!user ? (
        <LoginForm />
      ) : (
        <>
          <Navigation user={user}/>
          <Toggle>
            {
              ({ visible, setVisible }) => {
                let output = <NewBlogButton onClick={() => setVisible(true)}>New blog</NewBlogButton>

                if(visible) {
                  output = (
                    <>
                      <NewBlogForm user={user} onHideForm={() => setVisible(false)}/>
                      <CancelButton onClick={() => setVisible(false)}>Cancel</CancelButton>
                    </>
                  )
                }

                return output
              }
            }
          </Toggle>
          <Route exact path='/'>
            <h2>blogs</h2>
            {blogs.sort((blogA, blogB) => blogB.likes - blogA.likes).map(blog => (
              <Blog key={blog.id} blog={blog} />
            ))}
          </Route>
          <Route path='/blogs/:blogId'>
            <FullBlog
              blog={fullBlog}
              onUpdateBlogLike={handleUpdateBlog}
              onDeleteBlog={handleDeleteBlog}
              loggedInUser={user.username}/>
          </Route>
          <Route exact path='/users'>
            <h2>users</h2>
            {users.map(user => <User key={user.id} user={user}/>)}
          </Route>
          <Route path='/users/:userId'>
            <FullUser user={fullUser}/>
          </Route>
        </>
      )}
    </div>
  )
}

export default App