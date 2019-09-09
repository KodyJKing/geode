import Transform from "../math/Transform";
import GameObject from "./GameObject";
import Input from "../Input";
import Vector from "../math/Vector";
import Canvas from "../graphics/Canvas";
import IGame from "../IGame";

export default class Scene {
    globalTransform: Transform = new Transform()
    gameObjects: GameObject[] = []

    localPoint( point: Vector ) { return this.globalTransform.pointToLocal( point ) }
    localVector( vector: Vector ) { return this.globalTransform.vectorToLocal( vector ) }
    screnePoint( point: Vector ) { return this.globalTransform.pointToWorld( point ) }
    scremeVector( vector: Vector ) { return this.globalTransform.vectorToWorld( vector ) }

    get mousePosition() { return this.localPoint( Input.mouse ) }

    render() {
        Canvas.push()
        this.gameObjects.sort( ( a, b ) => a.layer - b.layer )
        Canvas.transform( this.globalTransform )
        for ( let gameObject of this.gameObjects ) {
            Canvas.push()
            Canvas.transform( gameObject.transform, this.globalTransform )
            gameObject.onRender()
            Canvas.pop()
        }
        Canvas.pop()
    }

    update() {
        for ( let gameObject of this.gameObjects )
            gameObject.onUpdate()
    }

    add( gameObject: GameObject ) {
        gameObject.scene = this
        if ( !gameObject.transform.parent )
            gameObject.transform.parent = this.globalTransform
        gameObject.sceneIndex = this.gameObjects.length
        this.gameObjects.push( gameObject )
    }

    remove( gameObject: GameObject ) {
        gameObject.scene = undefined
        if ( gameObject.transform.parent == this.globalTransform )
            gameObject.transform.parent = undefined
        let index = gameObject.sceneIndex
        let lastObj = this.gameObjects.pop()
        if ( lastObj && lastObj != gameObject ) {
            this.gameObjects[ index ] = lastObj
            lastObj.sceneIndex = index
        }
    }
}