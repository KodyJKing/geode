import Vector, { vector } from "../math/Vector";

import { boxContains, boxOverlaps } from "../math/collision/collision";
import Transform from "../math/Transform";
import Scene from "./Scene";
import Component from "./Component";
import Canvas from "../graphics/Canvas";

export default class GameObject {
    layer: number = 0

    transform: Transform = new Transform()

    width: number = 0
    height: number = 0

    // components: Set<Component> = new Set<Component>()

    get position() { return this.transform.position }
    set position( value: Vector ) { this.transform.position = value }

    get rotation() { return this.transform.rotation }
    set rotation( value: number ) { this.transform.rotation = value }

    get dimensions() { return vector( this.width, this.height ) }
    get center() { return this.position.add( this.dimensions.half ) }

    constructor( position: Vector = Vector.ZERO, width = 0, height = 0 ) {
        this.position = position
        this.width = width
        this.height = height
    }

    contains( p: Vector ) { return boxContains( this, p ) }
    overlaps( other: GameObject ) { return boxOverlaps( this, other ) }

    onRender( canvas: Canvas, scene: Scene ) { }
    onUpdate( scene: Scene ) { }

    onBuildScene( scene: Scene ) { }

    // addComponent( component: Component ) {
    //     component.parent = this
    //     this.components.add( component )
    //     return this
    // }

}