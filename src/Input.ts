import Vector, { vector } from "./math/Vector";
import Canvas from "./graphics/Canvas";

window.addEventListener( "mousemove", e => { Input.mouse = vector( e.x, e.y ) } )

window.addEventListener( "keydown", e => Input.buttons[ e.key ] = true )
window.addEventListener( "keyup", e => Input.buttons[ e.key ] = false )

window.addEventListener( "mousedown", e => Input.buttons[ "Mouse" + e.button ] = true )
window.addEventListener( "mouseup", e => Input.buttons[ "Mouse" + e.button ] = false )

export default class Input {
    static mouse = Vector.ZERO
    static buttons: { [ name: string ]: boolean } = {}
    static mouseScreenPosition( canvas: HTMLCanvasElement | Canvas ) {
        if ( canvas instanceof Canvas )
            canvas = canvas.canvas
        let b = canvas.getBoundingClientRect()
        return Input.mouse.addXY( -b.left, -b.top )
    }
}