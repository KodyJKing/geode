import test from "ava"
import Vector2, { vector } from "../../Vector2"
import Polygon from "../../geometry/Polygon"
import GJKRaycast from "../GJKRaycast"
import Ray from "../../geometry/Ray"

test( "GJKRaycast", assert => {
    let poly = Polygon.regular( 4, 100 )
    poly.position = vector( 100, 50 )
    let ray = new Ray( Vector2.ZERO, Vector2.RIGHT )
    let line = GJKRaycast( ( v ) => poly.support( v ), ray.heading )
    if ( !line ) return
    let time = line.rayCast( ray )
    let point = ray.pointAt( time )
    // console.log( { line, time, point } )
    assert.pass()
} )
