const colors = require('colors');

let  { 
    DB_DIALECT,
    DB_HOST,
    DB_DATBASE,
    DB_USERNAME,
    DB_PASSWORD,
} = process.env;

const Sequelize = require('sequelize');

const sequelize = new Sequelize(DB_DATBASE, DB_USERNAME, DB_PASSWORD, {
  host: DB_HOST,
  dialect: DB_DIALECT,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  // http://docs.sequelizejs.com/manual/tutorial/querying.html#operators
  operatorsAliases: false,
  logging: function(sql, ...args) {
    // args = args.map((item) => colors.yellow(item));
    console.log(colors.yellow(sql));
  }
});

/// -- set up global
global.Sequelize = Sequelize;
global.sequelize = sequelize;

/// -- read all dir to trigger set up 
const fs = require('fs');
let files = fs.readdirSync('./database');

let models = {};
files.forEach((file) => {
    let modelName = file.replace('.js', ''); // remove .js in file name
    models[modelName] = _require('database/' + file);
});

/// set up relation
// _require('database/relations');

// -- set to globals
global.AppModels = models;
