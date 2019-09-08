import Vector from "./Vector";

export default class MutableVector extends Vector {
    x!: number
    y!: number

    constructor( x: number, y: number ) {
        super( x, y )
    }
}