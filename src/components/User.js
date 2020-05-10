import React from 'react'
import { Link } from 'react-router-dom'

const User = ({ user }) => {
  const styles = {
    user: {
      width: '360px',
      padding: '10px',
      border: '1px solid black',
      marginBottom: 10,
      maxWidth: '90%',
      display: 'flex',
      justifyContent: 'space-between'
    }
  }

  return (
    <div style={styles.user}>
      <Link to={`/users/${user.id}`}>{user.name}</Link>
      <span>Blogs created {user.blogs.length}</span>
    </div>
  )
}

export default User
