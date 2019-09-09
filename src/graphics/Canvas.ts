import Vector from "../math/Vector";
import Transform from "../math/Transform";
import Color from "./Color";

export default class Canvas {

    static canvas: HTMLCanvasElement
    static context: CanvasRenderingContext2D

    static width = window.innerWidth
    static height = window.innerHeight

    private static _imageSource = {
        x: 0, y: 0,
        w: 0, h: 0
    }

    static setup() {
        Canvas.canvas = document.getElementById( "canvas" ) as HTMLCanvasElement
        Canvas.context = Canvas.canvas.getContext( "2d" ) as CanvasRenderingContext2D
    }

    static resize( w, h, pixelDensity = 1 ) {
        Canvas.width = w
        Canvas.height = h
        Canvas.canvas.style.width = w + "px"
        Canvas.canvas.style.height = h + "px"
        Canvas.canvas.width = w * pixelDensity
        Canvas.canvas.height = h * pixelDensity
        Canvas.scale( pixelDensity, pixelDensity )
    }

    static get dimensions() {
        return new Vector( Canvas.width, Canvas.height )
    }

    static get center() {
        return Canvas.dimensions.half
    }

    static fitWindow( pixelDensity = 1 ) {
        Canvas.resize( innerWidth, innerHeight, pixelDensity )
    }

    static background( style ) {
        let { canvas, context: c } = Canvas
        c.fillStyle = style
        c.fillRect( 0, 0, canvas.width, canvas.height )
        return Canvas
    }

    static vline( a: Vector, b: Vector ) { Canvas.line( a.x, a.y, b.x, b.y ); return Canvas }
    static line( x1, y1, x2, y2 ) {
        let { context: c } = Canvas
        c.beginPath()
        c.moveTo( x1, y1 )
        c.lineTo( x2, y2 )
        c.closePath()
        return Canvas
    }

    static vrect( p: Vector, dimensions: Vector ) { Canvas.rect( p.x, p.y, dimensions.x, dimensions.y ); return Canvas }
    static rect( x, y, w, h ) {
        let { context: c } = Canvas
        c.beginPath()
        c.rect( x, y, w, h )
        c.closePath()
        return Canvas
    }

    static vcircle( p: Vector, r ) { Canvas.circle( p.x, p.y, r ); return Canvas }
    static circle( x, y, r ) {
        let { context: c } = Canvas
        c.beginPath()
        c.ellipse( x, y, r, r, 0, 0, Math.PI * 2 )
        c.closePath()
        return Canvas
    }

    static stroke() {
        Canvas.context.stroke()
        return Canvas
    }

    static fill() {
        Canvas.context.fill()
        return Canvas
    }

    static strokeStyle( style: string | Color ) {
        Canvas.context.strokeStyle = style.toString()
        return Canvas
    }

    static fillStyle( style: string | Color ) {
        Canvas.context.fillStyle = style.toString()
        return Canvas
    }

    static alpha( alpha: number ) {
        Canvas.context.globalAlpha = alpha
        return Canvas
    }

    static shadow( blur: number, color: string | Color = "black" ) {
        Canvas.context.shadowBlur = blur
        Canvas.context.shadowColor = color.toString()
        return Canvas
    }

    static vimage( image, p: Vector, dimensions: Vector ) { Canvas.image( image, p.x, p.y, dimensions.x, dimensions.y ); return Canvas }
    static image( image, dx = 0, dy = 0, w = 0, h = 0 ) {
        w = w || image.width
        h = h || image.height
        Canvas.context.drawImage( image, dx, dy, w, h )
        return Canvas
    }

    static vpartialImage( image, p: Vector, dimensions: Vector ) { Canvas.partialImage( image, p.x, p.y, dimensions.x, dimensions.y ); return Canvas }
    static partialImage( image, x, y, w, h ) {
        let { _imageSource: imageSource } = Canvas
        w = w || imageSource.w
        h = h || imageSource.h
        Canvas.context.drawImage(
            image,
            imageSource.x, imageSource.y,
            imageSource.w, imageSource.h,
            x, y, w, h
        )
    }

    static vimageSource( p: Vector, dimensions: Vector ) { Canvas.imageSource( p.x, p.y, dimensions.x, dimensions.y ); return Canvas }
    static imageSource( x, y, w, h ) {
        Canvas._imageSource = { x, y, w, h }
        return Canvas
    }

    static vtranslate( p: Vector ) { Canvas.translate( p.x, p.y ); return Canvas }
    static translate( x, y ) {
        // Canvas.context.translate( Math.round( x ), Math.round( y ) )
        Canvas.context.translate( x, y )
        return Canvas
    }

    static rotate( angle ) {
        Canvas.context.rotate( angle )
        return Canvas
    }

    static vscale( v: Vector ) { Canvas.scale( v.x, v.y ); return Canvas }
    static scale( x, y ) {
        Canvas.context.scale( x, y )
        return Canvas
    }

    static transform( t: Transform, until?: Transform ) {
        if ( t == until )
            return Canvas
        let { x, y } = t.position
        let { x: sx, y: sy } = t.scale
        let { x: cx, y: cy } = t.center
        if ( t.parent )
            this.transform( t.parent )
        Canvas.translate( x, y )
            .rotate( t.rotation )
            .scale( sx, sy )
            .translate( -cx, -cy )
        return Canvas
    }

    static inverseTransform( t: Transform, until?: Transform ) {
        if ( t == until )
            return Canvas
        let { x, y } = t.position
        let { x: sx, y: sy } = t.scale
        let { x: cx, y: cy } = t.center
        Canvas.translate( cx, cy )
            .scale( 1 / sx, 1 / sy )
            .rotate( - t.rotation )
            .translate( -x, -y )
        if ( t.parent )
            this.inverseTransform( t.parent )
        return Canvas
    }

    static vtext( text, p: Vector, width, font = "50px pixel" ) { Canvas.text( text, p.x, p.y, width, font ); return Canvas }
    static text( text, x, y, width, font = "50px pixel" ) {
        let c = Canvas.context
        c.font = font
        c.fillText( text, x, y, width )
        return Canvas
    }

    static push() {
        Canvas.context.save()
        return Canvas
    }

    static pop() {
        Canvas.context.restore()
        return Canvas
    }
}