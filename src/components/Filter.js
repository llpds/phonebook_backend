import React from 'react'
import Input from './elements/Input'


const Filter = ({ filter, setFilter }) => {

  const handleFilterChange = (event) => setFilter(event.target.value)

  return (
    <div>
      <Input text = 'Filter shown with' value = {filter} onChange = {handleFilterChange} />
    </div>
  )
}

export default Filter