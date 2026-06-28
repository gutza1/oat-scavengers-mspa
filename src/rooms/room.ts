import WorldObject from '../world_objects/world_object';

export default class Room {
    private id: string;
    private background: string;
    private worldObjects: WorldObject[];

    constructor(id:string, background: string, worldObjects: WorldObject[]) {
        this.id = id;
        this.background = background; //stores id string of background image
		this.worldObjects = worldObjects;
	}

    public get Id(): string {
        return this.id;
    }

    public get Background(): string {
        return this.background;
    }
    
    public set Background(newBackground:string) {
        this.background = newBackground;
    }
    
    public get WorldObjects(): WorldObject[] {
        return this.worldObjects;
    }
    
}