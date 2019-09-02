import Canvas from "./Canvas";
import IGame from "./IGame";

export default function gameLoop( game: IGame ) {
    window.onload = () => {
        Canvas.setup()
        function loop() {
            game.update()
            requestAnimationFrame( loop )
        }
        loop()
    }
}
