import IBoundingBox from "../geometry/IBoundingBox"
import Vector from "../Vector"
import IBody from "./IBody"
import GJKRaycast from "./GJKRaycast"
import Ray from "../geometry/Ray"

const left = (b: IBoundingBox) => b.position.x
const right = (b: IBoundingBox) => b.position.x + b.dimensions.x
const top = (b: IBoundingBox) => b.position.y
const bottom = (b: IBoundingBox) => b.position.y + b.dimensions.y

export function boxContains(b: IBoundingBox, p: Vector) {
    let xContains = contains(left(b), right(b), p.x)
    let yContains = contains(top(b), bottom(b), p.y)
    return xContains && yContains
}

export function boxOverlaps(b0: IBoundingBox, b1: IBoundingBox) {
    let xOverlaps = overlaps(
        left(b0), right(b0),
        left(b1), right(b1)
    )
    let yOverlaps = overlaps(
        top(b0), bottom(b0),
        top(b1), bottom(b1)
    )
    return xOverlaps && yOverlaps
}

export function contains(a, b, x) {
    return x > Math.min(a, b) && x < Math.max(a, b)
}

export function overlaps(a0, a1, b0, b1) {
    return contains(a0, a1, b0) || contains(a0, a1, b1)
}

export function collisionInfo(a: IBody, b: IBody) {
    let minkowskiDiffSupport = (p: Vector) => a.support(p).subtract(b.support(p.negate))
    let relativeVelocity = b.velocity.subtract(a.velocity)
    let ray = new Ray(Vector.ZERO, relativeVelocity)

    let line = GJKRaycast(minkowskiDiffSupport, relativeVelocity)

    if (line == null)
        return null
    let time = line.rayCast(ray)
    if (time <= 0)
        return null

    let normal = line.leftNormal.unit

    let epsilon = 0.1
    let rotator = Vector.polar(epsilon, 1)
    let normalHigh = normal.complexProduct(rotator)
    let normalLow = normal.complexQuotient(rotator)

    return {
        time,
        normal,
        contact: {
            a: {
                high: a.support(normalHigh),
                low: a.support(normalLow),
            },
            b: {
                high: b.support(normalHigh.negate),
                low: b.support(normalLow.negate),
            }
        }
    }

}