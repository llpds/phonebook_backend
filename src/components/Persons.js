import React from 'react'
import ShowPerson from './elements/ShowPerson'


const Persons = ({ persons, filter, setPersons, setMessage }) => {

  const filtered = persons.filter(function(person){
    return person.name.toLowerCase().includes(filter.toLowerCase())
  })

  return(
    <table>
      <tbody>
        {filtered.map((person, index) => <ShowPerson key = {person.id} person = {person} setPersons={setPersons} persons = {persons} setMessage = {setMessage} index = {index + 1}/>)}
      </tbody>
    </table>
  )
}

export default Persons