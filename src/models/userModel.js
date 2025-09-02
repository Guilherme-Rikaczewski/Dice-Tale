const { DataTypes, Model } = require("sequelize")
const bcrypt = require('bcrypt')

class User extends Model{}

module.exports = (sequelize) => {
    return User.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            field: 'id_user'
        },
        idProfilePic: {
            type: DataTypes.INTEGER,
            field: 'id_profile_pic_path'
        },
        email: {
            type: DataTypes.STRING(256),
            unique: true,
            allowNull: false,
            field: 'email_user',
            validate: {
                isEmail: true,
                notEmpty: true
            }
        },
        username: {
            type: DataTypes.STRING(50),
            allowNull: false,
            field: 'username'
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
            field: 'created_at'
        },
        hoursPlayed: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: 'hours_played'
        },
        password: {
            type: DataTypes.TEXT,
            allowNull: false,
            field: 'password_hash'
        }
    },
        {
            sequelize,
            modelName: 'User',
            tableName: 'users',
            timestamps: false,
            hooks: {
                beforeCreate: async (user) => {
                    const saltRounds = 12 //custo de processamento da hash
                    user.password = await bcrypt.hash(user.password, saltRounds)
                },
                beforeUpdate: async (user) => {
                    if (user.changed('password')) {
                        const saltRounds = 12
                        user.password = await bcrypt.hash(user.password, saltRounds)
                    }
                }
            }
        })
};



