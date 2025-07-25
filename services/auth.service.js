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

const sendOtp = async (email, length = 6) => {

    const currentOtp = await Otp.findOne({ email });
    if (!currentOtp) {
        function generateOtp(len) {
            const digits = "0123456789";
            let otp = "";
            for (let i = 0; i < len; i++) {
                otp += digits[Math.floor(Math.random() * 10)];
            }
            return otp.padStart(len, "0");
        }
        const otp = generateOtp(length);
        const otpInfo = await Otp.create({
            email,
            otp,
            createdAt: new Date()
        });
        return otpInfo.otp;
    }else{
        return currentOtp.otp;
    }
};





const getOtp = async ({ email, otp }) => {
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