import React, { useState, useEffect } from 'react'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import personService from './services/person'
import Notification from './components/Notification'

import './App.css'


const App = () => {


  // --------------------------  states --------------------------
  const [persons, setPersons] = useState([])
  const [filter, setFilter] = useState('')
  const [message, setMessage] = useState(null)

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => setPersons(initialPersons))
  }, [])

  return (
    <div>
      <h2>Phonebook</h2>

      <Notification message = {message}/>

      <Filter filter = {filter} setFilter = {setFilter}/>

      <h2>Add a new</h2>

      <PersonForm persons = {persons} setPersons = {setPersons} setMessage = {setMessage}/>

      <h2>Numbers</h2>

      <Persons persons = {persons} filter = {filter} setPersons = {setPersons}  setMessage = {setMessage}/>

    </div>
  )
}

export default App