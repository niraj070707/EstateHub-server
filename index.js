const express = require('express');
const connectDB = require('./config/db');
const dotenv = require('dotenv');

const userRouter = require('./routes/userRoutes');
const authRouter = require('./routes/authRoute');
const listingRouter = require('./routes/listingRoute');

const cookieParser = require('cookie-parser');

dotenv.config();
connectDB();
const app = express();
app.listen(3000, ()=>{
    console.log('Server is running on port 3000 !!!');
})  

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/api/listing', listingRouter);
app.use('/api/user', userRouter);
app.use('/api/auth', authRouter);

app.use((err, req, res, next)=>{
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    res.status(statusCode).json({
        success : false,
        statusCode : statusCode,
        message : message,
    });
});

