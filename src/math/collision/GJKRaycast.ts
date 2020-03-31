import SupportFunction from "./SupportFunction"
import Vector2 from "../Vector2"
import Line from "../geometry/Line"

export default function GJKRaycast( support: SupportFunction, ray: Vector2, maxIterations = 100 ) {
    let a = support( ray.rightNormal() )
    let b = support( ray.leftNormal() )

    if ( a.dot( ray.rightNormal() ) < 0 )
        return null

    if ( b.dot( ray.leftNormal() ) < 0 )
        return null

    let i = 0
    while ( true ) {
        let ab = b.subtract( a )
        let ao = a.negate()
        let abNormal = ab.normalOnSide( ao )
        let c = support( abNormal )

        if ( ( ++i == maxIterations ) || c.equivalent( a ) || c.equivalent( b ) )
            return new Line( a, b )

        if ( c.dot( ray.rightNormal() ) > 0 )
            a = c
        else
            b = c
    }
}