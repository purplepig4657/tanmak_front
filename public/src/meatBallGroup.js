import { MeatBall } from "./meatBall.js";

export class MeatBallGroup {
    constructor(socket) {
        this.meatBalls = []
        this.socket = socket;

        this.socket.on('meatBall', (data) => {
            const newMeatBall = new MeatBall(data.speed,
                                             data.xDirection, data.yDirection,
                                             data.xRatio, data.yRatio);
            this.addMeatBall(newMeatBall);
            if (this.stageWidth !== undefined && this.stageHeight !== undefined) 
                newMeatBall.resize(this.stageWidth, this.stageHeight);
        });
    }

    resize(stageWidth, stageHeight) {
        this.stageWidth = stageWidth;
        this.stageHeight = stageHeight;

        for (let i = 0; i < this.meatBalls.length; i++) {
            const meatBallObject = this.meatBalls[i]
            meatBallObject.resize(this.stageWidth, this.stageHeight);
        }
    }

    update(ctx) {
        for (let i = 0; i < this.meatBalls.length; i++) {
            const meatBallObject = this.meatBalls[i];
            meatBallObject.update();
            if (meatBallObject.getX() < 0 || meatBallObject.getX() > this.stageWidth ||
                meatBallObject.getY() < 0 || meatBallObject.getY() > this.stageHeight) {
                this.meatBalls.splice(i, 1);
                i--;
                continue;
            }
            ctx.beginPath();
            ctx.fillStyle = '#000000';
            ctx.arc(meatBallObject.getX(), 
                    meatBallObject.getY(), 
                    meatBallObject.radius, 0, 2 * Math.PI);
            ctx.fill();
            ctx.closePath();
        }
    }

    addMeatBall(meatBall) {
        this.meatBalls.push(meatBall);
        meatBall.resize(this.stageWidth, this.stageHeight);
    }
}
