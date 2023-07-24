'use strict';

export default function insertionSort(list) {
	for (let i = 1; i < list.length; i++) {
		let gap = i, temp = list[gap];

		while (list[gap - 1] > temp && gap > 0)
			list[gap--] = list[gap]

		list[gap] = temp;
	}

	return list;
}
