export class MeatBall {
    constructor(speed, xDirection, yDirection, xRatio, yRatio) {
        this.speed = speed;
        this.xDirection = xDirection;
        this.yDirection = yDirection;
        this.xRatio = xRatio;
        this.yRatio = yRatio;
    }

    init(xRatio, yRatio) {
        const radiusConstant = 4 / (800 * 800);
        this.meatBallXSpeed = this.stageWidth * this.speed * this.xDirection;
        this.meatBallYSpeed = this.stageHeight * this.speed * this.yDirection;
        this.radius = this.stageWidth * this.stageHeight * radiusConstant;
        this.setXByRatio(xRatio);
        this.setYByRatio(yRatio);
    }

    resize(stageWidth, stageHeight) {
        const previousXRatio = this.getXRatio();
        const previousYRatio = this.getYRatio();

        this.stageWidth = stageWidth;
        this.stageHeight = stageHeight;

        this.init(previousXRatio, previousYRatio);
    }

    update() {
        this.x += this.meatBallXSpeed;
        this.y += this.meatBallYSpeed;
    }

    getX() {
        return this.x;
    }

    getY() {
        return this.y;
    }

    getXRatio() {
        if (this.x === undefined) return this.xRatio;
        return this.x / this.stageWidth;
    }

    getYRatio() {
        if (this.y === undefined) return this.yRatio;
        return this.y / this.stageHeight;
    }

    setXByRatio(xRatio) {
        this.x = this.stageWidth * xRatio;
    }

    setYByRatio(yRatio) {
        this.y = this.stageHeight * yRatio;
    }
}
