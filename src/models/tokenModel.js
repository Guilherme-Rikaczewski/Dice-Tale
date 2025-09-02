const {DataTypes, Model} = require('sequelize')

class Token extends Model{}

module.exports=(sequelize)=>{
    return Token.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            field: 'id_token',
        },
        gameId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: 'id_games_token',
        },
        sheetId: {
            type: DataTypes.INTEGER,
            field: 'id_sheets_token',
        },
        imageTokenPath: {
            type: DataTypes.TEXT,
            allowNull: false,
            defaultValue: '/path/da/imagem/padrao.png',
            field: 'image_token_path',
        },
        tokenName: {
            type: DataTypes.STRING(50),
            field: 'token_name',
        },
        showTokenNameCheck: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
            field: 'show_token_name_check',
        },
        firstBarCurrentValue: {
            type: DataTypes.INTEGER,
            field: 'first_bar_current_value',
        },
        firstBarMaxValue: {
            type: DataTypes.INTEGER,
            field: 'first_bar_max_value',
        },
        firstBarColSheetLink: {
            type: DataTypes.STRING(50),
            field: 'first_bar__col_sheet_link',
        },
        secondBarCurrentValue: {
            type: DataTypes.INTEGER,
            field: 'second_bar_current_value',
        },
        secondBarMaxValue: {
            type: DataTypes.INTEGER,
            field: 'second_bar_max_value',
        },
        secondBarColSheetLink: {
            type: DataTypes.STRING(50),
            field: 'second_bar__col_sheet_link',
        },
        thirdBarCurrentValue: {
            type: DataTypes.INTEGER,
            field: 'third_bar_current_value',
        },
        thirdBarMaxValue: {
            type: DataTypes.INTEGER,
            field: 'third_bar_max_value',
        },
        thirdBarColSheetLink: {
            type: DataTypes.STRING(50),
            field: 'third_bar__col_sheet_link',
        },
        hexCodeFirstBar: {
            type: DataTypes.STRING(8),
            allowNull: false,
            field: 'hex_code_first_bar',
        },
        hexCodeSecondBar: {
            type: DataTypes.STRING(8),
            allowNull: false,
            field: 'hex_code_second_bar',
        },
        hexCodeThirdBar: {
            type: DataTypes.STRING(8),
            allowNull: false,
            field: 'hex_code_third_bar',
        }
    },
    {
        sequelize,
        modelName: 'Token',
        tableName: 'tokens',
        timestamps: false,
    })
}


