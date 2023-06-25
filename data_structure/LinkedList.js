'use strict';

/*********************************************
	* Linked list Node element.
	*********************************************/
class Node {
	nextNode = null;

	constructor(value = null) {
		this.value = value;
	}
}

/*********************************************
	* Linked list data structure type
	*********************************************/
class LinkedList {
	#head = null;
	#tail = null;
	#size = 0;

	// Add a value to the end of the list
	append(value) {
		if (this.#head !== null) {
			this.#tail.nextNode = new Node(value);
			this.#tail = this.#tail.nextNode;
		} else {
			this.#tail = new Node(value);
			this.#head = this.#tail;
		}
		this.#size++;
	}

	// Add a value at the beginning of the list
	prepend(value) {
		const newNode = new Node(value);
		newNode.nextNode = this.#head;
		this.#head = newNode;

		if (this.#tail === null) this.#tail = this.#head;

		this.#size++;
	}

	// Get the number of items in the list
	size() { return this.#size; }

	// Get reference to first item
	head() { return this.#head; }

	// Get reference to last item
	tail() { return this.#tail; }
	
	// Get a reference to the value at a specified index
	at(index) {
		let node = this.#head;

		while (index-- > 0 && node !== null) node = node.nextNode;

		return node;
	}

	// Remove the last item from the list
	pop() {
		if (this.#size === 1) {
			this.#head = null;
			this.#tail = null;
		} else {
			let node = this.#head;

			while (node.nextNode !== this.#tail) node = node.nextNode;

			this.#tail = node;
			this.#tail.nextNode = null;
		}
		this.#size--;
	}

	// Check if a value exists in the list
	contains(value) {
		let node = this.#head;

		while(node !== null) {
			if (node.value === value) return true;

			node = node.nextNode;
		}

		return false;
	}

	// Get the index value for a list item if it exists
	find(value) {
		let node = this.#head;

		while (node !== null || node.value !== value)
			node = node.nextNode;

		return null;
	}

	// Get a string represention of the list
	toString() {
		let node = this.#head, string = ``;

		while (node !== null) {
			string += `(${node.value}) -> `;
			node = node.nextNode;
		}

		string += `${null}`;

		return string;
	}

	// Insert a list item at a specified index
	insertAt(value, index) {
		if (index === 0) {
			this.prepend(value);
		} else if (index === this.#size - 1) {
			this.append(value)
		} else {
			const target = this.at(index - 1);

			if (target === null) return;

			const newNode = new Node(value);
			newNode.nextNode = target.nextNode;
			target.nextNode = newNode;
			this.#size++;
		}
	}

	// Remove a list item from a specified index
	removeAt(index) {
		if (index === this.#size - 1) {
			this.pop();
			return;
		} else if (index === 0) {
			this.#head = this.#head.nextNode;
			if (this.#size === 1) this.#tail = null;
		} else {
			let node = this.at(index - 1);

			if (node === null || node.nextNode === null) return;

			node.nextNode = node.nextNode.nextNode;
		}
		this.#size--;
	}
}
