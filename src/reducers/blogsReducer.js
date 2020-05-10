import blogService from '../services/blogs'
import { notificationSuccess } from './notificationReducer'

const initialState = []

const blogsReducer = (state = initialState, action) => {
  switch (action.type) {
  case 'INIT_BLOGS':
    return action.blogs
  case 'CREATE_BLOG':
    return [
      ...state,
      action.blog
    ]
  case 'REMOVE_BLOG':
    return state.filter(blog => blog.id !== action.blogId)
  case 'UPDATE_BLOG':
    return state.map(blog => blog.id === action.updatedBlog.id ? action.updatedBlog : blog)
  case 'ADD_BLOG_COMMENT':
    return state.map(blog => blog.id === action.blog.id ? action.blog : blog)
  default:
    return state
  }
}

export const initBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()

    dispatch({
      type: 'INIT_BLOGS',
      blogs
    })
  }
}

export const createBlog = (newBlog, user) => {
  return async dispatch => {
    try {
      const blog = await blogService.create(newBlog, user)
      dispatch({
        type: 'CREATE_BLOG',
        blog
      })

      /*Inside try, if create fails, it will never reach this notification dispatch*/
      dispatch(notificationSuccess(`New blog by ${user.username} successfully added`, 4000))
    } catch(err) {
      console.log('creation of blog failed...', err)
    }
  }
}

export const removeBlog = (blogId, user) => {
  return async dispatch => {
    try {

      await blogService.remove(blogId, user)
      dispatch({
        type: 'REMOVE_BLOG',
        blogId
      })

    } catch(err) {
      console.log('creation of blog failed...', err)
    }
  }
}

export const updateBlog = (blog) => {
  return async dispatch => {
    try {
      const updatedBlog = await blogService.update(blog)

      dispatch({
        type: 'UPDATE_BLOG',
        updatedBlog
      })
    } catch (err) {
      console.log('updating blog failed...', err)
    }
  }
}

export const addBlogComment = (blogId, comment) => {
  return async dispatch => {
    const blog = await blogService.addComment(blogId, comment)

    dispatch({
      type: 'ADD_BLOG_COMMENT',
      blog
    })
  }
}

export default blogsReducer