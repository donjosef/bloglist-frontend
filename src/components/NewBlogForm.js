import React, { useState } from 'react'

const NewBlogForm = ({ onCreateNewBlog, onHideForm }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleBlogCreation = (e) => {
    e.preventDefault()
    const newBlog = {
      title,
      author,
      url
    }

    onCreateNewBlog(newBlog)
    onHideForm()
  }

  return (
    <div>
      <h2>Create new blog</h2>
      <form className="new-blog-form" onSubmit={handleBlogCreation}>
        <div className="new-blog-form__control">
          <label htmlFor="title">Title: </label>
          <input id="title" type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>
        <div className="new-blog-form__control">
          <label htmlFor="author">Author: </label>
          <input id="author" type="text" value={author} onChange={(e) => setAuthor(e.target.value)} />
        </div>
        <div className="new-blog-form__control">
          <label htmlFor="url">Url: </label>
          <input id="url" type="text" value={url} onChange={(e) => setUrl(e.target.value)} />
        </div>
        <button id="create-blog-btn">Create</button>
      </form>
    </div>
  )
}

export default NewBlogForm
