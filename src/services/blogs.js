import axios from 'axios'
const baseUrl = '/api/blogs'

const getAll = async () => {
  const res = await axios.get(baseUrl)
  return res.data
}

const create = async (newBlog, user) => {
  // const res = await axios.post(baseUrl, newBlog)
  const res = await axios({
    url: baseUrl,
    method: 'POST',
    data: newBlog,
    headers: {
      Authorization: `Bearer ${user.token}`
    }
  })

  return res.data
}

const update = async (blog) => {
  const res = await axios({
    url: `${baseUrl}/${blog.id}`,
    method: 'PUT',
    data: {
      likes: blog.likes + 1
    }
  })

  return res.data
}

const remove = async (blogId, user) => {
  await axios({
    url: `${baseUrl}/${blogId}`,
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${user.token}`
    }
  })
}

const addComment = async (blogId, comment) => {
  const res = await axios.post(baseUrl + `/${blogId}/comments`, { comment })
  return res.data
}

export default { getAll, create, update, remove, addComment }