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
        idUser: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: 'id_user_gamerules'
        },
        idRoles: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: 'id_roles_gamerules'
        },
        idGames: {
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


