const {DataTypes, Model} = require('sequelize')

class TokenAccess extends Model{}

module.exports=(sequelize)=>{
    return TokenAccess.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            field: 'id_access',
        },
        tokenId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: 'id_token_access',
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: 'id_user_access',
        },
    },
    {
        sequelize,
        modelName: 'TokenAccess',
        tableName: 'tokens_access',
        timestamps: false,
    })
}