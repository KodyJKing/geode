import IBoundingBox from "../geometry/IBoundingBox"
import Vector2 from "../Vector2"
import IBody from "./IBody"
import GJKRaycast from "./GJKRaycast"
import Ray from "../geometry/Ray"

const left = ( b: IBoundingBox ) => b.position.x
const right = ( b: IBoundingBox ) => b.position.x + b.dimensions.x
const top = ( b: IBoundingBox ) => b.position.y
const bottom = ( b: IBoundingBox ) => b.position.y + b.dimensions.y

export function boxContains( b: IBoundingBox, p: Vector2 ) {
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

export function collisionInfo( a: IBody, b: IBody ) {
    let minkowskiDiffSupport = ( p: Vector2 ) => a.support( p ).subtract( b.support( p.negate() ) )
    let relativeVelocity = b.velocity.subtract( a.velocity )
    let ray = new Ray( Vector2.ZERO, relativeVelocity )

    let line = GJKRaycast( minkowskiDiffSupport, relativeVelocity )

    if ( line == null )
        return null
    let time = line.rayCast( ray )
    if ( time <= 0 )
        return null

    let normal = line.leftNormal.unit()

    let epsilon = 0.1
    let rotator = Vector2.polar( epsilon, 1 )
    let normalHigh = normal.complexProduct( rotator )
    let normalLow = normal.complexQuotient( rotator )

    let contact = {
        a: {
            high: a.support( normalLow ),
            low: a.support( normalHigh ),
        },
        b: {
            high: b.support( normalHigh.negate() ),
            low: b.support( normalLow.negate() ),
        }
    }
    
    let da = a.velocity.multiply(time)
    let db = b.velocity.multiply(time)

    let aHigh = a.support( normalLow ).add(da)
    let aLow = a.support( normalHigh ).add(da)
    let bHigh = b.support(normalHigh.negate() ).add(db)
    let bLow = b.support(normalLow.negate() ).add(db)
    let aHighRank = aHigh.cross(normal)
    let aLowRank = aLow.cross(normal)
    let bHighRank = bHigh.cross(normal)
    let bLowRank = bLow.cross(normal)

    let high = aHighRank < bHighRank ? aHigh : bHigh
    let low = aLowRank > bLowRank ? aLow : bLow

    return {
        time,
        normal,
        contact: [high, low],
    }

}