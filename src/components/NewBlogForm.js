import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createBlog } from '../reducers/blogsReducer'

import { CreateButton } from '../styled-components'

const NewBlogForm = ({ user, onHideForm }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const dispatch = useDispatch()

  const handleBlogCreation = (e) => {
    e.preventDefault()
    const newBlog = {
      title,
      author,
      url
    }

    dispatch(createBlog(newBlog, user))
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
        <CreateButton id="create-blog-btn">Create</CreateButton>
      </form>
    </div>
  )
}

export default NewBlogForm
