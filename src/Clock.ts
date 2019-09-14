export default class Clock {
    private pausedAt?
    private _time = 0
    private _dt = 0

    get time() { return this._time }
    get dt() { return this._dt }

    tick() {
        this._dt = ( this.pausedAt || performance.now() ) - this._time
        this._time += this.dt
    }

    pause() {
        this.pausedAt = this._time
    }

    unpause() {
        this.pausedAt = undefined
    }
}

export const GameClock = new Clock();
( window as any ).GameClock = GameClock