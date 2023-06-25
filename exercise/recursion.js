'use strict';

const fibs = (n) => {
	const sequence = [];

	let var1 = 0, var2 = 1;

	while (n--) {
		sequence.push(var1);
		let temp = var1 + var2;
		var1 = var2;
		var2 = temp;
		
	}

	return sequence;
}


const fibsRec = (n) => {
	if (n < 2) return [0];
	if (n < 3) return [0, 1];

	const sequence = fibsRec(--n);
	sequence.push(sequence[--n] + sequence[--n]);

	return sequence;
}
