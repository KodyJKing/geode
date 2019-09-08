export default class GMath {
    static TAU = Math.PI * 2
    static degreesToRadians = GMath.TAU / 360
    static lerp( a: number, b: number, amount: number ) {
        return a * ( 1 - amount ) + b * amount
    }
}