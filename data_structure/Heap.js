'use strict';

/**************************************************
	* Maximum heap data structure
	*************************************************/
export class MaxHeap {
	#data = [];

	constructor(list) {
		if (list instanceof Array) {
			for (let value of list) {
				this.insert(value);
			}
		}
	}

	rootNode() {
		return this.#data[0];
	}

	lastNode() {
		return this.#data[this.#data.length - 1];
	}

	leftChildIndex(index) {
		return (index * 2) + 1;
	}

	rightChildIndex(index) {
		return (index * 2) + 2;
	}

	parentIndex(index) {
		return Math.floor((index - 1) / 2);
	}

	insert(value) {
		this.#data.push(value);

		let newNode = this.#data.length - 1,
				parentNode = this.parentIndex(newNode);
			
		while (newNode > 0 && this.#data[newNode] > this.#data[parentNode]) {
			const temp = this.#data[parentNode];
			this.#data[parentNode] = this.#data[newNode];
			this.#data[newNode] = temp;
			newNode = parentNode;
			parentNode = this.parentIndex(newNode);
		}
	}

	#hasGreaterChild(index) {
		const target = this.#data[index],
					leftChild = this.#data[this.leftChildIndex(index)],
					rightChild = this.#data[this.rightChildIndex(index)];

		if (leftChild > target || rightChild > target) {
			return true;
		}

		return false;
	}

	#getGreaterChild(index) {
		const leftChild = this.#data[this.leftChildIndex(index)],
					rightChild = this.#data[this.rightChildIndex(index)];

		if (rightChild !== undefined && rightChild > leftChild) {
			return this.rightChildIndex(index);
		}

		return this.leftChildIndex(index);
	}

	delete() {
		this.#data.shift();

		let trickleNodeIndex = 0;

		while(this.#hasGreaterChild(trickleNodeIndex)) {
			let childIndex = this.#getGreaterChild(trickleNodeIndex);
			const temp = this.#data[trickleNodeIndex];
			this.#data[trickleNodeIndex] = this.#data[childIndex];
			this.#data[childIndex] = temp;
		}
	}
}

/**************************************************
	* Minimum heap data structure
	*************************************************/
export class MinHeap {
	#data = [];

	constructor(list) {
		if (list instanceof Array) {
			for (let value of list) {
				this.insert(value);
			}
		}
	}

	rootNode() {
		return this.#data[0];
	}

	lastNode() {
		return this.#data[this.#data.length - 1];
	}

	leftChildIndex(index) {
		return (index * 2) + 1;
	}

	rightChildIndex(index) {
		return (index * 2) + 2;
	}

	parentIndex(index) {
		return Math.floor((index - 1) / 2);
	}

	insert(value) {
		this.#data.push(value);

		let newNode = this.#data.length - 1,
				parentNode = this.parentIndex(newNode);
			
		while (newNode > 0 && this.#data[newNode] < this.#data[parentNode]) {
			const temp = this.#data[parentNode];
			this.#data[parentNode] = this.#data[newNode];
			this.#data[newNode] = temp;
			newNode = parentNode;
			parentNode = this.parentIndex(newNode);
		}
	}

	#hasLesserChild(index) {
		const target = this.#data[index],
					leftChild = this.#data[this.leftChildIndex(index)],
					rightChild = this.#data[this.rightChildIndex(index)];

		if (leftChild < target || rightChild < target) {
			return true;
		}

		return false;
	}

	#getLesserChild(index) {
		const leftChild = this.#data[this.leftChildIndex(index)],
					rightChild = this.#data[this.rightChildIndex(index)];

		if (rightChild !== undefined && rightChild < leftChild) {
			return this.rightChildIndex(index);
		}

		return this.leftChildIndex(index);
	}

	delete() {
		this.#data.shift();

		let trickleNodeIndex = 0;

		while(this.#hasLesserChild(trickleNodeIndex)) {
			let childIndex = this.#getLesserChild(trickleNodeIndex);
			const temp = this.#data[trickleNodeIndex];
			this.#data[trickleNodeIndex] = this.#data[childIndex];
			this.#data[childIndex] = temp;
		}
	}
}
