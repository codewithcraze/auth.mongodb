const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    name: {
        first: {
            type: String,
            required: true,
            trim: true
        },
        middle: {
            type: String,
            trim: true
        },
        last: {
            type: String,
            required: true,
            trim: true
        },
    },
    gender: {
        type: String,
        enum: ["Male", "Female", "Other"]
    },
    photo: {
        type: String,
    }, 
    role: {
        type: String,
        enum: ["user", "admin", "superadmin"],
        default: "user"
    },
    password: {
        type: String,
        required: true,
    },
    verified: {
        type: String,
        enum: ["active", "pending", "deactivated"],
        default: "pending"
    }
}, { timestamps: true })

const User = mongoose.model('User', userSchema);

module.exports = User;



