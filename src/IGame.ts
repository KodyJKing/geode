export default interface IGame {
    update()
}

type GameClass = { prototype: { constructor: () => IGame } }

interface GameConstructor {
    new(): IGame
}

export function startGameLoop( gameClass: GameConstructor ) {
    window.onload = () => {
        let game = new gameClass()
        function loop() {
            game.update()
            requestAnimationFrame( loop )
        }
        loop()
    }
}
