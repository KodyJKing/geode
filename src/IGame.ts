import { IConstructor } from "./util"

export default interface IGame {
    update()
}

export function startGameLoop( gameClass: IConstructor<IGame> ) {
    window.onload = () => {
        let game = new gameClass()
        function loop() {
            game.update()
            requestAnimationFrame( loop )
        }
        loop()
    }
}
