import Task, {F} from "./task";
import ButtonGroup from "./buttonGroup";

export default class Toodo {
    constructor() {
        this.storage = sessionStorage;
        this.button = document.getElementById('btn');
        this.input = document.getElementById('task-input');
        this.taskList = document.getElementById('task-list');
        this.showTaskItem();
        this.initEvents();
    }

    getNextKey() {
        //storage возвращает длину хранилищая, что будет валидным новым индексом для добавления нового эл-та в хранилище
        return `task${this.storage.length}`;
    }

    showTaskItem() {
        for (let i = 0; i < this.storage.length; i++) {
            console.log(this.storage.getItem(this.storage.key(i)));
            let data = JSON.parse(this.storage.getItem(this.storage.key(i)));
            this.setTaskItemElem(data);
        }
    }

    addTaskItem(idx, task, status) {
        this.setTaskItemElem({
            idx,
            task,
            status
        });
        this.storage.setItem(this.getNextKey(), JSON.stringify({
            idx,
            task,
            status
        }));
    }

    setTaskItemElem(data) {
        let {
            idx,
            task,
            status
        } = data;

        let li = document.createElement('li');
        li.className = 'list-group-item';
        console.log(new Task());
        li.appendChild(Task.returnEl(idx, task));
        li.appendChild(ButtonGroup.returnEl());

        if (status === 'new') {
            li.style.background = '#fff';
        } else if (status === 'in progress') {
            li.style.background = '#ffc107';
        } else if (status === 'success') {
            li.style.background = '#28a745';
        }

        this.taskList.append(li);
    }

    initEvents() {
        this.button.addEventListener('click', () => {
            let val = this.input.value;
            if (!val) {
                return false;
            } else {
                this.addTaskItem(this.getNextKey(), val, 'new');
            }
        });
    }
}
