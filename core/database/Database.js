const { Sequelize } = require('sequelize');
const fs = require('fs');

function correctPath(path) {
    if (!path.endsWith('/')) {
        return path + '/';
    }
    return path;
}


class Database {

    constructor() {
        this._models = {};
    }

    init() {
        const { 
            DB_DIALECT, DB_HOST, DB_DATABASE,
            DB_USERNAME, DB_PASSWORD,
        } = process.env;

        const sequelize = new Sequelize(
            DB_DATABASE, 
            DB_USERNAME, 
            DB_PASSWORD, 
            {
                host: DB_HOST,
                dialect: DB_DIALECT,
                pool: {
                    max: 5,
                    min: 0,
                    acquire: 30000,
                    idle: 10000
                },
                dialectOptions: {
                    charset: 'utf8',
                    collate: 'utf8_general_ci',
                },
                // http://docs.sequelizejs.com/manual/tutorial/querying.html#operators
                operatorsAliases: false,
                // logging: function(sql, ...args) {
                    // args = args.map((item) => colors.yellow(item));
                    // console.log(colors.yellow(sql));
                // }
            }
        );

        this._sequelize = sequelize;
        return this;
    }

    load(path) {
        path = correctPath(path);

        let ignoreFiles = [ 'index.js', ];
        // actions
        let fileNames = fs.readdirSync(path);

        // filter
        fileNames = fileNames.filter((fileName) => {
            return !ignoreFiles.includes(fileName);
        });
        
        // load models from files
        this._loadModelsFromFiles(path, fileNames);
    }

    _loadModelsFromFiles(path, fileNames) {
        let models = {};
        let sequelize = this._sequelize;

        fileNames.forEach((fileName) => {
            let modelName = fileName.replace('.js', '');   
            let fn = require(path + fileName);
            models[modelName] = fn(sequelize);
        });

        this._models = models;
    }

    async create() {
        await this._sequelize.sync();
    }

    getInstance() {
        return this._sequelize;
    }
    
    getModels() {
        return this._models;
    }

    

}

module.exports = new Database;