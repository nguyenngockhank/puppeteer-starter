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