const { User, Otp } = require('../models');


const isEmailExits = async (email) => {
    return await User.findOne({ email });
}

const createUser = async ({ email, username, password, first, last, middle }) => {
    return await User.create({
        email,
        username,
        password,
        name: {
            first,
            last,
            middle
        }
    })
}

const sendOtp = async (email, length) => {
    function generateOtp(length = 6) {
        const digits = "0123456789";
        let otp = "";
        for (let i = 0; i < length; i++) {
            otp += digits[Math.floor(Math.random() * 10)];
        }
        return otp.padStart(length, "0");  
    }
    const otp = generateOtp(length);
        const otpInfo = await Otp.create({
            email,
            otp
        })
    return otpInfo.otp;
}

const getOtp = async ({email, otp}) => {
    return await Otp.findOne({ email, otp: otp.toString() }); 
};

const verifyUser = async (email) => {
  return await User.findOneAndUpdate(
    { email: email },
    { $set: { verified: "active" } }, 
    { new: true } 
  );
};


module.exports = {
    isEmailExits,
    createUser,
    sendOtp,
    getOtp,
    verifyUser
}