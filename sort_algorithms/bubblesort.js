'use strict';

export default function bubbleSort(list) {
	let sorted = false;

	while (!sorted) {
		sorted = true;
		for (let i = 0; i < list.length - 1; ++i) {
			if (list[i] > list[i + 1]) {
				[list[i], list[i + 1]] = [list[i + 1], list[i]];
				sorted = false;
			}
		}
	}

	return list;
}
