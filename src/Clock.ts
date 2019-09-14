const maxDt = 50
export default class Clock {
    private pausedAt?
    private _time = 0
    private _dt = 0

    get time() { return this._time }
    get dt() { return this._dt }

    tick() {
        let actualDt = ( this.pausedAt || performance.now() ) - this._time
        this._dt = Math.min( actualDt, maxDt )
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