import { ScreenSize } from "../../ScreenSize.js";
import { Vector } from "../../Vector.js";

export interface Entity {

    readonly _id: string | number;
    readonly _name: string;
    readonly _color: string;
    readonly _vector: Vector;
    readonly _screenSize: ScreenSize;

    _x?: number;
    _y?: number;
    _radius?: number;
    _radiusRatio?: number;

    initialize(xRatio: number, yRatio: number, radiusRatio: number, speedRatio: number, direction?: number): void;
    resize(screenSize: ScreenSize): void;
    update(xRatio: number, yRatio: number): void;

    get id(): string | number;
    get name(): string;
    get color(): string;
    get vector(): Vector;
    get screenSize(): ScreenSize;

    get x(): number;
    set x(x: number);
    setXByRatio(xRatio: number): void;
    get y(): number;
    set y(y: number);
    setYByRatio(yRatio: number): void;
    get radius(): number;
    set radius(radius: number);
    setRadiusByRatio(radiusRatio: number): void;
    get radiusRatio(): number;
    set radiusRatio(radiusRatio: number);

    get xRatio(): number;
    get yRatio(): number;

    get speed(): number;
    set speed(speedRatio: number);

}
