const { ApiError } = require('../utils');
const bcrypt = require('bcryptjs');  // password hashing
const User = require('../models');  // Mongoose model

const authController = {
    async register(req, res, next) {
        try {
            const { email, password, first, last, middle } = req.body;
            // 1. Validate fields
            if (!email) throw new ApiError(400, "Email is required");
            if (!password) throw new ApiError(400, "Password is required");

            // 2. Check if user already exists
            const existingUser = await User.findOne({ email });
            if (existingUser) throw new ApiError(409, "User already exists");

            // 3. Hash password
            const hashedPassword = await bcrypt.hash(password, 10);


            // 4. Create user
            const newUser = await User.create({
                email,
                password: hashedPassword,
                first,
                last,
                middle
            });

            // 5. Return success response (without password)
            res.status(201).json({
                status: true,
                message: 'User registered successfully!',
                user: {
                    id: newUser._id,
                    email: newUser.email,
                    name: `${newUser.first} ${newUser.last}`
                }
            });
        } catch (error) {
            next(error);
        }
    }
};

module.exports = authController;
