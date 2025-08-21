const { DataTypes, Model } = require('sequelize')

class Role extends Model{}

module.exports=(sequelize)=>{
    return Role.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            field: 'id_role'
        },
        role: {
            type: DataTypes.STRING(1),
            allowNull: false,
            field: 'role'
        }
    },
    {
        sequelize,
        modelName: 'Role',
        tableName: 'roles',
        timestamps: false
    })
}
