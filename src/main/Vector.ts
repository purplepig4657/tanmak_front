import { ScreenSize } from "./ScreenSize.js";

export class Vector {

    private readonly _screenSize: ScreenSize;
    private _speed: number;
    private _direction?: number;

    constructor(screenSize: ScreenSize, speed: number, direction?: number) {
        this._screenSize = screenSize;
        this._speed = speed;
        this._direction = direction;
    }

    public get screenSize(): ScreenSize {
        return this._screenSize;
    }

    public get speed(): number {
        return this._speed;
    }

    public set speed(speed: number) {
        this._speed = speed;
    }

    public get xSpeed(): number {
        if (this.direciton === undefined) return this.speed * this.screenSize.screenWidth;
        else return this.speed * this.screenSize.screenWidth * Math.cos(this.direciton);
    }
    
    public get ySpeed(): number {
        if (this.direciton === undefined) return this.speed * this.screenSize.screenHeight;
        else return this.speed * this.screenSize.screenHeight * Math.sin(this.direciton);
    }

    public get direciton(): number | undefined {
        return this._direction;
    }

    public set direction(radian: number) {
        if (radian >= 0 && radian <= 2 * Math.PI) this._direction = radian;
        else throw Error();  // Fix this.
    }

}
