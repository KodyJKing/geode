import { audioInstance } from "./audio"

const cache = {}
export function getAsset( path: string, fromPath: ( string ) => any ) {
    if ( cache[ path ] )
        return cache[ path ]
    let asset = fromPath( path )
    cache[ path ] = asset
    return asset
}

function assetPath( path: string, defaultExtension: string ) {
    if ( path.indexOf( "." ) == -1 )
        path = path + "." + defaultExtension
    return "/assets/" + path
}

export function getImage( path: string ) {
    return getAsset( assetPath( "images/" + path, "png" ), path => {
        let img = new Image()
        img.src = path
        return img
    } ) as HTMLImageElement
}

export function getAudio( path: string ) {
    return getAsset( assetPath( "audio/" + path, "mp3" ), path => new Audio( path ) ) as HTMLAudioElement
}

export function isFontLoaded( font: string ) {
    return ( document as any ).fonts.check( "0px " + font )
}