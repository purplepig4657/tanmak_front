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
        this.playerGroup.update(ctx);
        this.meatBallGroup.update(ctx);
    }
}
