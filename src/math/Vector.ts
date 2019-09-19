import GMath from "./GMath";

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
    stretch( x: number, y: number ) { return new Vector( this.x * x, this.y * y ) }
    divide( divisor: number ) { return new Vector( this.x / divisor, this.y / divisor ) }
    lerp( other: Vector, t: number ) { return this.multiply( 1 - t ).add( other.multiply( t ) ) }

    rotated( angle: number ) {
        return this.complexProduct( Vector.polar( angle, 1 ) )
    }

    isRightOf( other: Vector ) {
        return this.cross( other ) > 0
    }

    normalOnSide( side: Vector ) {
        if ( side.isRightOf( this ) )
            return this.rightNormal
        return this.leftNormal
    }

    *[ Symbol.iterator ]() {
        yield this.x
        yield this.y
    }

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

    projection(other: Vector) {
        return other.multiply( other.dot(this) / other.lengthSquared )
    }

    equivalent( other: Vector, epsilon = 0.000001 ) {
        return GMath.equalivalent( this.x, other.x, epsilon ) &&
            GMath.equalivalent( this.y, other.y, epsilon )
    }

    static polar( angle, length ) {
        return new Vector( Math.cos( angle ) * length, Math.sin( angle ) * length )
    }

    static lissajous( t, xPeriod, yPeriod, xAmplitude = 1, yAmplitude = xAmplitude, xPhase = 0, yPhase = 0 ) {
        return vector(
            Math.cos( GMath.TAU * ( t + xPhase ) / xPeriod ) * xAmplitude,
            Math.sin( GMath.TAU * ( t + yPhase ) / yPeriod ) * yAmplitude
        )
    }

    static random( length ) {
        let angle = Math.random() * 2 * Math.PI
        return Vector.polar( angle, length )
    }

}