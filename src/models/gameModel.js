const { DataTypes, Model } = require('sequelize')

class Game extends Model{}

module.exports = (sequelize)=>{
    return Game.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            field: 'id_game'
        },
        name: {
            type: DataTypes.STRING(100),
            allowNull: false,
            field: 'name_game'
        },
        code: {
            type: DataTypes.TEXT,
            allowNull: false,
            unique: true,
            field: 'game_code'
        },
        imagePath: {
            type: DataTypes.TEXT,
            field: 'image_path'
        },

    },
    {
        sequelize,
        modelName: 'Game',
        tableName: 'games',
        timestamps: false
    })
}