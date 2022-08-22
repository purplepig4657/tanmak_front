import { Player } from "./entity/Player.js";
import { PlayerGroup } from "./entity/PlayerGroup.js";
import { ScreenSize } from "./ScreenSize.js";

class App {

    private readonly _canvas: HTMLCanvasElement;
    private readonly _ctx: CanvasRenderingContext2D | null;
    private readonly _screenSize: ScreenSize;
    private readonly _myPlayer: Player;
    private readonly _playerGroup: PlayerGroup;
    private _pressedKey = {
        rightPressed: false,
        leftPressed: false,
        upPressed: false,
        downPressed: false,
    }

    constructor() {
        this._canvas = document.createElement('canvas');
        this._ctx = this.canvas.getContext('2d');
        document.body.appendChild(this._canvas);

        this._screenSize = new ScreenSize(this.canvas.clientWidth, this.canvas.clientHeight);
        this._playerGroup = new PlayerGroup(new ScreenSize(this.canvas.clientWidth, this.canvas.clientHeight));

        this._myPlayer = new Player("id", "name", "red", new ScreenSize(this.canvas.clientWidth, this.canvas.clientHeight));
        const initialXRatio = 0.5;
        const initialYRatio = 0.5;
        const initialRadiusRatio = 8 / (800 * 800);
        const initialSpeedRatio = 3 / 800;
        this._myPlayer.initialize(initialXRatio, initialYRatio, initialRadiusRatio, initialSpeedRatio);
        this._playerGroup.myPlayer = this._myPlayer;

        document.addEventListener('keydown', this.keyDownHandler.bind(this), false);
        document.addEventListener('keyup', this.keyUpHandler.bind(this), false);
        window.addEventListener('resize', this.resize.bind(this));
        this.resize();

        requestAnimationFrame(this.update.bind(this));
    }

    resize(): void {
        this.screenSize.screenWidth = this.canvas.clientWidth;
        this.screenSize.screenHeight = this.canvas.clientHeight;

        this.playerGroup.resize(this.screenSize);

        const dpr: number = window.devicePixelRatio;
        
        this.canvas.width = this.screenSize.screenWidth * dpr;
        this.canvas.height = this.screenSize.screenHeight * dpr;
        this.ctx.scale(dpr, dpr);
    }

    update(): void {
        this.ctx.clearRect(0, 0, this.screenSize.screenWidth, this.screenSize.screenHeight);

        this.playerMove();
        this.playerGroup.update(this.ctx);

        requestAnimationFrame(this.update.bind(this));
    }

    private playerMove(): void {
        if (this.pressedKey.rightPressed && this.myPlayer.x < this.screenSize.screenWidth - this.myPlayer.radius)
            this.myPlayer.x += this.myPlayer.vector.xSpeed;
        if (this.pressedKey.leftPressed && this.myPlayer.x > this.myPlayer.radius)
            this.myPlayer.x -= this.myPlayer.vector.xSpeed;
        if (this.pressedKey.downPressed && this.myPlayer.y < this.screenSize.screenHeight - this.myPlayer.radius)
            this.myPlayer.y += this.myPlayer.vector.ySpeed;
        if (this.pressedKey.upPressed && this.myPlayer.y > this.myPlayer.radius)
            this.myPlayer.y -= this.myPlayer.vector.ySpeed;
    }

    private keyDownHandler(event: { code: string; }): void {
        if (event.code == 'ArrowRight') this.pressedKey.rightPressed = true;
        if (event.code == 'ArrowLeft') this.pressedKey.leftPressed = true;
        if (event.code == "ArrowDown") this.pressedKey.downPressed = true;
        if (event.code == "ArrowUp") this.pressedKey.upPressed = true;
    }
    
    private keyUpHandler(event: { code: string; }): void {
        if (event.code == 'ArrowRight') this.pressedKey.rightPressed = false;
        if (event.code == 'ArrowLeft') this.pressedKey.leftPressed = false;
        if (event.code == "ArrowDown") this.pressedKey.downPressed = false;
        if (event.code == "ArrowUp") this.pressedKey.upPressed = false;
    }

    private get canvas(): HTMLCanvasElement {
        return this._canvas;
    }

    private get ctx(): CanvasRenderingContext2D {
        if (this._ctx) return this._ctx;
        else throw Error("UndefinedError");  // Fix this.
    }

    private get screenSize(): ScreenSize {
        return this._screenSize;
    }

    private get myPlayer(): Player {
        return this._myPlayer;
    }

    private get playerGroup(): PlayerGroup {
        return this._playerGroup;
    }

    private get pressedKey() {
        return this._pressedKey;
    }

}

window.onload = () => {
    new App();
};
