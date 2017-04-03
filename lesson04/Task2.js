/** @Task 2
 *
 * Пусть дан граф, причем каждому его ребру сопоставлен вес (взвешенный граф). Требуется найти
 * путь между двумя заданными вершинами с наименьшим весом.
 *
 * На вход будет подан массив ребер графа
 * [[0, 3, 5], [1, 3, 11], [2, 3, 56], [4, 3, 77], [5, 4, 89]]
 * Третий параметр  - вес ребра.
 * У структуры данных граф должна быть функция, принимающая два параметра
 * (nodeStart, nodeEnd). Данная функция должна вывести кратчайший путь из nodeStart в nodeEnd.
 *
 * @author Сергей Малаховский
 */

let graphArray = [[0, 3, 5], [1, 3, 11], [2, 3, 56], [4, 3, 77], [5, 4, 89], [4, 2, 10], [2, 1, 5], [5, 0, 100]];
/*
 * Правильные пути 4 --> 2 --> 1 --> 3 из 4 в 3
 * Правильные пути 5 --> 0 --> 3 из 5 в 3
 */


class Node {
    constructor(val) {
        this.id = val;
        this.links = [];
    }

    addLink(node, weight = 1) {
        this.links.push([node, weight]);
    }

    toString() {
        return "id: " + this.id + ", кол-во ребер: " + this.links.length;
    }

    print() {
        console.log(this.toString());
    }
}

class Graph {

    constructor(nodeList) {
        this.nodes = [];
        for (let node of nodeList) {
            this.add(node);
        }
    }

    add(items) {
        let node = this.addIfNotExistsAndGet(items[0]);
        let nodeLink = this.addIfNotExistsAndGet(items[1]);
        node.addLink(nodeLink, items[2]);
    }

    addIfNotExistsAndGet(id) {
        let node = this.nodes[id];
        if (node == undefined) {
            node = new Node(id);
            this.nodes[id] = node;
        }
        return node;
    }

    /**
     * Поиск пути на кратчашего расстояния на основе алгоритма Дейкстры
     * @param startNodeId id стартовой ноды.
     * @param endNodeId id финишной ноды.
     * @return {*} кратчайшее расстояние
     */
    path(startNodeId, endNodeId) {
        let startNode = this.nodes[startNodeId];

        const INF = 1000000;

        // Инициализация параметров
        let viewedVortex = [];

        let lengthToVortex = [];
        for (let nodeId in this.nodes) {
            if (nodeId == startNodeId) {
                lengthToVortex[nodeId] = 0;
            } else {
                lengthToVortex[nodeId] = INF;
            }
        }

        let selectedNode = startNode;
        // Поиск пути
        while (1) {
            viewedVortex.push(selectedNode);

            for (let edge of selectedNode.links) {
                let id = edge[0].id;
                let weight = edge[1] + lengthToVortex[selectedNode.id];

                if (lengthToVortex[id] > weight) {
                    lengthToVortex[id] = weight;
                }
            }

            selectedNode = this.getNextVortex(viewedVortex, lengthToVortex);
            if (~selectedNode) {
                selectedNode = this.nodes[selectedNode];
            } else {
                break
            }
        }
        return lengthToVortex[endNodeId];

    }

    //Выбор непосещенной ноды с наименьшим значением расстояния
    getNextVortex(viewedVortex, lengthToVortex) {
        let resVortexId = -1;
        let minLength = 1000001;
        for (let vortexId in lengthToVortex) {
            if (!(~viewedVortex.indexOf(this.nodes[vortexId]))) {
                if (lengthToVortex[vortexId] < minLength) {
                    minLength = lengthToVortex[vortexId];
                    resVortexId = vortexId;
                }
            }
        }
        return resVortexId;
    }

    /**
     * Построение пути c кратчайшим расстоянием мехжу нодами с помощью алгоритма Дейкстры.
     *
     * @param startNodeId id стартовой ноды.
     * @param endNodeId id финишной ноды.
     */
    buildPath(startNodeId, endNodeId) {
        const SPLITTER = " --> ";
        let selNode = this.nodes[startNodeId];
        let res = "" + startNodeId;

        // Построение пути
        while (1) {
            let viewedVortexes = [];
            for (let node of selNode.links) {
                let len = this.path(node[0].id, endNodeId);
                //Добавляем ноды в массив, индекс - расстояние.
                // Т.о. получаем массиве первым элементом - ноду с кратчайшем расстоянием.
                viewedVortexes[len + node[1]] = node[0].id;
            }
            // let nextNodeId = viewedVortexes.shift(); не работает. Возвращает undefinite
            //Получаем первый элемент массива - следующую ноду в пути.
            let nextNodeId = this.getFirstArrEl(viewedVortexes);
            res = res + SPLITTER + nextNodeId;

            if (nextNodeId == endNodeId) {
                break;
            }
            selNode = this.nodes[nextNodeId];
        }
        return res;
    }

    /**
     * Построение пути и вычисление кратчайшего расстояния мехжу нодами с помощью алгоритма Дейкстры.
     *
     * @param startNodeId id стартовой ноды.
     * @param endNodeId id финишной ноды.
     */
    searchPath(startNodeId, endNodeId) {
        console.log("Строим путь от вершины " + startNodeId + " до вершины " + endNodeId);

        console.log("Получившийся путь: " + this.buildPath(startNodeId, endNodeId));
        console.log("Длина пути: " + this.path(startNodeId, endNodeId));
    }


    getFirstArrEl(arr) {
        for (let i in arr) {
            return arr[i];
        }
    }

    printArrInLine(arr) {
        let str = "";
        for (let i in arr) {
            str = str + " " + i + " : " + arr[i];
        }
        console.log(str);
    }

    printAllNodes() {
        if (this.nodes.length == 0) return;
        for (let node of this.nodes) {
            node.print();
        }
    }

}


let graph = new Graph(graphArray);
console.log("Получившийся граф:");
graph.printAllNodes();
graph.searchPath(5, 3);
graph.searchPath(4, 3);