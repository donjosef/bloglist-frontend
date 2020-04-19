import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Toggle from './components/Toggle'
import LoginForm from './components/LoginForm'
import NewBlogForm from './components/NewBlogForm'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [successfullMessage, setSuccessfullMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    getBlogs()
  }, [])

  useEffect(() => {
    const user = localStorage.getItem('user')
    if (user) {
      setUser(JSON.parse(user))
    }
  }, [])

  const getBlogs = async () => {
    const blogs = await blogService.getAll()
    setBlogs(blogs)
  }

  const handleLogin = async ({ username, password }) => {
    try {
      const user = await loginService.login({ username, password })
      localStorage.setItem('user', JSON.stringify(user))
      setUser(user)
    } catch (err) {
      setErrorMessage(`${err.response.data.error}`)
      setTimeout(() => {
        setErrorMessage(null)
      }, 4000)
    }
  }

  const handleLogout = () => {
    setUser(null)
    localStorage.removeItem('user')
  }

  const handleCreateNewBlog = async (newBlog) => {
    try {
      const blog = await blogService.create(newBlog, user)
      setBlogs(blogs.concat(blog))
      setSuccessfullMessage(`New blog by ${user.username} successfully added`)
      setTimeout(() => {
        setSuccessfullMessage(null)
      }, 4000)
    } catch (err) {
      console.log('Inside catch of create new blog: ', err)
    }
  }

  const handleUpdateBlog = async (blog) => {
    try {
      const updatedBlog = await blogService.update(blog)
      setBlogs(blogs.map(b => b.id === updatedBlog.id ? updatedBlog : b))
    } catch (err) {
      console.log(err)
    }
  }

  const handleDeleteBlog = async (blogId) => {
    try {
      await blogService.remove(blogId, user)
      setBlogs(blogs.filter(b => b.id !== blogId ))
    } catch (err) {
      console.log(err)
    }
  }

  let notification = null
  if (successfullMessage) {
    notification = <Notification color='green'>{successfullMessage}</Notification>
  }

  if (errorMessage) {
    notification = <Notification color='red'>{errorMessage}</Notification>
  }

  return (
    <div>
      {notification}
      {!user ? (
        <LoginForm onLogin={handleLogin} />
      ) : (
        <>
          <p>
            {user.username} logged in
            <button onClick={handleLogout}>Logout</button>
          </p>
          <Toggle>
            {
              ({ visible, setVisible }) => {
                let output = <button onClick={() => setVisible(true)}>New blog</button>

                if(visible) {
                  output = (
                    <>
                      <NewBlogForm
                        onCreateNewBlog={handleCreateNewBlog}
                        onHideForm={() => setVisible(false)}/>
                      <button onClick={() => setVisible(false)}>Cancel</button>
                    </>
                  )
                }

                return output
              }
            }
          </Toggle>
          <h2>blogs</h2>
          {blogs.sort((blogA, blogB) => blogB.likes - blogA.likes).map(blog =>
            <Toggle key={blog.id}>
              {({ visible, setVisible }) => {
                return (
                  <Blog
                    blog={blog}
                    visible={visible}
                    onShowBlog={() => setVisible(!visible)}
                    onUpdateBlogLike={handleUpdateBlog}
                    onDeleteBlog={handleDeleteBlog}
                    loggedInUser={user.username} />
                )
              }}
            </Toggle>
          )}
        </>
      )}
    </div>
  )
}

export default App