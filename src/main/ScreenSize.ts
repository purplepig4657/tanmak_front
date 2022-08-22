export class ScreenSize {

    private _screenWidth: number | undefined | null;
    private _screenHeight: number | undefined | null;
    private _previousScreenWidth: number | undefined | null;
    private _previousScreenHeight: number | undefined | null;

    constructor(screenWidth: number, screenHeight: number) {
        this._screenWidth = screenWidth;
        this._screenHeight = screenHeight;
    }

    public initialize(): void {
        return;
    }

    public get screenWidth(): number {
        if (this._screenWidth) return this._screenWidth;
        else throw Error("UndefinedError");  // Fix this.
    }

    public set screenWidth(width: number) {
        this._previousScreenWidth = this._screenWidth ? this._screenWidth : width;
        this._screenWidth = width;
    }

    public get screenHeight(): number {
        if (this._screenHeight) return this._screenHeight;
        else throw Error("UndefinedError");  // Fix this.
    }

    public set screenHeight(height: number) {
        this._previousScreenHeight = this._screenHeight ? this._screenHeight : height;
        this._screenHeight = height;
    }

    public get previousScreenWidth(): number {
        if (this._previousScreenWidth) return this._previousScreenWidth;
        else throw Error("UndefinedError");  // Fix this.
    }

    public set previousScreenWidth(width: number) {
        this._previousScreenWidth = width;
    }

    public get previousScreenHeight(): number {
        if (this._previousScreenHeight) return this._previousScreenHeight;
        else throw Error("UndefinedError");  // Fix this.
    }

    public set previousScreenHeight(height: number) {
        this._previousScreenHeight = height;
    }

}
