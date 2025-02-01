const { Pool } = require('pg');

// สร้างการเชื่อมต่อกับ PostgreSQL โดยใช้ค่าจาก environment variables
const pool = new Pool({
    user: 'postgres',
    host: 'db', // ชื่อ service จาก docker-compose
    database: 'kanban',
    password: 'postgres',
    port: 5432,
});

// ทดสอบการเชื่อมต่อ
pool.query('SELECT NOW()', (err, res) => {
    if (err) {
        console.error('Database connection error:', err);
    } else {
        console.log('Database connected successfully');
    }
});

module.exports = pool;