import test from "ava"
import Vector2 from "../../Vector2"
import GJK from "../GJK"

test( "GJK", assert => {
    let support = ( v: Vector2 ) => v.unit().addXY( - 0.5, 0.5 )
    let simplices = []
    let collided = GJK( support, simplices )
    console.log( { collided, simplices } )
    assert.pass()
} )
