import Vector2 from "../Vector2"
import Ray from "./Ray"

export default class Line {
    a: Vector2
    b: Vector2

    constructor( a: Vector2, b: Vector2 ) {
        this.a = a
        this.b = b
    }

    get heading() {
        return this.b.subtract( this.a )
    }

    get leftNormal() {
        return this.heading.leftNormal()
    }

    rayCast( ray: Ray ) {
        let { a, b } = this
        let rayToA = a.subtract( ray.point )
        let n = b.subtract( a ).leftNormal()
        let distance = rayToA.dot( n )
        let speed = ray.heading.dot( n )
        let time = distance / speed
        return time
    }
}