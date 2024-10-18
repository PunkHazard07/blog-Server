const express = require('express');
//import the postRoute
const postRoute = require('./routes/postRoute');
const userRoutes = require('./routes/userRoutes') 

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

app.use('/api', postRoute)
app.use('/api', userRoutes)

app.listen(port, () => {
    console.log(`server is running on http://localhost:${port}`)
});
}).catch((err) => {
    console.log(`failed to connect to mongodb`, err)
});




