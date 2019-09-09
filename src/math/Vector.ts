export function vector( x, y ) { return new Vector( x, y ) }
export default class Vector {

    readonly x: number
    readonly y: number

    static ZERO = new Vector( 0, 0 )
    static ONE = new Vector( 1, 1 )
    static RIGHT = new Vector( 1, 0 )
    static LEFT = new Vector( -1, 0 )
    static DOWN = new Vector( 0, 1 )
    static UP = new Vector( 0, -1 )

    constructor( x: number, y: number ) {
        this.x = x
        this.y = y
    }

    get length() { return Math.sqrt( this.x * this.x + this.y * this.y ) }
    get lengthSquared() { return this.x * this.x + this.y * this.y }
    get unit() { return this.multiply( 1 / this.length ) }
    get leftNormal() { return new Vector( -this.y, this.x ) }
    get rightNormal() { return new Vector( this.y, -this.x ) }
    get angle() { return Math.atan2( this.y, this.x ) }
    get negate() { return new Vector( -this.x, -this.y ) }
    get values() { return [ this.x, this.y ] }
    get half() { return new Vector( this.x * 0.5, this.y * 0.5 ) }
    get copy() { return new Vector( this.x, this.y ) }

    add( other: Vector ) { return new Vector( this.x + other.x, this.y + other.y ) }
    addXY( x: number, y: number ) { return new Vector( this.x + x, this.y + y ) }
    addX( x: number ) { return new Vector( this.x + x, this.y ) }
    addY( y: number ) { return new Vector( this.x, this.y + y ) }
    subtract( other: Vector ) { return new Vector( this.x - other.x, this.y - other.y ) }
    dot( other: Vector ) { return this.x * other.x + this.y * other.y }
    cross( other: Vector ) { return this.x * other.y - this.y * other.x }
    multiply( scale: number ) { return new Vector( this.x * scale, this.y * scale ) }
    divide( divisor: number ) { return new Vector( this.x / divisor, this.y / divisor ) }
    lerp( other: Vector, t: number ) { return this.multiply( 1 - t ).add( other.multiply( t ) ) }

    complexProduct( other: Vector ) {
        let x = this.x * other.x - this.y * other.y
        let y = this.x * other.y + this.y * other.x
        return new Vector( x, y )
    }

    complexQuotient( other: Vector ) {
        let lengthSquared = other.lengthSquared
        let x = this.x * other.x + this.y * other.y
        let y = this.y * other.x - this.x * other.y
        return new Vector( x / lengthSquared, y / lengthSquared )
    }

    get complexExponential() {
        let magnitude = Math.exp( this.x )
        return new Vector( magnitude * Math.cos( this.y ), magnitude * Math.sin( this.y ) )
    }

    static polar( angle, length ) {
        return new Vector( Math.cos( angle ) * length, Math.sin( angle ) * length )
    }

    static random( length ) {
        let angle = Math.random() * 2 * Math.PI
        return Vector.polar( angle, length )
    }

}