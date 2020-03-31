import test from "ava"
import Matrix3 from "./Matrix3"

test( "Matrix3", t => {
    let m = Matrix3.translation( 10, 15 ).multiply( Matrix3.scale( 2, 2 ) )
    let mInv = m.inverse()
    let mmInv = m.multiply( mInv )
    m.print()
    console.log()
    mInv.print()
    console.log()
    mmInv.print()
    console.log()
    t.assert( mmInv.equals( Matrix3.identity ) )
} )