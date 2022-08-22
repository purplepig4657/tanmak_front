import { ScreenSize } from "../../ScreenSize.js";

export interface Group<T> {

    readonly _screenSize: ScreenSize;

    _entities: Object;

    initialize(): void;
    resize(screenSize: ScreenSize): void;
    update(ctx: CanvasRenderingContext2D | null): void;

    getEntity(id: string | number): T;
    addEntity(entity: T): void;

    get screenSize(): ScreenSize;
    get entities(): object;

}
