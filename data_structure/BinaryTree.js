'use strict';

/************************************************
	* Tree node type
	***********************************************/
class Node {
	constructor (value = null) {
		this.data = value;
		this.left = null;
		this.right = null;
	}
}

/************************************************
	* BINARY TREE
	***********************************************/
class Tree {
	constructor(list = []) { this.root = this.buildTree(this.#uniqueSort(list)); }

	// Sort and remove duplicates from given list
	#uniqueSort(list) { return [...new Set(list)].sort((a, b) => a - b); }

	// Build and return a binary tree from list
	buildTree(list = [], start = 0, end = list.length - 1) {
			let root = null;

			if (start <= end) {
				const mid = parseInt((start + end) / 2);
				root = new Node(list[mid]);

				if (mid > start) root.left = this.buildTree(list, start, mid - 1);

				if (mid < end) root.right = this.buildTree(list, mid + 1, end);
			}

			return root;
	}

	// Add new value to the tree
	insert(value, node = this.root) {
		if (this.root === null) this.root = new Node(value);

		if (node === null) return new Node(value);
		else if (value < node.data) node.left = this.insert(value, node.left);
		else if (value > node.data) node.right = this.insert(value, node.right);

		return node;
	}

	// Returns successor of a deleted node
	#getSuccessor(node) {
		while(node.left != null) node = node.left;

		return node;
	}

	// Remove and returns node from tree
	delete (value, node = this.root) {
		if (node === null) return node;

		if (value < node.data) node.left = this.delete(value, node.left);
		else if (value > node.data) node.right = this.delete(value, node.right);
		else if (value === node.data){
			if (node.right === null) node = node.left
			else if (node.left === null) node = node.right
			else {
				const successor = this.#getSuccessor(node.right);
				node = this.delete(successor.data, node);
				node.data = successor.data;
			}
		}

		this.root = node;
		return node;
	}

	// Search and returns value node, Null if not found
	find(value) {
		let node = this.root;

		while(true) {
			if (node === null || node.data === value) return node;

			node = (node.data < value) ? node.right : node.left;
		}
	}

	// Calls given function on each node in level order or return list of values
	levelOrder(callback, node = this.root) {
		let nodeValues = [], qeue = [node];

		if (node !== null) {
			while (qeue.length > 0) {
				node = qeue.shift();

				if (node !== null) {
					if (typeof(callback) === 'function') callback(node);
					else nodeValues.push(node.data)

					qeue.push(node.left);
					qeue.push(node.right);
				}
			}
		}

		return nodeValues;
	}

	// In preorder, passes nodes to callback function or returns array of values
	preorder(callback, node = this.root) {
		let nodeValues = [];

		if (node !== null) {
			if (typeof(callback) === 'function') callback(node);
			else nodeValues = [node.data];

			nodeValues = nodeValues.concat( this.preorder(callback, node.left) );
			nodeValues = nodeValues.concat( this.preorder(callback, node.right) );
		}

		return nodeValues;
	}

	// In order, passes nodes to callback function or returns array of values
	inorder(callback, node = this.root) {
		let nodeValues = [];

		if (node !== null) {
			nodeValues = nodeValues.concat( this.inorder(callback, node.left) );

			if (typeof(callback) === 'function') callback(node);
			else nodeValues.push(node.data);

			nodeValues = nodeValues.concat( this.inorder(callback, node.right) );
		}

		return nodeValues;
	}

	// In postorder, passes nodes to callback function or returns array of values
	postorder(callback, node = this.root) {
		let nodeValues = [];

		if (node !== null) {
			nodeValues = nodeValues.concat( this.postorder(callback, node.left) );
			nodeValues = nodeValues.concat( this.postorder(callback, node.right) );

			if (typeof(callback) === 'function') callback(node);
			else nodeValues.push(node.data);
		}

		return nodeValues;
	}

	// Returns the height of the tree
	height(node = this.root) {
		if (node === null) return 0;

		const left = (node.left === null) ? 0 : this.height(node.left) + 1;
		const right = (node.right === null) ? 0 : this.height(node.right) + 1;

		return left < right ? right : left;
	}

	// Get the depth of a given node from it's root
	depth(node, root = this.root) {
		if (root === null) return -1;
		else if (root === node) return 0;

		let left = this.depth(node, root.left);
		let right = this.depth(node, root.right);

		if (left >= 0) return ++left;
		else if (right >= 0) return ++right;

		return -1;
	}

	// Check if binary tree is balanced
	isBalanced(node = this.root) {
		if (node === null) return true;

		const leftHeight = this.height(node.left);
		const rightHeight = this.height(node.right);

		if (Math.abs(leftHeight - rightHeight) < 2) return true;

		this.isBalanced(node.left);
		this.isBalanced(node.right);

		return false;
	}

	// Balances tree if unbalanced
	rebalance() {
		if (!this.isBalanced())
			this.root = this.buildTree(this.#uniqueSort(this.inorder()));
	}
}
