const express = require('express');
require('dotenv').config();
const app = express();
const mongoose = require('mongoose');



app.set("view engine", "ejs");  // EJS enable

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


(async () => {
    try{
        const connection = await mongoose.connect(process.env.DB);
        if(!connection) throw new Error("Connection is not good");
        console.log('connected to database');

    }catch(error){
        console.log(error.message);
    }
})()

app.use('/api', require('./routes'));


app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    res.status(statusCode).json({
        status: false,
        message: err.message || 'Something went wrong',
        details: err.details || null,
        statusCode
    });
});


const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log("Server is listening at " +  port);
});
