import Transform from "../math/Transform";
import GameObject from "./GameObject";
import Input from "../Input";
import Vector from "../math/Vector";
import Canvas from "../graphics/Canvas";

type layerCompareFunction = ( a: GameObject, b: GameObject ) => number
const defaultCompare = ( a: GameObject, b: GameObject ) => a.layer - b.layer

export default class Scene {
    cameraTransform: Transform = new Transform()
    objects: GameObject[] = []
    canvas: Canvas

    constructor( canvas: Canvas, cameraTransform: Transform, objects: GameObject[] = [] ) {
        this.canvas = canvas
        this.cameraTransform = cameraTransform
        for ( let obj of objects )
            this.add( obj )
    }

    screneToWorldPoint( point: Vector ) { return this.cameraTransform.transformPoint( point ) }
    screneToWorldVector( vector: Vector ) { return this.cameraTransform.transformVector( vector ) }
    worldToScrenePoint( point: Vector ) { return this.cameraTransform.inverseTransformPoint( point ) }
    worldToScreneVector( vector: Vector ) { return this.cameraTransform.inverseTransformVector( vector ) }

    get mousePosition() { return this.screneToWorldPoint( Input.mouseScreenPosition( this.canvas ) ) }

    render() {
        let { canvas } = this
        canvas.push()
        canvas.inverseTransform( this.cameraTransform )
        this.objects.sort( defaultCompare )
        for ( let obj of this.objects ) {
            canvas.push()
            canvas.transform( obj.transform )
            obj.onRender( canvas, this )
            canvas.pop()
        }
        canvas.pop()
    }

    update() {
        for ( let obj of this.objects )
            obj.onUpdate( this )
    }

    add( obj: GameObject ) {
        this.objects.push( obj )
        obj.onBuildScene( this )
    }
}