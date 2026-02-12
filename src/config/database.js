const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
        process.env.POSTGRES_DB,
        process.env.POSTGRES_USER,
        process.env.POSTGRES_PASSWORD,
        {
            host: process.env.DB_HOST,
            dialect: 'postgres',
            port: 5432,
            logging: false
        }
);

module.exports = sequelize;