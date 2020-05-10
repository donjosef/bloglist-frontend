import React from 'react'
import { Link } from 'react-router-dom'

const Blog = ({ blog }) => {
  const styles = {
    blog: {
      width: '540px',
      padding: '5px 10px',
      border: '1px solid black',
      marginBottom: 10,
      maxWidth: '90%'
    },
    title: {
      marginRight: 10
    }
  }

  return (
    <div data-id="blog" style={styles.blog}>
      <Link to={`/blogs/${blog.id}`}>
        <p className='blog-header'>
          <span style={styles.title}>{blog.title}</span>
          <strong>{blog.author}</strong>
        </p>
      </Link>
    </div>
  )
}

export default Blog
