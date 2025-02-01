const pool = require('../db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
// ฟังก์ชันสำหรับสร้าง JWT token
const generateToken = (userId, username) => {
    return jwt.sign(
        { userId, username },
        process.env.JWT_SECRET || 'your-secret-key',
        { expiresIn: '24h' }
    );
};
// ฟังก์ชันสำหรับลงทะเบียน
exports.register = async (req, res) => {
    try {
        // ตรวจสอบความถูกต้องของข้อมูล
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { username, email, password } = req.body;

        // ตรวจสอบว่ามีผู้ใช้นี้อยู่แล้วหรือไม่
        const userExists = await pool.query(
            'SELECT * FROM users WHERE username = $1 OR email = $2',
            [username, email]
        );

        if (userExists.rows.length > 0) {
            return res.status(400).json({
                message: 'ชื่อผู้ใช้หรืออีเมลนี้ถูกใช้งานแล้ว'
            });
        }

        // เข้ารหัสรหัสผ่าน
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // บันทึกผู้ใช้ใหม่
        const result = await pool.query(
            'INSERT INTO users (username, email, password_hash) VALUES ($1, $2, $3) RETURNING id, username, email',
            [username, email, hashedPassword]
        );

        const user = result.rows[0];
        const token = generateToken(user.id, user.username);

        res.status(201).json({
            message: 'ลงทะเบียนสำเร็จ',
            token,
            user: {
                id: user.id,
                username: user.username,
                email: user.email
            }
        });

    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ message: 'เกิดข้อผิดพลาดในการลงทะเบียน' });
    }
};
// ฟังก์ชันสำหรับเข้าสู่ระบบ
exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;

        // ค้นหาผู้ใช้
        const result = await pool.query(
            'SELECT * FROM users WHERE username = $1',
            [username]
        );

        const user = result.rows[0];
        if (!user) {
            return res.status(401).json({
                message: 'ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง'
            });
        }

        // ตรวจสอบรหัสผ่าน
        const isValidPassword = await bcrypt.compare(password, user.password_hash);
        if (!isValidPassword) {
            return res.status(401).json({
                message: 'ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง'
            });
        }

        // อัพเดทเวลาเข้าสู่ระบบล่าสุด
        await pool.query(
            'UPDATE users SET last_login = CURRENT_TIMESTAMP WHERE id = $1',
            [user.id]
        );

        const token = generateToken(user.id, user.username);

        res.json({
            message: 'เข้าสู่ระบบสำเร็จ',
            token,
            user: {
                id: user.id,
                username: user.username,
                email: user.email
            }
        });

    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'เกิดข้อผิดพลาดในการเข้าสู่ระบบ' });
    }
};