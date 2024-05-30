const express = require('express');
const connectDB = require('./config/db');
const dotenv = require('dotenv');
const userRouter = require('./routes/userRoutes');
const authRouter = require('./routes/authRoute');

dotenv.config();
connectDB();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/user', userRouter);

app.use('/api/auth', authRouter);

app.listen(3000, ()=>{
    console.log('Server is running on port 3000 !!!');
})  