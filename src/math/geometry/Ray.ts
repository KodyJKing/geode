import Vector from "../Vector";

export default class Ray {
    
    readonly point: Vector
    readonly heading: Vector

    pointAt(time: number) {
        return this.point.add( this.heading.multiply(time) )
    }

    constructor( point: Vector, heading: Vector ) {
        this.point = point
        this.heading = heading
    }

}