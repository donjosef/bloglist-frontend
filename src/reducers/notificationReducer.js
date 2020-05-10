let timeoutId

const initialState = {
  successMessage: null,
  errorMessage: null
}

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
  case 'NOTIFICATION_SUCCESS':
    return {
      ...state,
      successMessage: action.message,
      errorMessage: null
    }
  case 'NOTIFICATION_ERROR':
    return {
      ...state,
      successMessage: null,
      errorMessage: action.message
    }
  case 'REMOVE_NOTIFICATION':
    return initialState
  default:
    return state
  }
}

export const notificationSuccess = (message, time) => {
  clearTimeout(timeoutId)

  return dispatch => {
    timeoutId = setTimeout(() => {
      dispatch(removeNotification())
    }, time)

    return dispatch({
      type: 'NOTIFICATION_SUCCESS',
      message
    })
  }
}

export const notificationError = (message, time) => {
  clearTimeout(timeoutId)

  return dispatch => {
    timeoutId = setTimeout(() => {
      dispatch(removeNotification())
    }, time)

    return dispatch({
      type: 'NOTIFICATION_ERROR',
      message
    })
  }
}

const removeNotification = () => {
  return {
    type: 'REMOVE_NOTIFICATION'
  }
}

export default notificationReducer