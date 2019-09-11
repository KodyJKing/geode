import { audioInstance } from "./audio";

const cache = {}
export function getAsset( path: string, fromPath: ( string ) => any ) {
    if ( cache[ path ] )
        return cache[ path ]
    let asset = fromPath( path )
    cache[ path ] = asset
    return asset
}

function assetPath( path: string, defaultExtension: string, defaultDir: string ) {
    if ( path.indexOf( "/" ) == -1 )
        path = defaultDir + "/" + path
    if ( path.indexOf( "." ) == -1 )
        path = path + "." + defaultExtension
    return "/assets/" + path
}

export function getImage( path: string ) {
    return getAsset( assetPath( path, "png", "images" ), path => {
        let img = new Image()
        img.src = path
        return img
    } ) as HTMLImageElement
}

export function getAudio( path: string ) {
    return getAsset( assetPath( path, "mp3", "audio" ), path => new Audio( path ) ) as HTMLAudioElement
}

export function getAudioInstance( path: string ) {
    return audioInstance( getAudio( path ) )
}