const { DataTypes, Model } = require("sequelize")

class SheetsAccess extends Model {}

module.exports = (sequelize) => {
    return SheetsAccess.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            field: 'id_access'
        },
        sheetId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: 'id_sheet',
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: 'id_user',
        },
        owner: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            field: 'owner'
        },
        lastAccess: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
            field: 'last_access'
        }
    }, {
        sequelize,
        modelName: 'SheetsAccess',
        tableName: 'sheets_access',
        timestamps: false
    })
}
