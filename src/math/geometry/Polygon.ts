import Vector2, { vector } from "../Vector2"
import { argmax } from "../../util"
import GMath from "../GMath"

export default class Polygon {

    vertices: Vector2[]
    position: Vector2

    constructor( vertices: Vector2[], position = Vector2.ZERO ) {
        this.vertices = vertices
        this.position = position
    }

    support( d: Vector2 ) {
        return argmax( this.vertices, v => v.add( this.position ).dot( d ) ).bestArg.add( this.position )
    }

    static regular( sides: number, radius: number ) {
        let result = new Polygon( [] )
        for ( let i = 0; i < sides; i++ ) {
            let angle = GMath.TAU * i / sides + Math.PI / sides
            result.vertices.push(
                Vector2.polar(
                    angle,
                    radius
                )
            )
        }
        return result
    }

}