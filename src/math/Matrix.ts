import Vector from "./Vector"

export default class Matrix {
    xx = 0; xy = 0
    yx = 0; yy = 0
    dx = 0; dy = 0

    constructor( xx = 0, xy = 0, yx = 0, yy = 0, dx = 0, dy = 0 ) {
        this.xx = xx; this.xy = xy
        this.yx = yx; this.yy = yy
        this.dx = dx; this.dy = dy
    }

    multiplyVector( v: Vector ) {
        return new Vector(
            this.xx * v.x + this.xy * v.y,
            this.yx * v.x + this.yy * v.y
        )
    }

    multiplyPoint( v: Vector ) {
        return new Vector(
            this.xx * v.x + this.xy * v.y + this.dx,
            this.yx * v.x + this.yy * v.y + this.dy
        )
    }

    multiplyMatrix( B: Matrix ) {
        let A = this
        return new Matrix(
            A.xx * B.xx + A.xy * B.yx, A.xx * B.xy + A.xy * B.yy,
            A.yx * B.xx + A.yy * B.yx, A.yx * B.xy + A.yy * B.yy,
            A.xx * B.dx + A.xy * B.dy + A.dx,
            A.yx * B.dx + A.yy * B.dy + A.dy
        )
    }

    static translation( x = 0, y = 0 ) {
        return new Matrix(
            1, 0,
            0, 1,
            x, y
        )
    }

    static rotation( angle = 0 ) {
        let s = Math.sin( angle )
        let c = Math.cos( angle )
        return new Matrix(
            c, -s,
            s, c,
            0, 0
        )
    }

    static scale( x = 1, y = 1 ) {
        return new Matrix(
            x, 0,
            0, y,
            0, 0
        )
    }

}