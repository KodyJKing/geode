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

    static sigmoid( x ) {
        let exp = Math.exp( x )
        return exp / ( exp + 1 )
    }

    static soften( x, softness = 1 ) {
        function f( x ) {
            return x > 1 ?
                x - 0.5 :
                x * x / 2
        }

        return f( Math.abs( x ) / softness ) * softness * Math.sign( x )
    }

}