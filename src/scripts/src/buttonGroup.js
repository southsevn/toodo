import Button from "./button";

export default class ButtonGroup {
    constructor() {
        this.$elem = document.createElement('div');
        this.$elem.classList.add('btn-group');
        this.$elem.setAttribute('role', 'group');
        this.$elem.setAttribute('aria-label', 'Basic example');
        // this.$elem.appendChild(new Button('btn-success', 'Success'));
        // this.$elem.appendChild(new Button('btn-warning', 'In progress'));
        // this.$elem.appendChild(new Button('btn-danger', 'Remove'));
        this.rand = Math.random();
    }
    returnEl() {
        return this.$elem;
    }
}
