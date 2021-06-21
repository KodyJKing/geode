import test from "ava"
import Matrix3 from "../Matrix3"

test( "Matrix3 inversion", t => {

    function test( name: string, m: Matrix3 ) {
        console.log( name )
        let mInv = m.inverse()
        let mmInv = m.multiply( mInv )
        m.print()
        console.log()
        mInv.print()
        console.log()
        mmInv.print()
        console.log()
        t.assert( mmInv.equals( Matrix3.identity ) )
    }

    test( "translate and scale", Matrix3.translation( 10, 15 ).multiply( Matrix3.scale( 2, 2 ) ) )
    test( "translate and rotate", Matrix3.translation( 10, 15 ).multiply( Matrix3.rotation( Math.PI / 2 ) ) )
} )