import GameObject from "./GameObject";

export default abstract class Component {
    parent: GameObject

    constructor( parent: GameObject ) {
        this.parent = parent
    }
}