import test from "ava"
import Vector from "../../math/Vector"
import GJK from "../GJK"

test( "GJK", assert => {
    let support = ( v: Vector ) => v.unit.addXY(- 0.5, 0.5)
    let simplices = []
    let collided = GJK( support, simplices )
    console.log( { collided, simplices } )
    assert.pass()
} )
