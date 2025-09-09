const sequelize = require('../config/database')
const User = require('./userModel')(sequelize)
const Game = require('./gameModel')(sequelize)
const Role = require('./roleModel')(sequelize)
const GameRule = require('./gameRuleModel')(sequelize)
const Sheet = require('./sheetModel')(sequelize)
const SheetAccess = require('./sheetAccessModel')(sequelize)
const Token = require('./tokenModel')(sequelize)
const TokenAccess = require('./tokenAccessModel')(sequelize)
const TokenBar = require('./tokenBarModel')(sequelize)

// const View = require('./viewModel')(sequelize)

// belongsTo --> usado no lado onde a FK está --> referencia fk da tabela sendo usada
// hasMany --> usado no lado que é referenciado pela FK --> referencia fk da tabela passada como parametro

// Relações de User
User.hasMany(GameRule, { foreignKey: 'idUser' })
User.hasMany(TokenAccess, { foreignKey: 'userId' })
User.hasMany(SheetAccess, { foreignKey: 'userId' })

// Relações de Game
Game.hasMany(GameRule, { foreignKey: 'idGame' })
Game.hasMany(Sheet, { foreignKey: 'gameId' })
Game.hasMany(Token, { foreignKey: 'gameId' })

// Relações de Role
Role.hasMany(GameRule, { foreignKey: 'idRole' })

// Relações de GameRule
GameRule.belongsTo(User, { foreignKey:'idUser' })
GameRule.belongsTo(Role, { foreignKey: 'idRole' })
GameRule.belongsTo(Game, { foreignKey: 'idGame' })

// Relações de Sheets
Sheet.hasMany(SheetAccess, { foreignKey: 'sheetId' })
Sheet.belongsTo(Game, { foreignKey: 'gameId' })
Sheet.hasOne(Token, { foreignKey: 'sheetId' })

// Relações de SheetAccess
SheetAccess.belongsTo(User, { foreignKey: 'userId' })
SheetAccess.belongsTo(Sheet, { foreignKey: 'sheetId' })

// Relações de Token
Token.belongsTo(Sheet, { foreignKey: 'sheetId' })
Token.belongsTo(Game, { foreignKey: 'gameId' })
Token.hasMany(TokenBar, { foreignKey: 'tokenId' })

// Relações de TokenAccess
TokenAccess.belongsTo(Token, { foreignKey: 'tokenId' })
TokenAccess.belongsTo(User, { foreignKey: 'userId' })

// Relações de TokenBar
TokenBar.belongsTo(Token, { foreignKey: 'tokenId' })

module.exports = { 
    User, 
    Game, 
    Role, 
    GameRule,
    Sheet,
    SheetAccess,
    Token,
    TokenAccess,
    TokenBar,
    sequelize
}