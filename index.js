const express = require('express');
//import the postRoute
const postRoute = require('./routes/postRoute');
const userRoutes = require('./routes/userRoutes') 
const cors = require('cors');

require('dotenv').config(); //import env file

const dbUrl = process.env.MONGODB_URL


//create connect to mongodb
const mongoose = require('mongoose');
mongoose.connect(dbUrl)
.then(() => {
    console.log(`connected to mongodb`)
    const app = express();
const port = 3000;
app.get('/', (req, res) => {
    res.send('Hello Izu')
});
//importing the middleware
app.use(express.json())
app.use(cors({
    origin: ['http://localhost:5173', 'http://localhost:5174'], //allow requests from local host
    credentials: true, //allow credentials to be sent with the request
    methods: ['GET', 'POST', 'PUT', 'DELETE'],  //allow specific HTTP methods
    allowedHeaders:['Content-Type', 'Authorization']
}))

app.use('/api', postRoute)
app.use('/api', userRoutes)

app.listen(port, () => {
    console.log(`server is running on http://localhost:${port}`)
});
}).catch((err) => {
    console.log(`failed to connect to mongodb`, err)
});




