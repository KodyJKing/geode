import Vector from "../Vector"
import SupportFunction from "./SupportFunction";

export default interface IBody {
    readonly velocity: Vector
    readonly support: SupportFunction
}