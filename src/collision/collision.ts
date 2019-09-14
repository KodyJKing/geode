import IBoundingBox from "./IBoundingBox";
import Vector from "../math/Vector";

const left = ( b: IBoundingBox ) => b.position.x
const right = ( b: IBoundingBox ) => b.position.x + b.dimensions.x
const top = ( b: IBoundingBox ) => b.position.y
const bottom = ( b: IBoundingBox ) => b.position.y + b.dimensions.y

export function boxContains( b: IBoundingBox, p: Vector ) {
    let xContains = contains( left( b ), right( b ), p.x )
    let yContains = contains( top( b ), bottom( b ), p.y )
    return xContains && yContains
}

export function boxOverlaps( b0: IBoundingBox, b1: IBoundingBox ) {
    let xOverlaps = overlaps(
        left( b0 ), right( b0 ),
        left( b1 ), right( b1 )
    )
    let yOverlaps = overlaps(
        top( b0 ), bottom( b0 ),
        top( b1 ), bottom( b1 )
    )
    return xOverlaps && yOverlaps
}

export function contains( a, b, x ) {
    return x > Math.min( a, b ) && x < Math.max( a, b )
}

export function overlaps( a0, a1, b0, b1 ) {
    return contains( a0, a1, b0 ) || contains( a0, a1, b1 )
}