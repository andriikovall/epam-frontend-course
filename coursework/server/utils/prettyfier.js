const db = require('../db.json');
const fs = require('fs');

fs.writeFileSync('../db.json', JSON.stringify(db, null, 2));