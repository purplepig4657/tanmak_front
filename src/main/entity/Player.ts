import { ScreenSize } from "../ScreenSize.js";
import { Vector } from "../Vector.js";
import { Entity } from "./interface/Entity.js";

export class Player implements Entity {
    
    readonly _id: string;
    readonly _name: string;
    readonly _color: string;
    readonly _vector: Vector;
    readonly _screenSize: ScreenSize;

    _x?: number;
    _y?: number;
    _radius?: number;
    _radiusRatio?: number;

    constructor(id: string, name: string, color: string, screenSize: ScreenSize) {
        this._id = id;
        this._name = name;
        this._color = color;
        this._vector = new Vector(screenSize, 0);  // 0 is initialization speed, It doesn't have a meaning.
        this._screenSize = screenSize;
    }

    public initialize(xRatio: number, yRatio: number, radiusRatio: number, speedRatio: number, direction?: number): void {
        this.setXByRatio(xRatio);
        this.setYByRatio(yRatio);
        this.radiusRatio = radiusRatio;
        this.setRadiusByRatio(this.radiusRatio);
        this.vector.speed = speedRatio;
        // Players don't need direction field.
    }

    public resize(screenSize: ScreenSize): void {
        const previousXRatio = this.xRatio;
        const previousYRatio = this.yRatio;

        this.screenSize.screenWidth = screenSize.screenWidth;
        this.screenSize.screenHeight = screenSize.screenHeight;

        this.initialize(previousXRatio, previousYRatio, this.radiusRatio, this.speed);
    }

    public update(xRatio: number, yRatio: number): void {
        this.x = xRatio;
        this.y = yRatio;
    }

    public get id(): string {
        return this._id;
    }
    
    public get name(): string {
        return this._name;
    }

    public get color(): string {
        return this._color;
    }

    public get vector(): Vector {
        return this._vector;
    }

    public get screenSize(): ScreenSize {
        return this._screenSize;
    }

    public get x(): number {
        if (this._x !== undefined) return this._x;
        else throw Error("UndefinedError");  // Fix this.
    }

    public set x(x: number) {
        if (x >= 0 && x <= this.screenSize.screenWidth) this._x = x;
        else throw Error("OutOfRangeError");  // Fix this.
    }

    public setXByRatio(xRatio: number): void {
        if (xRatio >= 0 && xRatio <= 1) this.x = this.screenSize.screenWidth * xRatio;
        else throw Error("OutOfRangeError");  // Fix this.
    }

    public get y(): number {
        if (this._y !== undefined) return this._y;
        else throw Error("UndefinedError");  // Fix this.
    }

    public set y(y: number) {
        if (y >= 0 && y <= this.screenSize.screenHeight) this._y = y;
        else throw Error("OutOfRangeError");  // Fix this.
    }

    public setYByRatio(yRatio: number): void {
        if (yRatio >= 0 && yRatio <= 1) this.y = this.screenSize.screenHeight * yRatio;
        else throw Error("OutOfRangeError");  // Fix this.
    }

    public get radius(): number {
        if (this._radius !== undefined) return this._radius;
        else throw Error("UndefinedError");  // Fix this.
    }

    public set radius(radius: number) {
        this._radius = radius;
    }

    public setRadiusByRatio(radiusRatio: number): void {
        if (radiusRatio >= 0 && radiusRatio <= 1) 
            this.radius = this.screenSize.screenWidth * this.screenSize.screenHeight * radiusRatio;
        else throw Error("OutOfRangeError");  // Fix this.
    }

    get radiusRatio(): number {
        if (this._radiusRatio !== undefined) return this._radiusRatio;
        else throw Error("UndefinedError");  // Fix this.
    }

    set radiusRatio(radiusRatio: number) {
        this._radiusRatio = radiusRatio;
    }

    public get xRatio(): number {
        return this.x / this.screenSize.screenWidth;
    }

    public get yRatio(): number {
        return this.y / this.screenSize.screenHeight;
    }

    public get speed(): number {
        return this.vector.speed;
    }

    public set speed(speedRatio: number) {
        this.vector.speed = speedRatio;
    }

}
