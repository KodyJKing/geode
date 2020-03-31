import IBoundingBox from "./IBoundingBox"
import Vector2 from "../Vector2"
export default class BoundingBox implements IBoundingBox {
    dimensions: Vector2
    position: Vector2
    constructor( dimensions: Vector2, position = Vector2.ZERO ) {
        this.dimensions = dimensions
        this.position = position
    }

}