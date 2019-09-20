import GameObject from "./GameObject"

export default class Component {
    parent!: GameObject
    onRender() { }
    onUpdate() { }
}