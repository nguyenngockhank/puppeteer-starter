require('./bootstrap');

const Database = _require('core/database/Database');

const tuchanLtq = require('./dbprocess/tcltq');
const nhatniemVh = require('./dbprocess/nhatniemvh');

(async () => {
    let db = Database.init();
    db.load(`${appRoot}models/story/`);
    await db.create();

    // tu chan lieu thien quan
    // tuchanLtq(db);

    // nhat niem vinh hang
    nhatniemVh(db);
})();
