/** @Task 1
 *
 * Реализовать структуру данных граф и два способа обхода графа:
 * - в глубину (DFS)
 * - в ширину (BFS)
 * На вход будет подан массив ребер графа [[0, 3], [1, 3], [2, 3], [4, 3], [5, 4]]
 * В результате должна быть структура, принимающая массив ребер и имеющая две функции, при вызове которых
 * будет выполнять обход вершин. Посещаемые вершины должны выводиться на экран.
 *
 *  @author Сергей Малаховский
 */

let nodes = [];
nodes[1] = [[0, 3], [1, 3], [2, 3], [4, 3], [5, 4]];
nodes[2] = [[0, 1], [0, 4], [0, 5], [1, 3], [1, 4], [2, 1], [3, 2], [3, 4]];

class Node {
    constructor(val) {
        this.id = val;
        this.links = [];
    }

    addLink(node) {
        this.links.push(node);
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
        node.addLink(nodeLink);
        // node.print();
        // nodeLink.print();
    }

    addIfNotExistsAndGet(id) {
        let node = this.nodes[id];
        if (node == undefined) {
            node = new Node(id);
            this.nodes[id] = node;
        }
        return node;
    }

    startSearch(startNodeId, type) {
        let startNode = this.nodes[startNodeId];
        console.log("Начинаем с " + startNode.toString());

        switch (type) {
            case "BFS":
                console.log("Обход в ширину:")
                this.bfs(startNode);
                break;
            case "DFS" :
                console.log("Обход в глубину:")
                let cacheNodes = [];
                this.dfs(startNode, cacheNodes);
                break;
        }
    }

    /**
     * Обход в глубину.
     *
     * @param node - стартовая нода.
     * @param cacheNodes - кэш для хранения посещенных нод.
     */
    dfs(node, cacheNodes) {
        if (node !== null && !(~cacheNodes.indexOf(node))) {
            cacheNodes.push(node);
            node.print();
            for (let subNode of node.links) {
                this.dfs(subNode, cacheNodes);
            }
        }
    }

    /**
     * Обход в ширину.
     * @param node - стартовая нода.
     */
    bfs(node) {
        let cacheNodes = [];
        let nodesForSearch = [node];
        while (1) {
            let nextLevelNodes = [];
            for (let node of nodesForSearch) {
                if (node !== null && !(~cacheNodes.indexOf(node))) {
                    cacheNodes.push(node);
                    // console.log(cacheNodes);
                    node.print();
                    for (let subNode of node.links) {
                        nextLevelNodes.push(subNode);
                    }
                }
            }

            if (nextLevelNodes.length == 0) {
                break;
            }
            else {
                nodesForSearch = nextLevelNodes;
            }
        }
    }

    printAllNodes() {
        if (this.nodes.length == 0) return;
        for (let node of this.nodes) {
            node.print();
        }
    }

    // this.add(nodes);
}

let graph = new Graph(nodes[2]);
console.log("Получили граф:")
graph.printAllNodes();
graph.startSearch(0, "DFS");
graph.startSearch(0, "BFS");
