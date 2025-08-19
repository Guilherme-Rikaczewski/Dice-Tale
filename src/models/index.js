const sequelize = require('../config/database')
const User = require('./userModel')(sequelize)
const ProfilePic = require('./profilePicModel')(sequelize)

User.belongsTo(ProfilePic, { foreignKey: 'idProfilePic' })

module.exports = { User, sequelize}