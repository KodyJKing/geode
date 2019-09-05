import Sprite from "./Sprite";

export default class SpriteSheet {
    image: HTMLImageElement
    frameWidth: number

    constructor( image: HTMLImageElement, frameWidth: number ) {
        this.image = image
        this.frameWidth = frameWidth
    }

    get frameCount() {
        return Math.floor( this.image.width / this.frameWidth )
    }

    frame( index: number ) {
        index %= this.frameCount
        return new Sprite( this.image ).setSource( { x: this.frameWidth * index, y: 0, w: this.frameWidth, h: this.image.height } )
    }

    frameAtPercent( percent: number ) {
        return this.frame( Math.floor( percent * this.frameCount ) )
    }
}