import { getAudio } from "./assets";

type AudioOptions = { volume: number }

export function audioInstance( audio: HTMLAudioElement, options: AudioOptions = { volume: 1 } ): HTMLAudioElement {
    let node = audio.cloneNode() as HTMLAudioElement
    Object.assign( node, options )
    return node
}

export function playAudio( audio: HTMLAudioElement ) {
    audio.play().catch( e => { } )
}

export function playSound( path: string, options?: AudioOptions ) {
    playAudio( audioInstance( getAudio( path ), options ) )
}