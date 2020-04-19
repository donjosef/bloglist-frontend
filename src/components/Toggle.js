import React, { useState } from 'react'

const Toggle = (props) => {
  const [visible, setVisible] = useState(false)

  return (
    <div>
      {props.children({ visible, setVisible })}
    </div>
  )
}

export default Toggle
