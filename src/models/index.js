const sequelize = require('../config/database')
const User = require('./userModel')(sequelize)

console.log(User)

module.exports = { User, sequelize}