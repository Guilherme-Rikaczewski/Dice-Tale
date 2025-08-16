const sequelize = require('sequelize')
const User = require('./userModel')(sequelize)



module.exports = { User, sequelize}