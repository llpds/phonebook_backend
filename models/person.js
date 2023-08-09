const mongoose =require('mongoose')

mongoose.set('strictQuery', false)
const url = process.env.MONGODB_URI
console.log('connecting to', url)

mongoose.connect(url)
  .then(() => {
    console.log('connected to mongoDb')
  })
  .catch((error) => {
    console.log('error connectingto mongoDb:', error.message)
  })

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
    required: true
  },
  number:{
    type: String,
    validate: {
      validator: function (v){
        return /^\d{2,3}-\d{6,}$/.test(v)
      },
      message: props => `${props.value} is not value phone number. Number format: 2-3 numbers dash 6 numbers or more  (123-123456 or 12-123456)`
    },
    required: true
  }
})

personSchema.set('toJSON',{
  transform:(document, returnedObj) => {
    returnedObj.id = returnedObj._id.toString()
    delete returnedObj._id
    delete returnedObj.__v
  }
})

module.exports = mongoose.model('Person', personSchema)