export default class Button {
    constructor(className = '', text = '') {
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
    }
}
