const CONFIG = require('./config');
const StoreChaptersToDb = require('../common/StoreChaptersToDb');

module.exports = async(db, chapItems) => {
    return StoreChaptersToDb(db, chapItems, CONFIG);
}