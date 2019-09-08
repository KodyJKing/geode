import Vector from "./Vector";
import Matrix from "./Matrix";

export default class Transform {
    parent?: Transform
    translation = new Vector( 0, 0 )
    rotation = 0
    scale = new Vector( 1, 1 )

    get matrix() {
        let thisMatrix = Matrix.translation( this.translation.x, this.translation.y )
            .multiplyMatrix( Matrix.rotation( this.rotation ) )
            .multiplyMatrix( Matrix.scale( this.scale.x, this.scale.y ) )
        if ( this.parent )
            return this.parent.matrix.multiplyMatrix( thisMatrix )
        return thisMatrix
    }

    get inverseMatrix() {
        let thisMatrix = Matrix.scale( 1 / this.scale.x, 1 / this.scale.y )
            .multiplyMatrix( Matrix.rotation( -this.rotation ) )
            .multiplyMatrix( Matrix.translation( - this.translation.x, - this.translation.y ) )
        if ( this.parent )
            return thisMatrix.multiplyMatrix( this.parent.inverseMatrix )
        return thisMatrix
    }

}