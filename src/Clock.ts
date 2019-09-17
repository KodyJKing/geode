const maxDt = 50
export default class Clock {
    private lastTick = performance.now()
    private paused = false
    private _time = 0
    private _dt = 0

    get time() { return this._time }
    get dt() { return this._dt }

    tick() {
        let now = performance.now()
        let actualDt = now - this.lastTick
        let dt = Math.min( actualDt, maxDt )
        this.lastTick = now

        if (this.paused)
            return

        this._dt = dt
        this._time += dt
    }

    pause() {
        this.paused = true
    }

    unpause() {
        this.paused = false
    }
}

export const GameClock = new Clock();
( window as any ).GameClock = GameClock