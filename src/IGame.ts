import Canvas from "./graphics/Canvas";

export default interface IGame {
    update()
}

export function startGameLoop( game: IGame ) {
    window.onload = () => {
        Canvas.setup()
        function loop() {
            game.update()
            requestAnimationFrame( loop )
        }
        loop()
    }
}
