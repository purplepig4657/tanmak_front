import { Player } from "./player.js";
import { EntityController } from "./EntityController.js";
import { MeatBall } from "./meatBall.js";

class App {
    constructor() {
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        document.body.appendChild(this.canvas);

        this.socket = io("http://localhost:8000");
        console.log(this.socket);
        this.entityController = new EntityController(this.socket);
        this.playerGroup = this.entityController.getPlayerGroup();
        this.meatBallGroup = this.entityController.getMeatBallGroup();
        this.socket.on('initInfo', function (data) {
            this.myPlayer = new Player(data.id, data.color, true, document);
            this.playerGroup.setMyPlayer(this.myPlayer);
            this.playerGroup.addPlayer(this.myPlayer);
            window.addEventListener('resize', this.resize.bind(this), false);
            this.resize('resize');
            requestAnimationFrame(this.update.bind(this));
        }.bind(this));

        this.socket.on('connect_error', function (err) {
            alert(`a connection error occured due to ${err}`);
            this.socket.close();
        }.bind(this));

        /* local test
        setInterval(() => {
            this.meatBallGroup.addMeatBall(new MeatBall(1 / 800, 0.5, 0.5, 0, 0.5));
        }, 1000);
        */
    }

    resize() {
        this.stageWidth = this.canvas.clientWidth;
        this.stageHeight = this.canvas.clientHeight;

        const dpr = window.devicePixelRatio;

        this.entityController.resize(this.stageWidth, this.stageHeight);
        
        this.canvas.width = this.stageWidth * dpr;
        this.canvas.height = this.stageHeight * dpr;
        this.ctx.scale(dpr, dpr);
    }

    update() {
        this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);

        this.entityController.update(this.ctx);

        requestAnimationFrame(this.update.bind(this));
    }

}

window.onload = () => {
    new App();
};
