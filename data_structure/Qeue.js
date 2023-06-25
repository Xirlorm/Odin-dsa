'use strict';

export default class Qeue {
	#qeue = [];

	empty() {
		return this.#qeue.length === 0;
	}

	size () {
		return this.#qeue.length;
	}

	front() {
		return !this.empty() ? this.#qeue[0] : null;
	}

	enqeue(value) {
		this.#qeue.push(value);
	}

	deqeue() {
		return !this.empty() ? this.#qeue.shift() : null;
	}
}
