require('dotenv').config()
require('express-async-errors');
const port = 5000;
const express = require('express');
const app = express();
const notFoundMiddleware = require('./middleware/not-found');
const errorMiddleware = require('./middleware/error-handler');
const connectDB = require('./db/connect');
const productsRouter = require('./routes/products');

//routes
app.get('/', (req, res) => {
    res.send('<h1>StoreAPI</h1><a href="/api/v1/products">Products route</a>')
});
app.use('/api/v1/products',productsRouter);

//middleware
app.use(express.json());
app.use(notFoundMiddleware);
app.use(errorMiddleware);


const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        console.log("Connected to MongoDB");
        app.listen(port, () => console.log(`Server is listening on port ${port}...`));
    } catch (error) {
        console.log(error);
    }
};

start();