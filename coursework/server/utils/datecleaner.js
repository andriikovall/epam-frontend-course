const db = require('../db.json');
const fs = require('fs');

db.sessions.forEach(s => {
    s.timestamp = new Date(s.timestamp).getTime();
})

fs.writeFile('../db.json', JSON.stringify(db), () => {});



