import { IConstructor } from "./util"
import { GameClock } from "./Clock"

export default interface IGame {
    update()
}

export function startGameLoop( gameClass: IConstructor<IGame> ) {
    window.onload = () => {
        let game = new gameClass()
        function loop() {
            GameClock.tick()
            game.update()
            requestAnimationFrame( loop )
        }
        loop()
    }
}
