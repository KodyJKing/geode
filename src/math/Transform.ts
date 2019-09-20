import Vector, { vector } from "./Vector"
import Matrix from "./Matrix"

export default class Transform {
    position: Vector
    rotation: number
    scale: Vector
    center: Vector
    parent?: Transform

    constructor( position = new Vector( 0, 0 ), rotation = 0, scale = new Vector( 1, 1 ), center = new Vector( 0, 0 ), parent?: Transform ) {
        this.position = position
        this.rotation = rotation
        this.scale = scale
        this.center = center
        this.parent = parent
    }

    get localMatrix(): Matrix {
        return Matrix.translation( this.position.x, this.position.y )
            .multiplyMatrix( Matrix.rotation( this.rotation ) )
            .multiplyMatrix( Matrix.scale( this.scale.x, this.scale.y ) )
            .multiplyMatrix( Matrix.translation( - this.center.x, - this.center.y ) )
    }

    get localInverseMatrix(): Matrix {
        return Matrix.translation( this.center.x, this.center.y )
            .multiplyMatrix( Matrix.scale( 1 / this.scale.x, 1 / this.scale.y ) )
            .multiplyMatrix( Matrix.rotation( -this.rotation ) )
            .multiplyMatrix( Matrix.translation( - this.position.x, - this.position.y ) )
    }

    get matrix(): Matrix {
        let m = this.localMatrix
        return this.parent ?
            this.parent.matrix.multiplyMatrix( m ) :
            m
    }

    get inverseMatrix(): Matrix {
        let m = this.localInverseMatrix
        return this.parent ?
            m.multiplyMatrix( this.parent.inverseMatrix ) :
            m
    }

    transformVector( v: Vector ) { return this.matrix.multiplyVector( v ) }
    transformPoint( v: Vector ) { return this.matrix.multiplyPoint( v ) }
    inverseTransformVector( v: Vector ) { return this.inverseMatrix.multiplyVector( v ) }
    inverseTransformPoint( v: Vector ) { return this.inverseMatrix.multiplyPoint( v ) }

    vectorToWorld( v: Vector ) { return this.transformVector( v ) }
    pointToWorld( v: Vector ) { return this.transformPoint( v ) }
    vectorToLocal( v: Vector ) { return this.inverseTransformVector( v ) }
    pointToLocal( v: Vector ) { return this.inverseTransformPoint( v ) }

}