import React from 'react'

const Input = ({ text, ...props }) => (
  <div>
    {text}: <input id = {text + 'Input'} {...props} />
  </div>
)

export default Input