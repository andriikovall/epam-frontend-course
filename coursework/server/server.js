const jsonServer = require('json-server');
const router = jsonServer.router('./db.json');
const server = jsonServer.create();

const cors = require('cors');
const path = require('path');

const port = process.env.PORT || 3000;


const distDir = path.join(__dirname, '../cinema/dist');
const middlewares = jsonServer.defaults({
    static: distDir
});

server.use(cors());
server.use(middlewares);
server.use('/api', router);

server.get('/*', (req,res) => {
    res.sendFile(path.resolve(distDir, 'index.html'));
});


server.listen(port);