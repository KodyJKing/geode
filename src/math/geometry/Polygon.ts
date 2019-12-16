import Vector, { vector } from "../Vector"
import { argmax } from "../../util"
import GMath from "../GMath"

export default class Polygon {

    vertices: Vector[]
    position: Vector

    constructor(vertices: Vector[], position = Vector.ZERO) {
        this.vertices = vertices
        this.position = position
    }

    support(d: Vector) {
        return argmax(this.vertices, v => v.add(this.position).dot(d)).bestArg.add(this.position)
    }

    static regular(sides: number, radius: number) {
        let result = new Polygon([])
        for (let i = 0; i < sides; i++) {
            let angle = GMath.TAU * i / sides + Math.PI / sides
            result.vertices.push(
                Vector.polar(
                    angle,
                    radius
                )
            )
        }
        return result
    }

}