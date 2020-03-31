import test from "ava"
import Line from "../geometry/Line"
import { vector } from "../Vector2"
import Ray from "../geometry/Ray"
import { connect } from "tls"

test( "RayTrace", assert => {
    let line = new Line(
        vector( 0, 0 ),
        vector( 100, 100 )
    )

    let ray = new Ray(
        vector( 0, 50 ),
        vector( 1, 0 )
    )

    let time = line.rayCast( ray )
    let point = ray.pointAt( time )

    assert.true( time == 50 )
    assert.true( point.equivalent( vector( 50, 50 ) ) )
} )
