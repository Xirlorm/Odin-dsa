'use strict';

const Tree = require('./BinaryTree')

/*******************************************
	* TESTS ASSIGNMENTS
	******************************************/
// Create a binary search tree from an array of random numbers < 100
const tree = new Tree(random(8));
prettyPrint(tree.root);

// Confirm that the tree is balanced by calling isBalanced
console.log('\nis balanced: ', tree.isBalanced());

// Print out all elements in level, pre, post, and in order
console.log('level-order: ', tree.levelOrder().join(', '))
console.log('pre-order: ', tree.preorder().join(', '));
console.log('post-order: ', tree.postorder().join(', '));
console.log('in-order: ', tree.inorder().join(', '));

// Unbalance the tree by adding several numbers > 100
random(7, 100, 900).forEach(n => tree.insert(n))
prettyPrint(tree.root);

// Confirm that the tree is unbalanced by calling isBalanced
console.log('is balanced: ', tree.isBalanced());

// Balance the tree by calling rebalance
tree.rebalance()
prettyPrint(tree.root);

// Confirm that the tree is balanced by calling isBalanced
console.log('is balanced: ', tree.isBalanced());

// Print out all elements in level, pre, post, and in order
console.log('level-order: ', tree.levelOrder().join(', '))
console.log('pre-order: ', tree.preorder().join(', '));
console.log('post-order: ', tree.postorder().join(', '));
console.log('in-order: ', tree.inorder().join(', '));



/*******************************************
	* Helper functions
	******************************************/
function prettyPrint(node, prefix = "", isLeft = true) {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};

// Generates a list of n random numbers from base to end
function random(n, base = 0, end = 100) {
	const list = [];

	while (n-- >= 0)
		list.push(Math.floor(Math.random() * end) + base);

	return list;
}
