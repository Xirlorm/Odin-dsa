'use strict';

/*****************************************************
	* Square: Vertix type of a chess board square.		 *
  ****************************************************/
class Square {
	neighbor = [];

	constructor(x, y) {
		this.value = [x, y];
	}

	addNeighbor(square) {
		this.neighbor.push(square);
	}

	dfs(x, y) {
		const qeue = [this], record = new Map();

		while (qeue.length) {
			const square = qeue.shift();
			const coord = square.value;

			if (coord[0] == x && coord[1] == y) return square;

			for (let neighbor of square.neighbor) {
				if (!record.has(neighbor)) {
					qeue.push(neighbor);
				}
			}

			record.set(square, true);
		}

		return null;
	}
}

/******************************************************
	*  chessBoard: Creates a chess board representation *
	*							 of moves a knight makes.							*
  *****************************************************/
function chessBoard() {
	const root = new Square(1, 1), qeue = [root];
	const existingSquares = new Map();
	const moves = [
		[1, 2], [2, 1], [-1, 2], [2, -1],
		[1, -2], [-2, 1], [-1, -2], [-2, -1],
	];

	existingSquares.set('1,1', root);

	while (qeue.length) {
		const currentSquare = qeue.shift();
		const coord = currentSquare.value;

		for (let [x, y] of moves) {
			[x, y] = [ coord[0] + x, coord[1] + y ];

			if (x < 0 || x > 7 || y < 0 || y > 7) continue;

			let neighbor;

			if (existingSquares.has(`${x},${y}`)) {
				neighbor = existingSquares.get(`${x},${y}`);
			} else {
				neighbor = new Square(x, y);
				existingSquares.set(`${x},${y}`, neighbor);
				qeue.push(neighbor);
			}

			currentSquare.addNeighbor(neighbor);
		}
	}

	return root;
}

/******************************************************
	* knightMoves: Traverse the chess board looking for *
	*							 the shortest path between two squares*
  *****************************************************/
function knightMoves(start, target) {
	const qeue = [[ chessBoard().dfs(...start), [start] ]];

	if (qeue[0][0] == null) return;

	while (qeue.length) {
		const square = qeue.shift();
		const coord = square[1][square[1].length - 1];

		if (coord[0] == target[0] && coord[1] == target[1]) {
			return square[1];
		}

		square[0].neighbor.forEach(n => {
			qeue.push([n, [...square[1], n.value]])
		})
	}
}

// Tests
console.log(knightMoves([0, 0], [1, 2]))
console.log(knightMoves([0, 0], [3, 3]))
console.log(knightMoves([3, 3], [0, 0]))
