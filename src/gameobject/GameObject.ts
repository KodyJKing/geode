import Vector, { vector } from "../math/Vector";

import { boxContains, boxOverlaps } from "../collision/collision";
import Transform from "../math/Transform";
import Scene from "./Scene";

export default class GameObject {

    scene?: Scene
    sceneIndex = 0
    layer: number = 0

    transform: Transform = new Transform()

    width: number = 0
    height: number = 0

    get position() { return this.transform.position }
    set position( value: Vector ) { this.transform.position = value }

    get rotation() { return this.transform.rotation }
    set rotation( value: number ) { this.transform.rotation = value }

    get dimensions() { return vector( this.width, this.height ) }
    get center() { return this.position.add( this.dimensions.half ) }

    constructor( position: Vector, width, height ) {
        this.position = position
        this.width = width
        this.height = height
    }

    contains( p: Vector ) { return boxContains( this, p ) }
    overlaps( other: GameObject ) { return boxOverlaps( this, other ) }

    onRender() { }
    onUpdate() { }

}