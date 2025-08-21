const { DataTypes, Model } = require("sequelize")

class GameRule extends Model{}

module.exports=(sequelize)=>{
    return GameRule.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            field: 'id_gamerules'
        }
    },
    {
        sequelize,
        modelName: 'GameRule',
        tableName: 'game_rules',
        timestamps: false
    })
}


