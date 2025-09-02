const { DataTypes, Model} = require('sequelize')

class RecentSheet extends Model{}


module.exports=(sequelize)=>{
    return RecentSheet.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            field: 'id_recent_sheets',
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: 'id_user_recent_sheets',
        },
        sheetId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: 'id_sheets_recent_sheets',
        },
        accessedAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
            field: 'accessed_at',
        },
    },
    {
        sequelize,
        modelName: 'RecentSheet',
        tableName: 'recent_sheets',
        timestamps: false
    })
}
