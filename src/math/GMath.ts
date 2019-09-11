export default class GMath {
    static TAU = Math.PI * 2
    static degreesToRadians = GMath.TAU / 360

    static modulus( n: number, m: number ) {
        return ( ( n % m ) + m ) % m
    }

    static lerp( a: number, b: number, amount: number ) {
        return a * ( 1 - amount ) + b * amount
    }

    static clamp( x: number, min: number, max: number ) {
        if ( x < min ) return min
        if ( x > max ) return max
        return x
    }

    static shortestRotation( from: number, to: number ) {
        let diff = GMath.modulus( to - from, GMath.TAU )
        if ( diff > Math.PI ) diff -= GMath.TAU
        return diff
    }

    static angleLerp( from: number, to: number, amount: number ) {
        return from + GMath.shortestRotation( from, to ) * amount
    }

}