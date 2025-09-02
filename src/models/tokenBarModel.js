const {DataTypes, Model} = require('sequelize')

class TokenBar extends Model{}

module.exports=(sequelize)=>{
    return TokenBar.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            field: 'id_bar',
        },
        tokenId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: 'id_token_bar',
        },
        currentValue: {
            type: DataTypes.INTEGER,
            field: 'current_value',
        },
        maxValue: {
            type: DataTypes.INTEGER,
            field: 'max_value',
        },
        dataSheetLink: {
            type: DataTypes.STRING(50),
            field: 'data_sheet_link',
        },
        hexCode: {
            type: DataTypes.STRING(8),
            allowNull: false,
            field: 'hex_code',
        },
    },
    {
        sequelize,
        modelName: 'TokenBar',
        tableName: 'token_bar',
        timestamps: false,
    })
}