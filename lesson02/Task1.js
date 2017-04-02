/** @Task 1
 * Необходима создать динамическую струтуру данных Односвязный (кто хочет может сделать двухсвязаный) список.
 * Он должен поддерживать следующие операции:
 * - добавление нового узла в список
 * - поиск по элементам списка
 * - удаление элемента списка
 * Поле полезной нагрузки должно хранить число.
 * Так же необходимо создать функцию, которое будет принимать на вход число любой длинны и представлять его в виде списка.
 *
 * @Task 2
 * Необходимо создать функцию, которое будет принимать на вход число любой длинны и представлять его в виде списка.
 *
 * @Task 3
 *
 * Сложение двух чисел, заданных виде списка.
 *
 * @author Сергей Малаховский
 */


/* Task 1 */
/**
 * Односвязанный список
 * */
function SimpleList() {
    this.head = null;
    this.length = 0;

    /**
     * Добавление ноды в список. Если передать только значение без индекса, то нода вставляется в начало списка.
     *
     * @param index желаемый индекс
     * @param value значение ноды
     * @return индекс добавленной ноды
     */
    this.add = function (index, value) {
        /*
         Если передали только один аргумент,
         то считаем что передали значение ноды и добавляем ее в начало списка
         */
        if (arguments.length == 1) {
            this.add(0, arguments[0]);
            return 0;
        }

        if (this.length == 0) {
            // Создаем новый список
            this.addFirst(value);
            return 0;
        }

        let newNode = new Node(value);
        let result;
        if (index < 1) {
            //Добавляем в начало списка
            newNode.next = this.head;
            this.head = newNode;
            result = 0;
        } else if (index >= this.length) {
            //Добавляем в конец списка
            this.getTail().next = newNode;
            result = this.length;
        } else {
            //Добавляем по индексу
            let tempNode = this.get(index);
            newNode.next = tempNode.next;
            tempNode.next = newNode;
            result = index;
        }
        this.length++;
        return result;
    };

    /**
     * Добавление элемента в конец списка
     *
     * @param value значение ноды.
     */

    this.push = (value) => {
        this.add(this.length, value);
    }

    /**
     * Добавление первого элемента в пустой список
     *
     * @param value значение ноды.
     * @throws Error если список не пустой
     */
    this.addFirst = function (value) {
        if (this.length == 0) {
            this.head = new Node(value);
            this.length++;
        } else {
            throw new Error('Инициализация непустого списка');
        }
    };

    /**
     * Удаление ноды списка по индексу
     * @param index - индекс удаляемой ноды
     * @throws RangeError если индекс за границами списка
     */
    this.remove = function (index) {
        if (index < 0 || index >= this.length) throw new RangeError('Индекс лежит за пределами диапазона');

        if (index == 0) {
            this.head = this.head.next;
        } else {
            let tempNode = this.get(index - 1);
            tempNode.next = tempNode.next.next;
        }
        this.length--;
    };

    /**
     * Получить хвостовую ноду списка.
     *
     * @return хвостовая нода
     * */
    this.getTail = function () {
        return this.get(this.length - 1);
    };

    /**
     * Получить ноду по индексу.
     *
     * @param index - запрашиваемый индекс
     * @return запрашиваемая нода
     */
    this.get = function (index) {
        if (this.length - 1 < index || this.length == 0) return;
        let result = this.head;
        for (let i = 0; i < index; ++i) {
            result = result.next;
        }
        return result;
    };

    /**
     * Вывести в консоль все содержимое списка.
     */
    this.print = function () {
        console.log('Элементов в списке: ' + this.length);
        if (this.length == 0) return null;
        let tempNode = this.head;
        for (let i = 0; i < this.length; ++i) {
            tempNode.print();
            tempNode = tempNode.next;
        }
        console.log();
    };
};


/**
 * Описание ноды
 * */
function Node(value) {
    this.value = value;
    this.next = null;

    this.print = function () {
        console.log(this.value);
    };
};


let lst = new SimpleList();
console.log("Добавляем элементы в список:");
lst.add(1);
lst.add(0);
lst.add(1, 3);
lst.add(1, 'sss');
lst.add(18, 4);

lst.print();
console.log("Удаляем элементы из списока:");
lst.remove(4);
lst.remove(2);
lst.remove(0);
lst.print();


/*Task2*/

let num = '-12345678909876543210';

/**
 * Преобразование числа в список
 *
 * @param n - число для преобразованя в список.
 * @return {SimpleList} список, содержащий число.
 *
 * @throws {Error} если в функцию передали не число.
 */

function numToList(n) {
    if (isNaN(num / 10)) {
        //Если передани не число, то бросаем исключение.
        throw new Error('Переданный аргумент не число.');
    }
    let str = '' + n;
    let numList = new SimpleList();
    for (let i = str.length - 1; i >= 0; --i) {
        numList.add(str[i]);
    }
    return numList;

};
console.log('Преоразование числа в список');
let numList = numToList(num);
numList.print();

/**
 * Task 3
 */

function addTwoList(num1, num2) {
    // Проверка и подготовка данных
    if (num1 === null || num2 === null) {
        throw new Error("Пустой список")
    }
    let resultList = new SimpleList();
    resultList.push(0);

    //реализация сложения списков
    this.add = (node1, node2) => {
        let n1 = (node1 !== null) ? +node1.value : 0;
        let n2 = (node2 !== null) ? +node2.value : 0;
        let sum = n1 + n2;
        resultList.getTail().value = +resultList.getTail().value + (sum % 10);
        if (( this.hasNext(node1) || this.hasNext(node2))) {
            resultList.push((sum > 9) ? 1 : 0);
            this.add((this.hasNext(node1)) ? node1.next : null, (this.hasNext(node2)) ? node2.next : null);
        } else {
            if (sum > 9) resultList.push(1);
        }
        return resultList;
    };

    this.hasNext = (node) => {
        return (node !== null && node.next !== null);
    };

    return this.add(num1, num2);
}

let firstNum = 243;
let secondNum = 564;

addTwoList(numToList(firstNum).head, numToList(secondNum).head).print();