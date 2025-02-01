const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const authController = require('../controllers/authController');

// Validation rules
const registerValidation = [
    body('username')
        .trim()
        .isLength({ min: 3, max: 50 })
        .withMessage('ชื่อผู้ใช้ต้องมีความยาว 3-50 ตัวอักษร'),
    body('email')
        .trim()
        .isEmail()
        .withMessage('รูปแบบอีเมลไม่ถูกต้อง'),
    body('password')
        .isLength({ min: 6 })
        .withMessage('รหัสผ่านต้องมีความยาวอย่างน้อย 6 ตัวอักษร')
];

// Routes
router.post('/register', registerValidation, authController.register);
router.post('/login', authController.login);

module.exports = router;