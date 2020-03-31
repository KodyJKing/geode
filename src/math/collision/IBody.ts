import Vector2 from "../Vector2"
import SupportFunction from "./SupportFunction";

export default interface IBody {
    readonly velocity: Vector2
    readonly support: SupportFunction
}