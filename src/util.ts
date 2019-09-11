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

export interface IConstructor<T> {
    new(): T
}