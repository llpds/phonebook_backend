import React from 'react'
import './Notification.css'

const Notification = ({ message }) => {
  if(message === null) return null
  const className = `notification ${message[1]}`
  return(
    <div className= {className}>
      {message[0]}
    </div>
  )
}

export default Notification

