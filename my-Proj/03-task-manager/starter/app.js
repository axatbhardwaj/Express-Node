// console.log('Task Manager App')
const connectDB = require('./db/connect');
const tasks = require('./routes/tasks')
const express = require('express')
const app = express()
const port = 3000
require('dotenv').config()

//middleware

app.use(express.json());

app.use('/api/v1/tasks', tasks);

app.get('/home', (req, res) => {
    res.status(200).send('Task Manager App');
})

console.log(process.env.DB_URL);

const start = async () => {
    try {
        await connectDB(process.env.DB_URL);
        app.listen(port, () => {
            console.log(`Server is listening on port ${port}...`)
        })

    } catch (error) {
        console.log(error)
    }
}

start()

//api.get('/api/v1/tasks') - get all the tasks 
//api.post('/api/v1/tasks') - create a new task
//api.get('/api/v1/tasks/:id') - get a single task
//api.patch('/api/v1/tasks/:id') - update a task
//api.delete('/api/v1/tasks/:id') - delete a task