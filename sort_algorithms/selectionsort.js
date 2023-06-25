'use strict';

export default function selectionSort(list) {
	for (let i = 0; i < list.length; i++) {
		let lowest = i;

		for (let j = i + 1; j < list.length; j++)
			if (list[j] < list[lowest]) lowest = j;

		if (i !== lowest)
			[list[i], list[lowest]] = [list[lowest], list[i]];
	}

	return list;
}
