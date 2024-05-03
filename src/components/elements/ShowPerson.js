import React from 'react'
import Button from './Button'
import personService from '../../services/person'

const Person = ({ person, setPersons, persons, setMessage, index }) =>  {

  const dltBtn = () => {
    if(window.confirm(`Delete ${person.name}`)) {
      personService
        .destroy(person.id)
        .then(
          setPersons(persons.filter(p => p.id !== person.id))
        )
        // eslint-disable-next-line no-unused-vars
        .catch(err => showError(`Information of ${person.name} has already been removed from server`))
      showMessage(`${person.name} was deleted`)
    }
  }

  const showMessage = (msg) => {
    setMessage([msg, 'msg'])
    setTimeout(() => {
      setMessage(null)
    }, 5000)
  }

  const showError = (msg) => {
    setMessage([msg, 'err'])
    setTimeout(() => {
      setMessage(null)
    }, 5000)
  }

  return(
    <tr>
      <td>{index}.</td>
      <td>{person.name}</td>
      <td>{person.number}</td>
      <td><Button handleClick = {dltBtn} text = 'delete' /></td>
    </tr>
  )
}

export default Person