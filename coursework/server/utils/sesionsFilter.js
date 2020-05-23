const db = require('../db.json');
const fs = require('fs');

const filmDates = new Map();

db.films.forEach(f => {
    filmDates.set(f.id, f.date);
})

console.log('db.sessions:', db.sessions.length)

db.sessions = db.sessions.filter(s => {
    return new Date(s.timestamp) >= new Date(filmDates.get(s.filmId));
})

console.log('db.sessions:', db.sessions.length)



fs.writeFileSync('../db.json', JSON.stringify(db));