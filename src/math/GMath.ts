export default class GMath {
    static TAU = Math.PI * 2
    static degreesToRadians = GMath.TAU / 360
    static lerp( a: number, b: number, amount: number ) {
        return a * ( 1 - amount ) + b * amount
    }
    static clamp( x: number, min: number, max: number ) {
        if ( x < min ) return min
        if ( x > max ) return max
        return x
    }
}