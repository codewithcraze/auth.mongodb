const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema({
    username: String,
    name: {
        first: {
            type: String,
            required: true
        },
        middle: String,
        last: String,
    },
    gender: {
        type: String,
        enum: ["Male", "Female", "Other"]
    },
    photo: {
        type: String,
    }, 
    role: String,
    password: {
        type: String,
        required: true,
    }
})

const User = mongoose.model('User', userSchema);


module.exports = User;



