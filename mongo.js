const mongoose = require('mongoose')

if (process.argv.length<3) {
    console.log('give password as argument')
    process.exit(1)
}

const password = process.argv[2]
const url = `mongodb+srv://fullstack:${password}@cluster0.kirhkre.mongodb.net/?retryWrites=true&w=majority`


const mongoStrart = () => {
    mongoose.set('strictQuery', false)
    mongoose.connect(url)

    const personSchema = new mongoose.Schema({
        name: String,
        number: String,
    })

    return mongoose.model('Person', personSchema)

}

const mongoFind = () => {
    const Person = mongoStrart()
    console.log('phonebook:')
    Person.find().then(result => {
        result.forEach(p => console.log(p.name, p.number))
        mongoose.connection.close()
      })    
}

const mongoAdd = (name,number) => {
    const Person = mongoStrart()
    
    const newPerson = new Person({
        name: name,
        number: number,
    })
    
    newPerson.save().then(result => {
        console.log(`added ${name} ${number} to phonebook`)
        mongoose.connection.close()
    })
}

switch(process.argv.length){
    case 3:
        mongoFind()
        break
    case 4:
        console.log('after password must be 2 arguments: name and number')
        process.exit(1)
        break
    case 5:
        mongoAdd(process.argv[3], process.argv[4])
        break
    default:    
        console.log('too many arguments')
        process.exit(1)
}
