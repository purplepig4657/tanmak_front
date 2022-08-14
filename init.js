import express from 'express';
import http from 'http';
import path from 'path';
import { Server } from 'socket.io';

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const __dirname = path.resolve();

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    res.render('index.html');
});

server.listen(8000, () => {
    console.log("server run!");
});

class Player {
    constructor(id, color, xRatio = 0.5, yRatio = 0.5) {
        this.id = id;
        this.color = color;
        this.xRatio = xRatio;
        this.yRatio = yRatio;
    }
}

let players = {};

// Socket Server test code. Not Backend code.
io.on('connection', (socket) => {
    socket.on('disconnect', (reason) => {
        delete players[socket.id];
        socket.broadcast.emit('leaveUser', socket.id);
    });

    for (const player in players) socket.emit('userJoin', players[player]);

    const id = socket.id;
    const color = '#' + Math.floor(Math.random() * 16777215).toString(16);
    const initialPosition = 0.5;
    const user = new Player(id, color, initialPosition, initialPosition);

    socket.emit('initInfo', user);
    players[id] = user;

    socket.broadcast.emit('userJoin', user);
    socket.on('sendUserInfo', (data) => {
        players[data.id].xRatio = data.xRatio;
        players[data.id].yRatio = data.yRatio;
        socket.broadcast.emit('update', {
            id: data.id,
            xRatio: data.xRatio,
            yRatio: data.yRatio,
        });
    });
});
