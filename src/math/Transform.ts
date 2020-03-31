import Vector2, { vector } from "./Vector2"
import Matrix2 from "./Matrix2"

// Todo: replace deprecated Matrix2 with Matrix3
export default class Transform {
    position: Vector2
    rotation: number
    scale: Vector2
    center: Vector2
    parent?: Transform

    constructor( position = new Vector2( 0, 0 ), rotation = 0, scale = new Vector2( 1, 1 ), center = new Vector2( 0, 0 ), parent?: Transform ) {
        this.position = position
        this.rotation = rotation
        this.scale = scale
        this.center = center
        this.parent = parent
    }

    get localMatrix(): Matrix2 {
        return Matrix2.translation( this.position.x, this.position.y )
            .multiplyMatrix( Matrix2.rotation( this.rotation ) )
            .multiplyMatrix( Matrix2.scale( this.scale.x, this.scale.y ) )
            .multiplyMatrix( Matrix2.translation( - this.center.x, - this.center.y ) )
    }

    get localInverseMatrix(): Matrix2 {
        return Matrix2.translation( this.center.x, this.center.y )
            .multiplyMatrix( Matrix2.scale( 1 / this.scale.x, 1 / this.scale.y ) )
            .multiplyMatrix( Matrix2.rotation( -this.rotation ) )
            .multiplyMatrix( Matrix2.translation( - this.position.x, - this.position.y ) )
    }

    get matrix(): Matrix2 {
        let m = this.localMatrix
        return this.parent ?
            this.parent.matrix.multiplyMatrix( m ) :
            m
    }

    get inverseMatrix(): Matrix2 {
        let m = this.localInverseMatrix
        return this.parent ?
            m.multiplyMatrix( this.parent.inverseMatrix ) :
            m
    }

    transformVector( v: Vector2 ) { return this.matrix.multiplyVector( v ) }
    transformPoint( v: Vector2 ) { return this.matrix.multiplyPoint( v ) }
    inverseTransformVector( v: Vector2 ) { return this.inverseMatrix.multiplyVector( v ) }
    inverseTransformPoint( v: Vector2 ) { return this.inverseMatrix.multiplyPoint( v ) }

    vectorToWorld( v: Vector2 ) { return this.transformVector( v ) }
    pointToWorld( v: Vector2 ) { return this.transformPoint( v ) }
    vectorToLocal( v: Vector2 ) { return this.inverseTransformVector( v ) }
    pointToLocal( v: Vector2 ) { return this.inverseTransformPoint( v ) }

}