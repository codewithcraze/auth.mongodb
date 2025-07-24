const mongoose = require('mongoose');
const { Schema } = mongoose;

const Otpschema = new Schema({
    email: {
        type: String,
        unique: true,
        trim: true,
        required: true,
    },
    otp: {
        type: String,
        trim: true,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 30  
    }
}, { timestamps: false })


const Otp = mongoose.model('Otp', Otpschema);

module.exports = Otp;