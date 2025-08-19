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
        idGameImage: {
            type: DataTypes.INTEGER,
            field: 'id_game_image_games'
        },
        name: {
            type: DataTypes.STRING(100),
            allowNull: false,
            field: 'name_game'
        },
        link: {
            type: DataTypes.TEXT,
            allowNull: false,
            field: 'page_link'
        },
        code: {
            type: DataTypes.TEXT,
            allowNull: false,
            field: 'game_code'
        },

    },
    {
        sequelize,
        modelName: 'Game',
        tableName: 'games',
        timestamps: false
    })
}