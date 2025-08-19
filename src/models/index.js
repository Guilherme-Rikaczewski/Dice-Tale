const sequelize = require('../config/database')
const User = require('./userModel')(sequelize)
const ProfilePic = require('./profilePicModel')(sequelize)
const Game = require('./gameModel')(sequelize)
const GameImage = require('./gameImageModel')(sequelize)

User.belongsTo(ProfilePic, { foreignKey: 'idProfilePic' })
Game.belongsTo(GameImage, { foreignKey: 'idGameImage' })

module.exports = { User, sequelize}