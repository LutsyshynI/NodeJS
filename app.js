const express = require('express');
const fs = require('fs/promises');
const path = require('path');
const mongoose = require('mongoose');

const userRouter = require('./router/user.router');
const configs = require('./config/config');


const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/users', userRouter);

app.get('/', (req, res) => {
    res.json('WELOCME')
});

app.use((err, req, res, next) => {
    res.status(err.status || 500).json({
        message: err.message || 'Unknown error',
        status: err.status || 500
    });
});

app.listen(5000, () => {
    // mongoose.connect(configs.MONGO_URL);
    mongoose.connect('mongodb://localhost:27017/nodeJs');
    console.log('Server listen 5000');
})
