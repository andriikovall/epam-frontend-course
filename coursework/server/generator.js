const crypto = require('crypto');
const db = require('./db.json');
const fs = require('fs');

function randInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; 
}

function randomElement(arr) {
    return arr[randInt(0,  arr.length - 1)];
}

function randomFutureDateInDayRange(days) {
    return new Date((Date.now() + randInt(0, days * 24 * 60 * 60 * 1000)));
}

function generateSittings(rows, cols) {
    const sittings = new Array(rows).fill().map(v => []);

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            sittings[i].push(randInt(0, 1));
        }
    }
    return sittings;
}

function getRowColsForRoom(roomId) {
    return db.rooms.filter(r => r.id == roomId).map(r => ({
        rows: r.rows, 
        cols: r.cols   
    }))[0];
}


const filmIds = db.films.map(f => f.id);
const roomIds = db.rooms.map(r => r.id);

const daysToGenerate = 20;
const sessionsToGenerate = 30;

for (let i = 1; i <= sessionsToGenerate; i++) {
    const roomId = randomElement(roomIds);
    const { rows, cols } = getRowColsForRoom(roomId);
    const session = {
        id: crypto.randomBytes(5).toString('hex'), 
        timestamp: randomFutureDateInDayRange(daysToGenerate), 
        roomId: roomId, 
        filmId: randomElement(filmIds), 
        sittings: generateSittings(rows, cols)
    }
    db.sessions.push(session)
}
fs.writeFileSync('./db.json', JSON.stringify(db));

