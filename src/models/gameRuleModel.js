const { DataTypes, Model } = require("sequelize")

class GameRule extends Model{}

module.exports=(sequelize)=>{
    return GameRule.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            field: 'id_gamerules'
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: 'id_user_gamerules'
        },
        role: {
            type: DataTypes.STRING(1),
            allowNull: false,
            field: 'game_role'
        },
        gameId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: 'id_games_gamerules'
        }
    },
    {
        sequelize,
        modelName: 'GameRule',
        tableName: 'game_rules',
        timestamps: false
    })
}


