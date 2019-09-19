import Canvas from "./Canvas";
import Vector, { vector } from "../math/Vector";
import IBoundingBox from "../math/geometry/IBoundingBox";

type ImageSource = {
    x: number,
    y: number
    w: number,
    h: number
}

export default class Sprite implements IBoundingBox {
    readonly image: CanvasImageSource
    private _dimensions?: Vector
    private source?: ImageSource
    private _center?: Vector

    constructor( image: CanvasImageSource ) {
        this.image = image
    }

    get dimensions() { return this._dimensions || vector( this.image.width, this.image.height ) }
    get position() { return Vector.ZERO }

    get center() {
        return this._center || this.dimensions.half
    }

    setDimensions( v: Vector ) {
        this._dimensions = v
        return this
    }

    setSource( source: ImageSource ) {
        this.source = source
        return this
    }

    setCenter( center: Vector ) {
        this._center = center
        return this
    }

    draw( canvas: Canvas, x = 0, y = 0, doCenter = false ) {
        let { image, source, dimensions } = this
        let { x: width, y: height } = dimensions

        if ( doCenter ) {
            let center = this.center
            x -= center.x
            y -= center.y
        }

        if ( source )
            canvas.imageSource( source.x, source.y, source.w, source.h ).partialImage( this.image, x, y, width, height )
        else
            canvas.image( image, x, y, width, height )
    }

    vdraw( canvas: Canvas, v: Vector, center = false ) {
        this.draw( canvas, v.x, v.y )
    }
}