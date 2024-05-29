const express = require('express');
const connectDB = require('./config/db');
const dotenv = require('dotenv');
const userRouter = require('./routes/userRoutes')

dotenv.config();
connectDB();
const app = express();

app.use('/user', userRouter);

app.listen(3000, ()=>{
    console.log('Server is running on port 3000 !!!');
}) 