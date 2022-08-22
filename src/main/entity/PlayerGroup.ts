import { ScreenSize } from "../ScreenSize.js";
import { Group } from "./interface/Group.js";
import { Player } from "./Player.js";

interface EntitiesObject {
    [key: string]: Player;
}

export class PlayerGroup implements Group<Player> {

    readonly _screenSize: ScreenSize;

    _entities: EntitiesObject;
    private _myPlayer?: Player;

    constructor(screenSize: ScreenSize) {
        this._screenSize = screenSize;
        const entities: EntitiesObject = {};
        this._entities = entities;
    }

    public initialize(): void {
        
    }

    public resize(screenSize: ScreenSize): void {
        for (const player in this.entities) this.entities[player].resize(screenSize);
        this.screenSize.screenWidth = screenSize.screenWidth;
        this.screenSize.screenHeight = screenSize.screenHeight;
    }

    public update(ctx: CanvasRenderingContext2D): void {
        for (const player in this.entities) {
            const playerObject: Player = this.entities[player];
            ctx.beginPath();
            ctx.fillStyle = playerObject.color;
            ctx.arc(playerObject.x, playerObject.y, playerObject.radius, 0, 2 * Math.PI);
            ctx.textAlign = 'center';
            ctx.fillText(playerObject.name, playerObject.x, playerObject.y - playerObject.radius - 5);
            ctx.fill();
            ctx.closePath();
        }
    }

    public getEntity(id: string): Player {
        const targetPlayer = this.entities[id];
        if (targetPlayer !== undefined) return this.entities[id];
        else throw Error("UndefinedError");  // Fix this.
    }

    public addEntity(entity: Player): void {
        const target = this.entities[entity.id];
        if (target === undefined) this.entities[entity.id] = entity;
        else throw Error("DuplicatedError");  // Fix this.
    }

    public get screenSize(): ScreenSize {
        return this._screenSize;
    }

    public get myPlayer(): Player {
        if (this._myPlayer !== undefined) return this._myPlayer;
        else throw Error("UndefinedError");  // Fix this.
    }

    public set myPlayer(myPlayer: Player) {
        if (myPlayer !== undefined) {
            this._myPlayer = myPlayer;
            this.addEntity(myPlayer);
        } else throw Error("UndefinedError");  // Fix this.
    }

    public get entities(): EntitiesObject {
        return this._entities;
    }

}
