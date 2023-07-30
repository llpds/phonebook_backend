const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
require('dotenv').config()

const Person = require('./models/person')
const app = express()


app.use(cors())
app.use(express.static('build'))

morgan.token('data', (req,res) => JSON.stringify(req.body))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :data'))
app.use(express.json())

let persons = []

app.get('/info', (request, response) => {
    const date = new Date()
    const infoData = `<p> Phonebook has info for ${persons.length} people <br /><br /> ${date} </p>`
    response.send(infoData)
  })

  
app.get('/api/persons/', (request, response) => {
  Person.find({}).then(p => response.json(p))
})

app.get('/api/persons/:id', (request, response) => {
  Person.findById(request.params.id).then(p=> response.json(p))
})

app.post ('/api/persons', (request, response) => {

  const body = request.body
  if(!body.name || !body.number){
    return response.status(400).json({error: 'name or number info is missing'})
  }

  const person = new Person ({
    name: body.name,
    number: body.number
  })

  person.save().then(savedPerson => response.json(savedPerson))
})

app.delete('/api/persons/:id', (request, response) => {
  Person.findByIdAndRemove(request.params.id)
    .then(result => response.status(204).end())
    .catch(error => next(error))
})

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})