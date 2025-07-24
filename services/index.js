const {
    isEmailExits,
    createUser,
    sendOtp,
    getOtp,
    verifyUser
} = require('./auth.service');

const {
    sendOtpEmail
} = require('./email.service');

module.exports = {
    // Auth
    isEmailExits,
    createUser,
    sendOtp,
    getOtp,
    verifyUser,

    // Email Service
    sendOtpEmail,
}