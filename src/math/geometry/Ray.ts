import Vector2 from "../Vector2"

export default class Ray {

    readonly point: Vector2
    readonly heading: Vector2

    pointAt( time: number ) {
        return this.point.add( this.heading.multiply( time ) )
    }

    constructor( point: Vector2, heading: Vector2 ) {
        this.point = point
        this.heading = heading
    }

}