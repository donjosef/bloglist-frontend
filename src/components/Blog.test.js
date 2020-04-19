import React from 'react'
import Blog from './Blog'
import Toggle from './Toggle'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'

describe('<Blog />', () => {
  let blog
  beforeEach(() => {
    blog = {
      title: 'Title test',
      author: 'Author test',
      url: 'http://test.com',
      likes: 9,
      user: {
        username: 'montyDev'
      }
    }
  })

  test('it should render title and author', () => {
    const component = render(<Blog blog={blog} />)
    const blogHeader = component.container.querySelector('.blog-header')
    expect(blogHeader).toHaveTextContent('Title test Author test')
  })

  test('it should not render url and likes by default', () => {
    const component = render(<Blog blog={blog} visible={false} />)
    const blogBody = component.container.querySelector('.blog-body')
    expect(blogBody).toBe(null)
  })

  test('it should render url and likes when clicking view button', () => {
    const { container, getByText } = render(
      <Toggle>
        {
          ({ visible, setVisible }) => {
            return (
              <Blog blog={blog} visible={visible} onShowBlog={() => setVisible(!visible)}/>
            )
          }
        }
      </Toggle>
    )

    const button = getByText('View')
    fireEvent.click(button)
    expect(container.querySelector('.blog-body')).not.toBe(null)
    expect(container.querySelector('.blog-body')).toBeVisible()
  })

  test('when like button is clicked twice the event handler is called twice', () => {
    const mockHandler = jest.fn()
    const component = render(<Blog blog={blog} visible={true} onUpdateBlogLike={mockHandler}/>)

    const likeButton = component.getByText('Like')
    fireEvent.click(likeButton)
    fireEvent.click(likeButton)
    expect(mockHandler).toBeCalledTimes(2)
  })
})