import Vector from "./Vector";
import Matrix from "./Matrix";

export default class Transform {
    parent?: Transform
    position: Vector
    rotation: number
    scale: Vector
    center: Vector

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

    vectorToWorld( v: Vector ) { return this.matrix.multiplyVector( v ) }
    pointToWorld( v: Vector ) { return this.matrix.multiplyPoint( v ) }
    vectorToLocal( v: Vector ) { return this.inverseMatrix.multiplyVector( v ) }
    pointToLocal( v: Vector ) { return this.inverseMatrix.multiplyPoint( v ) }

}