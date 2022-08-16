import { PlayerGroup } from "./playerGroup.js";
import { MeatBallGroup } from "./meatBallGroup.js";

export class EntityController {
    constructor(socket) {
        this.socket = socket;
        this.playerGroup = new PlayerGroup(this.socket);
        this.meatBallGroup = new MeatBallGroup(this.socket);
    }

    resize(stageWidth, stageHeight) {
        this.stageWidth = stageWidth;
        this.stageHeight = stageHeight;

        this.playerGroup.resize(this.stageWidth, this.stageHeight);
        this.meatBallGroup.resize(this.stageWidth, this.stageHeight);
    }

    update(ctx) {
        this.checkCollision();
        this.playerGroup.update(ctx);
        this.meatBallGroup.update(ctx);
    }

    getPlayerGroup() {
        if (this.playerGroup !== undefined) return this.playerGroup;
        else throw "ObjectUndefinedError";
    }

    getMeatBallGroup() {
        if (this.meatBallGroup !== undefined) return this.meatBallGroup;
        else throw "ObjectUndefinedError";
    }

    checkCollision() {
        const myPlayer = this.playerGroup.getMyPlayer();
        const meatBalls = this.meatBallGroup.getMeatBalls();

        if (myPlayer.getDead()) return;

        for (let i = 0; i < meatBalls.length; i++) {
            const meatBallObject = meatBalls[i];
            if (Math.sqrt((myPlayer.getX() - meatBallObject.getX()) ** 2 +
                          (myPlayer.getY() - meatBallObject.getY()) ** 2) <=
                           myPlayer.getRadius() + meatBallObject.getRadius()) {
                myPlayer.setDead(true);
                this.socket.emit('dead', myPlayer.getId());
                break;
            }
        }
    }

}
