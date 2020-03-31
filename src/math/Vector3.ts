export default class Vector3 {
    x: number
    y: number
    z: number
    constructor( x: number, y: number, z: number ) {
        this.x = x
        this.y = y
        this.z = z
    }
    get length() { return Math.sqrt( this.x * this.x + this.y * this.y + this.z * this.z ) }
    get lengthSquared() { return this.x * this.x + this.y * this.y + this.z * this.z }
    unit() { return this.multiply( 1 / this.length ) }
    negate() { return new Vector3( -this.x, -this.y, this.z ) }
    add( other: Vector3 ) { return new Vector3( this.x + other.x, this.y + other.y, this.z + other.z ) }
    subtract( other: Vector3 ) { return new Vector3( this.x - other.x, this.y - other.y, this.z - other.z ) }
    dot( other: Vector3 ) { return this.x * other.x + this.y * other.y + this.z * other.z }
    cross( other: Vector3 ) {
        return new Vector3(
            this.y * other.z - this.z * other.y,
            this.z * other.x - this.x * other.z,
            this.x * other.y - this.y * other.x
        )
    }
    multiply( scale: number ) { return new Vector3( this.x * scale, this.y * scale, this.z * scale ) }
    divide( divisor: number ) { return this.multiply( 1 / divisor ) }
    lerp( other: Vector3, t: number ) { return this.multiply( 1 - t ).add( other.multiply( t ) ) }
}
