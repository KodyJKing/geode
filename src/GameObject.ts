import Vector, { vector } from "./math/Vector";

import { boxContains, boxOverlaps } from "./collision/collision";

export default class GameObject {

    position: Vector = vector( 0, 0 )
    width: number = 0
    height: number = 0

    get dimensions() { return vector( this.width, this.height ) }

    constructor( position: Vector, width, height ) {
        this.position = position
        this.width = width
        this.height = height
    }

    contains( p: Vector ) { return boxContains( this, p ) }
    overlaps( other: GameObject ) { return boxOverlaps( this, other ) }
}