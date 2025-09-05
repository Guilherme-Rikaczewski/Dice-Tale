const sequelize = require('../config/database')
const User = require('./userModel')(sequelize)
const Game = require('./gameModel')(sequelize)
const Role = require('./roleModel')(sequelize)
const GameRule = require('./gameRuleModel')(sequelize)
// precisa criar as relações
const Sheet = require('./sheetModel')(sequelize)
const Token = require('./tokenModel')(sequelize)
const TokenAccess = require('./tokenAccessModel')(sequelize)
const TokenBar = require('./tokenBarModel')(sequelize)

const View = require('./viewModel')(sequelize)

// belongsTo --> usado no lado onde a FK está --> referencia fk da tabela sendo usada
// hasMany --> usado no lado que é referenciado pela FK --> referencia fk da tabela passada como parametro

// Relações de User
User.belongsTo(ProfilePic, { foreignKey: 'idProfilePic' })
User.hasMany(GameRule, { foreignKey: 'idUser' })
User.hasMany(Sheet, { foreignKey: 'userId' })
User.hasMany(TokenAccess, { foreignKey: 'userId' })

// Relações de Game
Game.hasMany(GameRule, { foreignKey: 'idGame' })
Game.hasMany(Sheet, { foreignKey: 'gameId' })
Game.hasMany(Token, { foreignKey: 'tokenId' })

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
    Game, 
    Role, 
    GameRule,
    Sheet,
    Token,
    TokenAccess,
    TokenBar,
    View,
    sequelize
}