import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {
  const { successMessage, errorMessage } = useSelector(state => state.notification)

  let notificationModal = null
  if(successMessage || errorMessage) {
    notificationModal = (
      <div id="notification" style={{
        position: 'absolute',
        top: '10%',
        left: '50%',
        transform: 'translateX(-50%)',
        padding: 20,
        background: '#f2f2f2',
        borderRadius: 5,
        fontWeight: 'bold',
        color: successMessage ? 'green' : errorMessage ? 'red' : null
      }}>
        <p>
          {successMessage && successMessage}
          {errorMessage && errorMessage}
        </p>
      </div>
    )
  }

  return notificationModal
}

export default Notification
