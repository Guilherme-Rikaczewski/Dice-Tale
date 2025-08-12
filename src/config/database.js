const { Pool } = require('pg');
require('dotenv').config();
console.log(process.env.POSTGRES_DB)

const pool = new Pool(
    {
        user: process.env.POSTGRES_USER,
        host: process.env.DB_HOST,
        database: process.env.POSTGRES_DB,
        password: process.env.POSTGRES_PASSWORD,
        port: process.env.POSTGRES_PORT,
    }
);

module.exports = pool;