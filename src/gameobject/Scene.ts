import Transform from "../math/Transform";
import GameObject from "./GameObject";
import Input from "../Input";
import Vector from "../math/Vector";
import Canvas from "../graphics/Canvas";

type layerCompareFunction = ( a: GameObject, b: GameObject ) => number
const defaultCompare = ( a: GameObject, b: GameObject ) => a.layer - b.layer

export default class Scene {
    globalTransform: Transform = new Transform()
    objects: GameObject[] = []

    constructor( objects: GameObject[] = [] ) {
        for ( let obj of objects )
            this.add( obj )
    }

    localPoint( point: Vector ) { return this.globalTransform.pointToLocal( point ) }
    localVector( vector: Vector ) { return this.globalTransform.vectorToLocal( vector ) }
    screnePoint( point: Vector ) { return this.globalTransform.pointToWorld( point ) }
    scremeVector( vector: Vector ) { return this.globalTransform.vectorToWorld( vector ) }

    get mousePosition() { return this.localPoint( Input.mouse ) }

    render( compare: layerCompareFunction = defaultCompare ) {
        Canvas.push()
        this.objects.sort( compare )
        Canvas.transform( this.globalTransform )
        for ( let obj of this.objects ) {
            Canvas.push()
            Canvas.transform( obj.transform, this.globalTransform )
            obj.onRender( this )
            Canvas.pop()
        }
        Canvas.pop()
    }

    update() {
        for ( let obj of this.objects )
            obj.onUpdate( this )
    }

    add( obj: GameObject ) {
        if ( !obj.transform.parent )
            obj.transform.parent = this.globalTransform
        this.objects.push( obj )
        obj.onBuildScene( this )
    }

    clear() {
        for ( let obj of this.objects )
            if ( obj.transform.parent == this.globalTransform )
                obj.transform.parent = undefined
    }
}