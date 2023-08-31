// console.log('Task Manager App')
const connectDB = require('./db/connect');
const tasks = require('./routes/tasks')
const express = require('express')
const notFound = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');
const app = express()
const port = 3000
require('dotenv').config()

//middleware

app.use(express.json());
//routes

app.use('/api/v1/tasks', tasks);
//app.use(express.static('./public'))

//middleware
app.use(notFound);
app.use(errorHandlerMiddleware);

app.get('/home', (req, res) => {
    res.status(200).send();
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