export function rgb( r: number, g: number, b: number ) {
    return new Color( r, g, b )
}

export function rgba( r: number, g: number, b: number, a: number = 1 ) {
    return new Color( r, g, b, a )
}

export default class Color {
    r: number
    g: number
    b: number
    a: number

    constructor( r: number, g: number, b: number, a: number = 1 ) {
        this.r = r
        this.g = g
        this.b = b
        this.a = a
    }

    static parse( str: string ) {
        if ( str[ 0 ] == "#" ) {
            // Parse Hex
            let parts = str.match( /[0-9a-f]{2,2}/ig )!.map( x => parseInt( x, 16 ) )
            return new Color( parts[ 0 ], parts[ 1 ], parts[ 2 ], ( parts[ 3 ] || 255 ) / 255 )
        }

        let type = str.match( /\w+/ )![ 0 ]
        let args = str.match( /\d+/g )!.map( x => parseFloat( x ) )

        switch ( type ) {
            case "rgb":
                return new Color( args[ 0 ], args[ 1 ], args[ 2 ] )
            case "rgba":
                return new Color( args[ 0 ], args[ 1 ], args[ 2 ], args[ 3 ] )
        }
    }

    toString() {
        return `rgba(${this.r},${this.g},${this.b},${this.a})`
    }

    static transparent = rgba( 0, 0, 0, 0 )
}