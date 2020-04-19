import React from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, visible, onShowBlog, onUpdateBlogLike, onDeleteBlog, loggedInUser }) => {
  const styles = {
    blog: {
      width: '540px',
      padding: '5px 10px',
      border: '1px solid black',
      marginBottom: 10,
      maxWidth: '90%'
    }
  }

  return (
    <div data-id="blog" style={styles.blog}>
      <p className='blog-header'>
        {blog.title} {' '}
        <strong>{blog.author}</strong> {' '}
        {!visible && <button data-id="view-blog-btn" onClick={onShowBlog}> View </button>}
        {visible && <button onClick={onShowBlog}>Hide</button>}
      </p>
      {visible && (
        <div className='blog-body'>
          <p>Url: {blog.url}</p>
          <p>Likes: {blog.likes} <button data-id="like-blog-btn" onClick={() => onUpdateBlogLike(blog)}>Like</button></p>
          <p>Creator: {blog.user.username}</p>
          {blog.user.username === loggedInUser && <button data-id="remove-blog-btn" onClick={() => onDeleteBlog(blog.id)}>Remove</button>}
        </div>
      )}
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  visible: PropTypes.bool.isRequired,
  onShowBlog: PropTypes.func.isRequired,
  onUpdateBlogLike: PropTypes.func.isRequired,
  onDeleteBlog: PropTypes.func.isRequired,
  loggedInUser: PropTypes.string.isRequired
}

export default Blog
