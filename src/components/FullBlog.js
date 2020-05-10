import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addBlogComment } from '../reducers/blogsReducer'
import PropTypes from 'prop-types'

const FullBlog = ({ blog, onUpdateBlogLike, onDeleteBlog, loggedInUser }) => {
  const [inputValue, setInputValue] = useState('')
  const dispatch = useDispatch()

  const handleAddComment = (e) => {
    e.preventDefault()
    dispatch(addBlogComment(blog.id, inputValue))
    setInputValue('')
  }

  if (!blog) {
    return null
  }

  return (
    <div>
      <h1 className='blog-header'>
        {blog.title} {' '} {'-' + blog.author}
      </h1>
      <p>Url: {blog.url}</p>
      <p>
                Likes: {blog.likes}
        <button
          data-id="like-blog-btn"
          onClick={() => onUpdateBlogLike(blog)}>
                    Like
        </button>
      </p>
      <p>Creator: {blog.user.username}</p>
      {
        blog.user.username === loggedInUser && (
          <button
            data-id="remove-blog-btn"
            onClick={() => onDeleteBlog(blog.id)}>
                        Remove
          </button>
        )}
      <h3>Comments</h3>
      <form onSubmit={handleAddComment}>
        <input value={inputValue} onChange={(e) => setInputValue(e.target.value)}/>
        <button disabled={inputValue.length < 5}>Add comment</button>
      </form>
      <ul>
        {blog.comments.map((comment, ind) => <li key={ind}>{comment}</li>)}
      </ul>
    </div>
  )
}

FullBlog.propTypes = {
  blog: PropTypes.object,
  onUpdateBlogLike: PropTypes.func.isRequired,
  onDeleteBlog: PropTypes.func.isRequired,
  loggedInUser: PropTypes.string.isRequired
}

export default FullBlog
