import { getAudio } from "./assets";

type AudioOptions = { volume?: number, playbackRate?: number }

export function audioInstance( audio: HTMLAudioElement, options: AudioOptions = {} ): HTMLAudioElement {
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