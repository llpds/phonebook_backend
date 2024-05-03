import React, { useState } from 'react'
import Button from './elements/Button'
import Input from './elements/Input'
import personService from '../services/person'


const PersonForm = ({ persons, setPersons, setMessage }) => {

  // --------------------------  states --------------------------
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  // --------------------------  submit  --------------------------
  const submitPerson = (event) => {
    event.preventDefault()

    const numberCorrespondence  = persons.find(person => person.number === newNumber)
    const nameCorrespondence = persons.find(person => person.name.toLowerCase() === newName.toLowerCase())

    if(newName === '' || newNumber === '') {
      alert('both fields (name and number) must be filled')
      return
    }

    if (numberCorrespondence){
      alert(`Phone number ${newNumber} is already added to phonebook and belongs to ${numberCorrespondence.name}`)
      setNewNumber('')
      return
    }

    if(nameCorrespondence) {
      if(window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)){
        changeNumber({
          id: nameCorrespondence.id,
          name: nameCorrespondence.name,
          number: newNumber
        })
      }
      return
    }

    addPerson({
      name: newName,
      number: newNumber
    })
  }

  // --------------------------  actions  --------------------------
  const addPerson = (newObject) => {
    personService
      .create(newObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
        showMessage(`Added ${returnedPerson.name}`)
      })
      .catch(error => {
        showError(error.response.data.error)
      })
  }

  const changeNumber = ({ id, name, number }) => {
    personService
      .update(id, name, number)
      .then(returnedPerson => {
        setPersons(persons.map(p => p.id !== id ? p : returnedPerson))
        setNewName('')
        setNewNumber('')
        showMessage(`${returnedPerson.name} number has been changed to ${returnedPerson.number}`)
      })
      .catch(error => {
        if(error.response) {
          showError(error.response.data.error)
        } else {
          showError(`Information of ${name} has already been removed from server`)
          setPersons(persons.filter(p => p.id !== id))
        }
      })
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
    <div>
      <form onSubmit = {submitPerson}>
        <Input text = 'name' value = {newName} onChange = {(event) => setNewName(event.target.value)} />
        <Input text = 'number' value = {newNumber} onChange = {(event) => setNewNumber(event.target.value)} />
        <Button text = "add" />
      </form>
    </div>
  )
}

export default PersonForm