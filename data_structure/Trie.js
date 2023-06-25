'use strict';

class TrieNode {
	constructor () {
		this.children = new Map();
	}
}

class Trie {
	constructor() {
		this.root = new TrieNode();
	}

	search(word) {
		let currentLetter = this.root;

		for (let letter of word) {
			if (!currentLetter.children.has(letter)) {
				return null;
			}

			currentLetter = currentLetter.children.get(letter);
		}

		return currentLetter;
	}

	insert(word) {
		let currentLetter = this.root;

		for (let letter of word) {
			if (!currentLetter.children.has(letter)) {
				currentLetter.children.set(letter, new TrieNode());
			}
				
			currentLetter = currentLetter.children.get(letter);
		}
		currentLetter.children.set('*', null);
	}

	delete(word) {
		const hasWord = this.search(word);

		if (hasWord !== null) {
			const currentLetter = this.root;

			for (let letter of word) {
				if (currentLetter.children.size === 1) {
					currentLetter.children = null;
				}

				currentLetter = currentLetter.children.get(letter);
			}
		}
	}

	completion(node = this.root, word = '', words = []) {
		if (node === null) {
			node = this.root;
		}

		for (let [key, childNode] of node.children.entries()) {
			if (key === '*') {
				words.push(word);
			} else {
				this.completion(childNode, word + key, words);
			}
		}
		return words;
	}

	autocomplete(word) {
		const wordNode = this.search(word)

		if (wordNode !== null) {
			return this.completion(wordNode, word);
		}

		return null;
	}
}
