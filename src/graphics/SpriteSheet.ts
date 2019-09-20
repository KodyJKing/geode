import Sprite from "./Sprite"
import Vector, { vector } from "../math/Vector"

type SpriteSheetArgs = {
    image: HTMLImageElement | ImageBitmap
    frameWidth: number
    scale?: number
    center?: Vector
}
export default class SpriteSheet {
    private image: HTMLImageElement | ImageBitmap
    private frameWidth: number
    private _center?: Vector
    scale: number = 1

    constructor( options: SpriteSheetArgs ) {
        this.image = options.image
        this.frameWidth = options.frameWidth
        this.scale = options.scale || this.scale
        this._center = options.center || this._center
    }

    setScale( scale: number ) {
        this.scale = scale
        return this
    }

    setCenter( center: Vector ) {
        this._center = center
        return this
    }

    get center() {
        if ( this._center )
            return this._center.multiply( this.scale )
        return this.spriteDimensions.half
    }

    get frameCount() {
        return Math.floor( this.image.width / this.frameWidth )
    }

    frame( index: number ) {
        index %= this.frameCount
        let sprite = new Sprite( this.image )
            .setSource( { x: this.frameWidth * index, y: 0, w: this.frameWidth, h: this.image.height } )
            .setDimensions( this.spriteDimensions )
            .setCenter( this.center )
        return sprite
    }

    frameAtPercent( percent: number ) {
        return this.frame( Math.floor( percent * this.frameCount ) )
    }

    get frameDimensions() {
        return vector( this.frameWidth, this.image.height )
    }

    get spriteDimensions() {
        return this.frameDimensions.multiply( this.scale )
    }
}