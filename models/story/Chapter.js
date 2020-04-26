const { Model, DataTypes } = require('sequelize');

class Chapter extends Model {}

module.exports = (sequelize) => {
    return Chapter.init({
        id: { 
            type: DataTypes.INTEGER, 
            primaryKey: true, 
            autoIncrement: true,  
        },
        story_id: { 
            type: DataTypes.INTEGER, 
            allowNull: false,
        },
        order: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        content: {
            type: DataTypes.TEXT('long'), 
            allowNull: true,
        },
        origin_url: {
            type: DataTypes.STRING(1000),
            allowNull: true,
        }
    }, { 
        sequelize, 
        underscored: true,
        modelName: 'chapter', 
        charset: 'utf8',
    });
}