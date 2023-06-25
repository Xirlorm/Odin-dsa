'use strict';

function merge(left, right) {
	let i = 0, j = 0;
	const sortList = []

	while (i < left.length && j < right.length) {
		if (left[i] < right[j]) sortList.push(left[i++]);
		else sortList.push(right[j++]);
	}

	while (i < left.length) sortList.push(left[i++]);

	while (j < right.length) sortList.push(right[j++]);

	return sortList;
}

export default function merge_sort(array) {
	if (array.length < 2) return array;

	const mid = parseInt(array.length / 2);

	return merge(
		merge_sort(array.slice(0, mid)),
		merge_sort(array.slice(mid))
	);
}
