let storage = localStorage;

function Toodo () {
    this.button = document.getElementById('btn');
    this.input = document.getElementById('task-input');
    this.taskList = document.getElementById('task-list');
    this.showTaskItem();
    this.initEvents();
}

Toodo.prototype = {
    getNextKey: function () {
        //storage возвращает длину хранилищая, что будет валидным новым индексом для добавления нового эл-та в хранилище
        return `task${storage.length}`;
    },

    showTaskItem: function () {
        for (let i = 0; i < storage.length; i++) {
            let data = JSON.parse(storage.getItem(storage.key(i)));
            this.setTaskItemElem(data);
        }
    },
    addTaskItem: function (idx, task, status) {
        this.setTaskItemElem({
            idx,
            task,
            status
        });
        storage.setItem(this.getNextKey(), JSON.stringify({
            idx,
            task,
            status
        }));
    },
    setTaskItemElem: function (data) {
        let {
            idx,
            task,
            status
        } = data;

        let li = document.createElement('li');
        li.className = 'list-group-item';
        li.appendChild(new Task(idx, task));
        li.appendChild(new ButtonGroup());

        if(status === 'new') {
            li.style.background = '#fff';
        } else if (status === 'in progress') {
            li.style.background = '#ffc107';
        } else if (status === 'success') {
            li.style.background = '#28a745';
        }

        this.taskList.append(li);
    },
    initEvents: function() {
        this.button.addEventListener('click', () => {
            let val = this.input.value;
            if(!val) {
                return false;
            } else {
                this.addTaskItem(this.getNextKey() ,val, 'new');
            }
        });
    }
};

let toodo = new Toodo();

function Button(className = '', text = '') {
    this.className = className;
    this.text = text;

    //Создает новый DOM эл-т, в данном случае button
    //Но не добавляет !!!
    this.$elem = document.createElement('button');

    //Настройка эл-та : классы, текст
    this.$elem.classList = 'btn';
    this.$elem.classList.add(this.className);
    this.$elem.innerText = this.text;

    //Добавляю слушетель события click
    this.$elem.addEventListener('click', function (e) {
        e.stopPropagation();

        // Проверка:, если нажата кнопка Remove
        if(this.classList.contains('btn-danger')) {
            let parent = this.closest('.list-group-item');
            let idx = parseInt(parent.getElementsByClassName('task')[0].dataset.idx);

            //Удаляем сам DOM эл-т
            parent.remove();
            // И из хранилища, используя функцию, которая ищет элемент, подходящий индексу
            storage.removeItem(storage.key(idx));

            // Проверка: если нажата кнопка In progress
        } else if (this.classList.contains('btn-warning')) {
            let parent = this.closest('.list-group-item');
            let idx = parent.getElementsByClassName('task')[0].dataset.idx;
            let value = parent.getElementsByClassName('task')[0].innerHTML;

            // Меняем значение для итема из хранилища, уставнавливая статус 'in progress'


            storage.setItem(storage.key(idx), JSON.stringify({
                idx,
                task: value,
                status: 'in progress'
            }));


            parent.style.background = '#ffc107';
        } else if (this.classList.contains('btn-success')) {
            let parent = this.closest('.list-group-item');
            let value = parent.getElementsByClassName('task')[0].innerHTML;
            let idx = parent.getElementsByClassName('task')[0].dataset.idx;

            storage.setItem(storage.key(idx), JSON.stringify({
                idx,
                task: value,
                status: 'success'
            }));

            parent.style.background = '#28a745';
        }
    });

    return this.$elem;
}

function ButtonGroup() {
    this.$elem = document.createElement('div');
    this.$elem.classList.add('btn-group');
    this.$elem.setAttribute('role', 'group');
    this.$elem.setAttribute('aria-label', 'Basic example');
    this.$elem.appendChild(new Button('btn-success', 'Success'));
    this.$elem.appendChild(new Button('btn-warning', 'In progress'));
    this.$elem.appendChild(new Button('btn-danger', 'Remove'));

    return this.$elem;
}

function Task(idx, text = '') {
    // Для эл-тов задач, устанавливаем дата аттрибут idx, по которому будем делать сравнение, а не по содержимому
    // как это было ранее
    this.idx = idx;
    this.text = text;
    this.$elem = document.createElement('div');
    this.$elem.classList = 'task';
    this.$elem.classList.add('mb-4');

    //Установка data-idx
    this.$elem.setAttribute('data-idx', this.idx);
    this.$elem.innerText = this.text;

    return this.$elem;
}


