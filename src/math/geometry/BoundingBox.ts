import IBoundingBox from "./IBoundingBox"
import Vector from "../Vector"
export default class BoundingBox implements IBoundingBox {
    dimensions: Vector
    position: Vector
    constructor( dimensions: Vector, position = Vector.ZERO ) {
        this.dimensions = dimensions
        this.position = position
    }

}