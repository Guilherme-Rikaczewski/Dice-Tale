const { DataTypes, Model} = require('sequelize')

class Sheet extends Model{}

module.exports=(sequelize)=>{
    return Sheet.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            field: 'id_sheet'
        },
        gameId: {
            type: DataTypes.INTEGER,
            field: 'id_game_sheets'
        },
        userOwnerId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: 'id_user_owner_sheets'
        },
        name: {
            type: DataTypes.TEXT,
            field: 'name_sheet'
        },
        imagePath: {
            type: DataTypes.TEXT,
            defaultValue: '/path/da/imagem/padrao.png',
            field: 'image_sheet_path'
        },
        currentHitpoints: {
            type: DataTypes.INTEGER,
            field: 'current_hitpoints'

        },
        maxHitpoints: {
            type: DataTypes.INTEGER,
            field: 'max_hitpoints'
        },
        AC: {
            type: DataTypes.INTEGER,
            field: 'ac'
        },
        inspiration: {
            type: DataTypes.BOOLEAN,
            field: 'inspiration',
            defaultValue: false
        },
        movement: {
            type: DataTypes.TEXT,
            field: 'movement'
        },
        currentTempHitpoints: {
            type: DataTypes.INTEGER,
            field: 'current_temp_hitpoints'
        },
        maxTempHitpoints: {
            type: DataTypes.INTEGER,
            field: 'max_temp_hitpoints'
        },
        currentHitDices: {
            type: DataTypes.INTEGER,
            field: 'current_hit_dices'
        },
        maxHitDices: {
            type: DataTypes.INTEGER,
            field: 'max_hit_dices'
        },
        deathSavingSuccess: {
            type: DataTypes.INTEGER,
            field: 'death_saving_success'
        },
        deathSavingFailures: {
            type: DataTypes.INTEGER,
            field: 'death_saving_failures'
        },
        initiative: {
            type: DataTypes.JSONB,
            allowNull: false,
            defaultValue: {},
            field: 'initiative'
        },
        moneys: {
            type: DataTypes.JSONB,
            allowNull: false,
            defaultValue: {},
            field: 'moneys'
        },
        resources: {
            type: DataTypes.JSONB,
            allowNull: false,
            defaultValue: {},
            field: 'resources'
        },
        characteristics: {
            type: DataTypes.JSONB,
            allowNull: false,
            defaultValue: {},
            field: 'characteristics' 
        },
        skills: {
            type: DataTypes.JSONB,
            allowNull: false,
            defaultValue: {},
            field: 'skills'
        },
        savingThrows: {
            type: DataTypes.JSONB,
            allowNull: false,
            defaultValue: {},
            field: 'saving_throws'
        },
        spells: {
            type: DataTypes.JSONB,
            allowNull: false,
            defaultValue: {},
            field: 'spells'
        },
        attacks: {
            type: DataTypes.JSONB,
            allowNull: false,
            defaultValue: {},
            field: 'attacks'
        },
        attributes: {
            type: DataTypes.JSONB,
            allowNull: false,
            defaultValue: {},
            field: 'attributes' 
        },
        bio: {
            type: DataTypes.JSONB,
            allowNull: false,
            defaultValue: {},
            field: 'bio'
        },
        abilities: {
            type: DataTypes.JSONB,
            allowNull: false,
            defaultValue: {},
            field: 'abilities' 
        },
        proficiencies: {
            type: DataTypes.JSONB,
            allowNull: false,
            defaultValue: {},
            field: 'proficiencies'
        },
        otherSkills: {
            type: DataTypes.JSONB,
            allowNull: false,
            defaultValue: {},
            field: 'other_skills' 
        },
        items: {
            type: DataTypes.JSONB,
            allowNull: false,
            defaultValue: {},
            field: 'items' 
        },
        lastAccess: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
            field: 'last_access'
        }
    },
    {
        sequelize,
        modelName: 'Sheet',
        tableName: 'sheets',
        timestamps: false
    })
}
