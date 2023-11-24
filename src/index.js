import Tree from "./BinarySearchTree";
import prettyPrint from "./PrettyPrint";

function getRandomNumbers(amount, min = 0, max = 100) {
  const numbers = new Array(amount);
  numbers.fill(0);
  return numbers.map(() => Math.ceil(Math.random() * (max - min) + min));
}
// not efficient, but quick to write

const tree = new Tree(getRandomNumbers(30, 0, 100));
console.log(`Tree balanced? ${tree.isBalanced()}`);
prettyPrint(tree.root);
console.log(tree.levelOrder());
console.log(tree.preOrder());
console.log(tree.inOrder());
console.log(tree.postOrder());

const randNums = getRandomNumbers(30, 101, 200);
randNums.forEach((x) => tree.insert(x));
prettyPrint(tree.root);

console.log(`Tree balanced? ${tree.isBalanced()}`);
console.log("Rebalancing tree...");
tree.rebalance();
console.log(`Tree balanced? ${tree.isBalanced()}`);

prettyPrint(tree.root);
console.log(tree.levelOrder());
console.log(tree.preOrder());
console.log(tree.inOrder());
console.log(tree.postOrder());
