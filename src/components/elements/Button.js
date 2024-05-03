import React from 'react'

const Button = ({ text, handleClick }) => (
  <div>
    <button id = {text.replace(/\s/g, '') + 'Button'} onClick = {handleClick} type={handleClick !== undefined ? 'button' : 'submit'}>{text}</button>
  </div>
)

export default Button