import SpriteSheet from "./SpriteSheet"
import Clock, { GameClock } from "../Clock"
import Canvas from "./Canvas"

export default class Animator {

    private sheet: SpriteSheet
    private startTime?
    private playTime?
    private clock: Clock

    constructor( sheet: SpriteSheet, clock = GameClock ) {
        this.sheet = sheet
        this.clock = clock
    }

    private getPercent( time: number ) {
        return ( time - this.startTime ) / this.playTime
    }

    private getSprite( time: number ) {
        let { startTime } = this
        if ( startTime && time < startTime + this.playTime ) {
            return this.sheet.frameAtPercent( this.getPercent( this.clock.time ) )
        } else {
            this.stop()
            return this.sheet.frame( 0 )
        }
    }

    play( playTime: number ) {
        this.startTime = this.clock.time
        this.playTime = playTime
    }

    stop() {
        this.playTime = undefined
        this.startTime = undefined
    }

    onRender( canvas: Canvas ) {
        this.getSprite( this.clock.time ).draw( canvas, 0, 0, true )
    }

    get playing() {
        return this.playTime == undefined
    }

}