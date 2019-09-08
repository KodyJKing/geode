export function frozen<T>( obj: T ) {
    return Object.freeze( obj ) as T
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