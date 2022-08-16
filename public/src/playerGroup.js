import { Player } from "./player.js";

export class PlayerGroup {
    constructor(socket) {
        this.players = {};
        this.socket = socket;
        
        this.socket.on('userJoin', (data) => {
            const newPlayer = new Player(data.id, data.color);
            this.addPlayer(newPlayer);
            if (this.stageWidth !== undefined && this.stageHeight !== undefined) 
                this.resize(this.stageWidth, this.stageHeight);
        });

        this.socket.on('update', (data) => {
            let player = this.players[data.id];
            player.setXByRatio(data.xRatio);
            player.setYByRatio(data.yRatio);
        });

        this.socket.on('leaveUser', (id) => {
            delete this.players[id];
        });

        this.socket.on('dead', (id) => {
            const targetPlayer = this.getPlayer(id);
            targetPlayer.setDead(true);
        });
    }

    resize(stageWidth, stageHeight) {
        this.stageWidth = stageWidth;
        this.stageHeight = stageHeight;

        for (const player in this.players) {
            const playerObjcet = this.players[player];
            playerObjcet.resize(this.stageWidth, this.stageHeight);
        }
    }

    update(ctx) {
        for (const player in this.players) {
            const playerObject = this.players[player];
            if (playerObject.dead) {
                delete this.players[player];
                continue;
            }
            if (playerObject.isMy) {
                playerObject.update();
                this.socket.emit('sendUserInfo', {
                    id: player,
                    xRatio: playerObject.getXRatio(),
                    yRatio: playerObject.getYRatio(),
                });
            }
            ctx.beginPath();
            ctx.fillStyle = playerObject.color;
            ctx.arc(playerObject.getX(), 
                    playerObject.getY(), 
                    playerObject.radius, 0, 2 * Math.PI);
            ctx.textAlign = 'center';
            ctx.fillText(playerObject.name, playerObject.getX(), playerObject.getY() - playerObject.radius - 5);
            ctx.fill();
            ctx.closePath();
        }
    }

    getMyPlayer() {
        if (this.myPlayer !== undefined) return this.myPlayer;
        else throw "ObjectUndefinedError";
    }

    getPlayer(playerId) {
        const targetPlayer = this.players[playerId];
        if (targetPlayer !== undefined) return targetPlayer;
        else throw "ObjectUndefinedError";
    }

    setMyPlayer(player) {
        this.myPlayer = player;
    }

    addPlayer(player) {
        this.players[player.id] = player;
    }

}
