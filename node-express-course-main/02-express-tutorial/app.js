const express = require('express')
const app = express()
const { products } = require('./data')
const { logger } = require('./logger')
const  multer  = require('multer');
//const parse = require("body-parser");

const upload = multer();

//app.use(parse.urlencoded({ extended: false }));
//app.use(parse.json());
app.use(logger);
app.use(express.json());
app.use(express.static('./methods-public'));
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.status(200).send('Home Page')
})

app.get('/about', (req, res) => {

    res.status(200).send('About Page')
})

app.post('/login', (req, res) => {
   
    res.status(201).json({ status: true})
    console.log(req.body)
})



app.put("/test/put", (req, res) => {
    res.status(200).send("test put")
    const  name  = req.body;
    console.log(req.body);
    console.log(name);
})

app.post("/test/post", upload.none(), (req, res) => {
    const { name } = req.body;
    //console.log(req);
    console.log(name);
    res.status(200).send("test post");
})

app.listen(5000, () => {
    console.log('Server is listening on port 5000....');
})
// app.get()