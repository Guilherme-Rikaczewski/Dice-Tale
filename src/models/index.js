const sequelize = require('../config/database')
const User = require('./userModel')(sequelize)
const ProfilePic = require('./profilePicModel')(sequelize)
const Game = require('./gameModel')(sequelize)
const GameImage = require('./gameImageModel')(sequelize)
const Role = require('./roleModel')(sequelize)
const GameRule = require('./gameRuleModel')(sequelize)
// precisa criar as relações
const Sheet = require('./sheetModel')(sequelize)
const RecentSheet = require('./recentSheet')(sequelize)
const Token = require('./tokenModel')(sequelize)
const TokenAccess = require('./tokenAccessModel')(sequelize)
const TokenBar = require('./tokenBarModel')(sequelize)

// belongsTo --> usado no lado onde a FK está --> referencia fk da tabela sendo usada
// hasMany --> usado no lado que é referenciado pela FK --> referencia fk da tabela passada como parametro

// Relações de User
User.belongsTo(ProfilePic, { foreignKey: 'idProfilePic' })
User.hasMany(GameRule, { foreignKey: 'idUser' })

// Relações de Game
Game.belongsTo(GameImage, { foreignKey: 'idGameImage' })
Game.hasMany(GameRule, { foreignKey: 'idGame' })

// Relações de GameImage
GameImage.hasOne(Game, { foreignKey: 'idGameImage' })

// Relações de Role
Role.hasMany(GameRule, { foreignKey: 'idRole' })

// Relações de GameRule
GameRule.belongsTo(User, { foreignKey:'idUser' })
GameRule.belongsTo(Role, { foreignKey: 'idRole' })
GameRule.belongsTo(Game, { foreignKey: 'idGame' })


module.exports = { 
    User, 
    ProfilePic, 
    Game, 
    GameImage, 
    Role, 
    GameRule,
    Sheet,
    RecentSheet,
    Token,
    TokenAccess,
    TokenBar,
    sequelize
}