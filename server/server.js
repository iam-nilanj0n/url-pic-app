const express = require('express');
const app = express()
const dotenv = require('dotenv')
dotenv.config()
const mongoose = require('mongoose');
const cors = require('cors')
app.use(cors())
const Port = process.env.PORT || 7001;


app.use(express.json())
// connection with DB
mongoose.connect(process.env.DATABASE_mongodbCompass)
.then((res)=>{
    console.log('DATABASE is connected');
})
.catch((err)=> {
    console.log(err);
})
// Router is here
const router = require('./controller/postController')

app.use('/', router)
// Listening to the port
app.listen(Port, ()=> console.log(`Server is running on PORT:${Port}`))
