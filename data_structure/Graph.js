'use strict';

class Vertix {
	adjacentVertices = new Map();

	constructor(value) {
		this.value = value;
	}

	addAdjacentVertix(vertix, weight) {
		if (!this.adjacentVertices.has(vertix))
			this.adjacentVertices.set(vertix, weight);
	}

	depthFirstSearch(callback, visitedNodes = new Map()) {
		visitedNodes.set(this, true);

		callback(this.value);

		for (let node of this.adjacentVertices.keys())
			if (!visitedNodes.has(node))
				node.depthFirstSearch(callback, visitedNodes);
	}

	breadthFirstSearch(callback) {
		let qeue = [this], visitedNodes = new Map();

		while(qeue.length > 0) {
			const node = qeue.shift();

			if (!visitedNodes.has(node)) {
				callback(node.value);
				visitedNodes.set(node, true);
				qeue = qeue.concat(...node.adjacentVertices.keys());
			}
		}
	}
}
