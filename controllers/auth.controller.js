const { ApiError } = require('../utils');
const bcrypt = require('bcryptjs');
const { isEmailExits, createUser, sendOtp, sendOtpEmail, getOtp, verifyUser } = require('../services');
const jwt = require('jsonwebtoken');


const authController = {
    async register(req, res, next) {
        try {
            const { email, password, first, last, middle } = req.body;
            if (!email) throw new ApiError(400, "Email is required");
            if (!password) throw new ApiError(400, "Password is required");
            if (await isEmailExits(email)) throw new ApiError(409, "User already exists");
            const hashedPassword = await bcrypt.hash(password, 10);
            const username = (
                first.toLowerCase() +
                "_" +
                Date.now().toString(36) +
                Math.floor(Math.random() * 1000)
            ).toLowerCase();

            const newUser = await createUser({ email, username, password: hashedPassword, first, last, middle });
            const otp = await sendOtp(email, 6);

            await sendOtpEmail(newUser.email, `${newUser?.name?.first + " " + newUser?.name?.last}`, otp);
            res.status(201).json({
                status: true,
                message: 'User registered successfully!',
                user: {
                    id: newUser._id,
                    email: newUser?.email,
                    name: `${newUser?.name.first} ${newUser?.name.last}`
                }
            });
        } catch (error) {
            next(error);
        }
    },

    async verifyOtp(req, res, next) {
        try {
            const { email, otp } = req.body;
            if (!await getOtp({ email, otp })) throw new ApiError(400, "Otp has been expired!");
            // Otp Get Verified Send Token.
            const user = await verifyUser(email);
            const token = jwt.sign({ email: user.email, id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
            res.json({
                status: true,
                user,
                token
            })
        } catch (error) {
            next(error);
        }
    },

    async signin(req, res, next) {
        try {
            const { email, password } = req.body;
            const user = await isEmailExits(email);
            if (!user) throw new ApiError(400, "Email not Exits");
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) throw new ApiError(400, "Password is not correct!");
            const token = jwt.sign({ email: user.email, id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
            res.json({
                status: true,
                token,
                user
            })
        } catch (error) {
            next(error);
        }
    },

    async genOtp(req, res, next) {
        try {
            const { email } = req.body;
            const user = await isEmailExits(email)
            if (!user) throw new ApiError(400, "Email not exists!")
            const otp = await sendOtp(email, 6);
            await sendOtpEmail(user.email, `${user?.name?.first + " " + user?.name?.last}`, otp);
            res.json({
                status: true,
                message: "Otp send successfully!"
            })
        } catch (error) {
            next(error);
        }
    },

    async isauth(req, res, next){
        try{
            const { email, id } = req.user;
            const user = await isEmailExits(email)
            if(!user) throw new ApiError(401, "Email not exits!");
            const token = jwt.sign({email: user.email, id: user._id}, process.env.JWT_SECRET, { expiresIn: "1d" });
            res.json({
                status: true,
                user,
                token,
                message: "Authentificated Successfully"
            })
        }catch(error){
            next(error)
        }
    }

};

module.exports = authController;
