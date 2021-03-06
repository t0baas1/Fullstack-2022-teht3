const express = require('express')
const morgan = require('morgan')
const app = express()

let persons =[
{
    id: 1,
    name: "Arto Hellas",
    number: "040-123456"
},
{
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523"
},
{
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345"
},
{
    id: 4,
    name: "Mary Poppendick",
    number: "39-23-6423122"
}   
]

app.use(express.json())

app.use(morgan('tiny'))

app.get('/api/persons', (request, response) =>{
    response.json(persons)
})

app.get('/api/persons/info', (request, response) => {
    response.send(`Phonebook has info of ${persons.length} people</br>${Date()}`)
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)

    if (person) {
        response.json(person)
    } else {
        response.status(404).end()
    }
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)

    response.status(204).end()
})

app.post('/api/persons', (request, response) => {
    const body = request.body
    console.log(JSON.stringify(body))

    if (!body.name || !body.number) {
        return response.status(400).json({
            error: 'content missing'
        })
    }

    if (persons.find(person => person.name === body.name)){
        return response.status(400).json({
            error: 'name must be unique'
        })
    }

    const person = {
        id: generateId(),
        name: body.name,
        number: body.number,
    }

    persons = persons.concat(person)

    response.json(person)
})

const generateId = () => {
    const maxId = Math.floor(Math.random() * 1000)
    console.log(maxId)
    return maxId
}


const PORT = 3001
app.listen(PORT, () => {
console.log(`Server running on port ${PORT}`)
})
