const crypto = require('crypto');
const db = require('../db.json');
const fs = require('fs');

function randInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; 
}

function randomElement(arr) {
    return arr[randInt(0,  arr.length - 1)];
}

db.films.forEach(f => {
    f.sessionTypes = randomElement([
        ['2d'], ['3d'], ['2d', '3d'] 
    ])
});

function getFilmSessionTypes(filmId) {
    const film = db.films.find(f => f.id == filmId);
    if (!film)
        return null;
    return film.sessionTypes;
}

db.sessions.forEach(s => {
    const sessionTypes = getFilmSessionTypes(s.filmId);
    s.sessionType = randomElement(sessionTypes);
})

fs.writeFileSync('../db.json', JSON.stringify(db));



