import IBoundingBox from "./math/geometry/IBoundingBox"
import Vector2, { vector } from "./math/Vector2"
import BoundingBox from "./math/geometry/BoundingBox"

export function frozen<T>( obj: T ) {
    return Object.freeze( obj ) as T
}

export function renameField( obj, name, newName ) {
    if ( obj.hasOwnProperty( name ) ) {
        obj[ newName ] = obj[ name ]
        delete obj[ name ]
    }
}

export function splitCamel( str: string ) {
    return str.match( /[A-Za-z_][a-z0-9_]+/g )
}

export function camelToDashes( str: string ) {
    return ( splitCamel( str ) || [] ).join( "-" ).toLowerCase()
}

export function memoize( func: ( any ) => any ) {
    let cache = {}
    return ( arg ) => {
        let cached = cache[ arg ]
        if ( cached !== undefined )
            return cached
        let value = func( arg )
        cache[ arg ] = value
        return value
    }
}

export function fitBox( inner: IBoundingBox, outer: IBoundingBox ) {
    let xRatio = outer.dimensions.x / inner.dimensions.x
    let yRatio = outer.dimensions.y / inner.dimensions.y
    let minRatio = Math.min( xRatio, yRatio )
    let dimensions = inner.dimensions.multiply( minRatio )
    let room = outer.dimensions.subtract( dimensions )
    let offset = room.half()
    return new BoundingBox( dimensions, outer.position.add( offset ) )
}

export function argmax<T>( values: T[], func: ( arg: T ) => number ) {
    let best = func( values[ 0 ] )
    let bestIndex = 0
    for ( let i = 0; i < values.length; i++ ) {
        let score = func( values[ i ] )
        if ( score > best ) {
            best = score
            bestIndex = i
        }
    }
    return { best, bestIndex, bestArg: values[ bestIndex ] }
}

export interface IConstructor<T> {
    new(): T
}