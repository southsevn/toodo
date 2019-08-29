export default class Task  {
    constructor() {}

    static returnEl(idx, task) {
        this.idx = idx;
        this.text = task;
        this.$elem = document.createElement('div');
        this.$elem.classList = 'task';
        this.$elem.classList.add('mb-4');

        //Установка data-idx
        this.$elem.setAttribute('data-idx', this.idx);
        this.$elem.innerText = this.text;

        return this.$elem;
    }
}

