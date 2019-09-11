import Vector from "../math/Vector";
import Transform from "../math/Transform";
import Color from "./Color";
import { camelToDashes } from "../util";

type FilterOptions = {
    blur?: number,
    brightness?: number,
    contrast?: number,
    dropShadow?: {
        offsetX: number,
        offsetY: number,
        blurRadius: number,
        color: string | Color
    },
    grayscale?: number,
    hueRotate?: number,
    invert?: number,
    opacity?: number
    saturate?: number,
    sepia?: number
}

type FillStyle = string | CanvasGradient | CanvasPattern | Color
function coerceFillStyle( style: FillStyle ) {
    return ( style instanceof Color ) ? style.toString() : style
}

export default class Canvas {


    canvas: HTMLCanvasElement
    context: CanvasRenderingContext2D

    width = window.innerWidth
    height = window.innerHeight

    private _imageSource = {
        x: 0, y: 0,
        w: 0, h: 0
    }

    constructor( canvas: HTMLCanvasElement | string ) {
        if ( typeof canvas == "string" ) {
            let _canvas = document.getElementById( canvas )
            if ( _canvas instanceof HTMLCanvasElement )
                canvas = _canvas
            else
                throw new Error( "No canvas with id: " + canvas + " found." )
        }
        this.canvas = canvas
        this.context = this.canvas.getContext( "2d" ) as CanvasRenderingContext2D
    }

    resize( w, h, pixelDensity = 1 ) {
        this.width = w
        this.height = h
        this.canvas.style.width = w + "px"
        this.canvas.style.height = h + "px"
        this.canvas.width = w * pixelDensity
        this.canvas.height = h * pixelDensity
        this.scale( pixelDensity, pixelDensity )
    }

    get dimensions() {
        return new Vector( this.width, this.height )
    }

    get center() {
        return this.dimensions.half
    }

    fitWindow( pixelDensity = 1 ) {
        this.resize( innerWidth, innerHeight, pixelDensity )
    }

    background( style: FillStyle ) {
        let { canvas, context: c } = this
        c.fillStyle = coerceFillStyle( style )
        c.fillRect( 0, 0, canvas.width, canvas.height )
        return this
    }

    vline( a: Vector, b: Vector ) { this.line( a.x, a.y, b.x, b.y ); return this }
    line( x1, y1, x2, y2 ) {
        let { context: c } = this
        c.beginPath()
        c.moveTo( x1, y1 )
        c.lineTo( x2, y2 )
        c.closePath()
        return this
    }

    vrect( p: Vector, dimensions: Vector ) { this.rect( p.x, p.y, dimensions.x, dimensions.y ); return this }
    rect( x, y, w, h ) {
        let { context: c } = this
        c.beginPath()
        c.rect( x, y, w, h )
        c.closePath()
        return this
    }

    vcircle( p: Vector, r ) { this.circle( p.x, p.y, r ); return this }
    circle( x, y, r ) {
        let { context: c } = this
        c.beginPath()
        c.ellipse( x, y, r, r, 0, 0, Math.PI * 2 )
        c.closePath()
        return this
    }

    stroke() {
        this.context.stroke()
        return this
    }

    fill() {
        this.context.fill()
        return this
    }

    strokeStyle( style: string | Color ) {
        this.context.strokeStyle = style.toString()
        return this
    }

    fillStyle( style: FillStyle ) {
        this.context.fillStyle = coerceFillStyle( style )
        return this
    }

    alpha( alpha: number ) {
        this.context.globalAlpha = alpha
        return this
    }

    composition( operation: string ) {
        this.context.globalCompositeOperation = operation
        return this
    }

    shadow( blur: number, color: string | Color = "black" ) {
        this.context.shadowBlur = blur
        this.context.shadowColor = color.toString()
        return this
    }

    addFilter( options: null | string | FilterOptions ) {
        if ( typeof options == "string" ) {
            this.context.filter = options
        } else if ( options == null ) {
            this.context.filter = "none"
        } else {

            let stringified = Object.entries( options as any ).map(
                ( [ key, value ] ) => {
                    if ( typeof value == "object" )
                        value = Object.values( Object ).map( x => x.toString() ).join( ", " )
                    let suffix = key == "hueRotate" ? "turn" : ""
                    return camelToDashes( key ) + "(" + value + suffix + ")"
                }
            ).join( " " )

            this.context.filter = stringified
        }

        return this
    }

    filter( options: null | string | FilterOptions ) {
        this.context.filter = "none"
        this.addFilter( options )
        return this
    }

    vimage( image, p: Vector, dimensions: Vector ) { this.image( image, p.x, p.y, dimensions.x, dimensions.y ); return this }
    image( image, dx = 0, dy = 0, w = 0, h = 0 ) {
        w = w || image.width
        h = h || image.height
        this.context.drawImage( image, dx, dy, w, h )
        return this
    }

    vpartialImage( image, p: Vector, dimensions: Vector ) { this.partialImage( image, p.x, p.y, dimensions.x, dimensions.y ); return this }
    partialImage( image, x, y, w, h ) {
        let { _imageSource: imageSource } = this
        w = w || imageSource.w
        h = h || imageSource.h
        this.context.drawImage(
            image,
            imageSource.x, imageSource.y,
            imageSource.w, imageSource.h,
            x, y, w, h
        )
    }

    vimageSource( p: Vector, dimensions: Vector ) { this.imageSource( p.x, p.y, dimensions.x, dimensions.y ); return this }
    imageSource( x, y, w, h ) {
        this._imageSource = { x, y, w, h }
        return this
    }

    vtranslate( p: Vector ) { this.translate( p.x, p.y ); return this }
    translate( x, y ) {
        // this.context.translate( Math.round( x ), Math.round( y ) )
        this.context.translate( x, y )
        return this
    }

    rotate( angle ) {
        this.context.rotate( angle )
        return this
    }

    vscale( v: Vector ) { this.scale( v.x, v.y ); return this }
    scale( x, y ) {
        this.context.scale( x, y )
        return this
    }

    transform( t: Transform ) {
        let { x, y } = t.position
        let { x: sx, y: sy } = t.scale
        let { x: cx, y: cy } = t.center
        if ( t.parent )
            this.transform( t.parent )
        this.translate( x, y )
            .rotate( t.rotation )
            .scale( sx, sy )
            .translate( -cx, -cy )
        return this
    }

    inverseTransform( t: Transform ) {
        let { x, y } = t.position
        let { x: sx, y: sy } = t.scale
        let { x: cx, y: cy } = t.center
        this.translate( cx, cy )
            .scale( 1 / sx, 1 / sy )
            .rotate( - t.rotation )
            .translate( -x, -y )
        if ( t.parent )
            this.inverseTransform( t.parent )
        return this
    }

    vtext( text, p: Vector, width, font = "50px pixel" ) { this.text( text, p.x, p.y, width, font ); return this }
    text( text, x, y, width, font = "50px pixel" ) {
        let c = this.context
        c.font = font
        c.fillText( text, x, y, width )
        return this
    }

    push() {
        this.context.save()
        return this
    }

    pop() {
        this.context.restore()
        return this
    }

    gradient( from: Vector, to: Vector, colors: [ number, Color | string ][] ) {
        let grad = this.context.createLinearGradient( from.x, from.y, to.x, to.y )
        for ( let [ percent, color ] of colors )
            grad.addColorStop( percent, color.toString() )
        return grad
    }
}