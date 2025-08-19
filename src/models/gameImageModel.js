const { DataTypes, Model } = require('sequelize')

class GameImage extends Model{}

module.exports=(sequelize)=>{
    return GameImage.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            field: 'id_game_image'
        },
        name: {
            type: DataTypes.STRING(50),
            allowNull: false,
            field: 'image_name'
        },
        path: {
            type: DataTypes.TEXT,
            allowNull: false,
            field: 'image_path'
        },
        size: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
            field: 'image_size_game'
        }
    },
    {
        sequelize,
        modelName: 'GameImage',
        tableName: 'game_images',
        timestamps: false
    })
}