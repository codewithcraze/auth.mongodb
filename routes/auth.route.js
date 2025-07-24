const express = require('express');

const router = express.Router();
const { authController } = require('../controllers')


router.post('/register', authController.register);
router.post('/verify', authController.verifyOtp);
router.post('/signin', authController.signin);
router.post('/generate-otp', authController.genOtp)


module.exports = router;