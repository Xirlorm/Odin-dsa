'use strict';

function part(list, left, right) {
	const pivot = right--;
	const pivotValue = list[pivot];

	while (true) {
		while (list[left] < list[pivot]) {
			left++;
		}

		while (list[right] > list[pivot]) {
			right--;
		}

		if (left > right) {
			break;
		}

		let temp = list[left];
		list[left] = list[right];
		list[right] = temp;
	}

	let temp = list[left];
	list[left] = pivotValue;
	list[pivot] = temp;

	return left;
}

export default function qsort(list, left = 0, right = list.length - 1) {
	if ((right - left) < 1) return;

	const mid = part(list, left, right);
	qsort(list, left, mid - 1);
	qsort(list, mid + 1, right);
}
