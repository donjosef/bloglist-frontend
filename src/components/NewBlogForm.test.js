import React from 'react'
import NewBlogForm from './NewBlogForm'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'

describe('<NewBlogForm />', () => {
  test('it should call onCreateNewBlog handler with the right details when the form is submitted', () => {
    const mockHandler = jest.fn()
    const component = render(<NewBlogForm onCreateNewBlog={mockHandler} onHideForm={() => {}}/>)

    const form = component.container.querySelector('form')
    const titleInput = component.container.querySelector('#title')
    const authorInput = component.container.querySelector('#author')
    const urlInput = component.container.querySelector('#url')

    fireEvent.change(titleInput, {
      target: { value: 'a test title' }
    })

    fireEvent.change(authorInput, {
      target: { value: 'a test author' }
    })

    fireEvent.change(urlInput, {
      target: { value: 'a test url' }
    })

    fireEvent.submit(form)

    expect(mockHandler).toBeCalled()
    expect(mockHandler.mock.calls[0][0].title).toBe('a test title' )
    expect(mockHandler.mock.calls[0][0].author).toBe('a test author' )
    expect(mockHandler.mock.calls[0][0].url).toBe('a test url' )

  })
})