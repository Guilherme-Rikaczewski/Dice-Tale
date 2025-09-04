const {DataTypes, Model} = require('sequelize')

class View extends Model{}

module.exports=(sequelize)=>{
    return View.init({
        userId: {
            type: DataTypes.INTEGER,
            primaryKey:true,
            allowNull: false,
            field: 'id_user',
        },
        username: {
            type: DataTypes.STRING, // tamanho vem do users.username
            allowNull: false,
            field: 'username',
        },
        email: {
            type: DataTypes.STRING, // tamanho vem do users.email_user
            allowNull: false,
            field: 'email_user',
        },
        hoursPlayed: {
            type: DataTypes.INTEGER, // assumindo INT do users.hours_played
            allowNull: true,
            field: 'hours_played',
        },
        imageName: {
            type: DataTypes.STRING, // herdado de profile_pictures.image_name
            allowNull: true,
            field: 'image_name',
        },
        imagePath: {
            type: DataTypes.TEXT, // herdado de profile_pictures.image_path
            allowNull: true,
            field: 'image_path',
        },
    },
    {
        sequelize,
        modelName: 'View',
        tableName: 'view_users_info',
        timestamps: false,
    })
}