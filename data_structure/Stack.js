'use strict';

export default class Stack{
	#stack = [];

	push(value) {
		this.#stack.push(value);
	}

	pop() {
		return this.empty() ? null : this.#stack.pop();
	}

	read() {
		return this.empty() ? null : this.#stack[this.#stack.length - 1];
	}

	size() {
		return this.#stack.length;
	}

	empty() {
		return this.#stack.length === 0;
	}
}
