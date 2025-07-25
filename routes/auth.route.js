const express = require('express');

const router = express.Router();
const { authController } = require('../controllers');
const { auth } = require('../middlewares');

router.post('/register', authController.register);
router.post('/verify', authController.verifyOtp);
router.post('/signin', authController.signin);
router.post('/generate-otp', authController.genOtp);
router.post('/isauth', auth, authController.isauth);

module.exports = router;