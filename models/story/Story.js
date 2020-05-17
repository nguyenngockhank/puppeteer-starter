const {  Model, DataTypes } = require('sequelize');

class Story extends Model {}

module.exports = (sequelize) => {
    return Story.init({
        id: { 
            type: DataTypes.INTEGER, 
            primaryKey: true, 
            autoIncrement: true,  
        },
        slug: { 
            type: DataTypes.STRING, 
            unique: true,
        },
        name: DataTypes.STRING,
        author: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        summary: {
            type: DataTypes.TEXT, 
            allowNull: true,
        },
        chapter_count: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        url: {
            type: DataTypes.STRING(1000),
            allowNull: true,
        }
    }, { 
        sequelize, 
        underscored: true,
        modelName: 'story', 
        charset: 'utf8',
    });
}