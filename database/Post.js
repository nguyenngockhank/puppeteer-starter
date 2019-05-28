module.exports = sequelize.define('post', {
    module:  { 
        type: Sequelize.STRING, 
        primaryKey: true,
    },
    url:  { 
        type: Sequelize.STRING, 
        primaryKey: true,
    },
    title: Sequelize.STRING,
    raw_content: Sequelize.TEXT,
    content: Sequelize.TEXT,
    meta:  Sequelize.TEXT,
}, { underscored: false })