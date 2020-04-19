import React from 'react'

const Notification = ({ color, children }) => {
  return (
    <div id="notification" style={{
      position: 'absolute',
      top: '10%',
      left: '50%',
      transform: 'translateX(-50%)',
      padding: 20,
      background: '#f2f2f2',
      borderRadius: 5,
      fontWeight: 'bold',
      color
    }}>
      <p>{children}</p>
    </div>
  )
}

export default Notification
