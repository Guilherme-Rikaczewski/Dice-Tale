const { DataTypes, Model } = require('sequelize')

class ProfilePic extends Model{}

module.exports= (sequelize)=>{
    return ProfilePic.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            field: 'id_profile_pic'
        },
        imageName: {
            type: DataTypes.STRING(50),
            allowNull: false,
            field: 'image_name'
        },
        imagePath: {
            type: DataTypes.TEXT,
            allowNull: false,
            field: 'image_path'
        },
        imageSize: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
            field: 'image_size'
        }
    },
    {
        sequelize,
        modelName: 'ProfilePic',
        tableName: 'profile_pictures',
        timestamps: false
    })
}