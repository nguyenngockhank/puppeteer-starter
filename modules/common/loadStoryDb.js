const Database = _require('core/database/Database');

let db = Database.init();
db.load(`models/story/`);

module.exports = db;