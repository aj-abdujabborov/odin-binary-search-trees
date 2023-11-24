/* eslint-disable no-param-reassign */
import mergeSort from "./mergeSort";
import getUniqueInSortedArray from "./getUniqueInSortedArray";
import Node from "./Node";

export default class Tree {
  constructor(array) {
    this.root = Tree.buildTree(array);
  }

  insert(value, root = this.root) {
    if (root === null) {
      return new Node(value);
    }

    if (value < root.data) {
      root.left = this.insert(value, root.left);
    } else if (value > root.data) {
      root.right = this.insert(value, root.right);
    }

    return root;
  }

  delete(inValue) {
    function d(value, root) {
      if (root === null) {
        return null;
      }

      if (value < root.data) {
        root.left = d(value, root.left);
        return root;
      }
      if (value > root.data) {
        root.right = d(value, root.right);
        return root;
      }

      if (root.left === null) return root.right;
      if (root.right === null) return root.left;

      // Both children exist, so return inorder successor of current root
      let inorderNodeParent = root;
      let inorderNode = root.right;
      while (inorderNode.left !== null) {
        inorderNodeParent = inorderNode;
        inorderNode = inorderNode.left;
      }

      if (inorderNode === root.right) {
        inorderNode.left = root.left;
        return root.right;
      }

      // Inorder node must be a left node after root.right
      inorderNodeParent.left = inorderNode.right;
      inorderNode.left = root.left;
      inorderNode.right = root.right;
      return inorderNode;
    }

    this.root = d(inValue, this.root);
  }

  find(value, root = this.root) {
    if (root === null) return null;
    if (value < root.data) return this.find(value, root.left);
    if (value > root.data) return this.find(value, root.right);
    return root;
  }

  levelOrder(inCallback) {
    function lo(callback, root) {
      const queue = [];
      queue.push(root);
      while (queue.length) {
        const node = queue.shift();
        if (node !== null) {
          callback(node);
          queue.push(node.left);
          queue.push(node.right);
        }
      }
    }

    if (inCallback === undefined) return Tree.returnInArray(lo, this.root);

    lo(inCallback, this.root);
    return undefined;
  }

  inOrder(inCallback) {
    function io(callback, root) {
      if (root === null) return;
      io(callback, root.left);
      callback(root);
      io(callback, root.right);
    }

    if (inCallback === undefined) return Tree.returnInArray(io, this.root);
    io(inCallback, this.root);
    return undefined;
  }

  preOrder(inCallback) {
    function po(callback, root) {
      if (root === null) return;
      callback(root);
      po(callback, root.left);
      po(callback, root.right);
    }

    if (inCallback === undefined) return Tree.returnInArray(po, this.root);
    po(inCallback, this.root);
    return undefined;
  }

  postOrder(inCallback) {
    function po(callback, root) {
      if (root === null) return;
      po(callback, root.left);
      po(callback, root.right);
      callback(root);
    }

    if (inCallback === undefined) return Tree.returnInArray(po, this.root);
    po(inCallback, this.root);
    return undefined;
  }

  height(root = this.root, h = 0) {
    if (root === null) return h - 1;
    return Math.max(
      Tree.height(root.left, h + 1),
      Tree.height(root.right, h + 1),
    );
  }

  depth(node, root = this.root, depth = 0) {
    if (root === null) return null;
    if (root === node) return depth;

    if (node.data < root.data) return this.depth(node, root.left, depth + 1);
    return this.depth(node, root.right, depth + 1);
  }

  isBalanced() {
    function h(root) {
      // every node will report its height to the parent, and parent will check if it is balanced
      if (root === null) return 0;

      const leftHeight = h(root.left);
      const rightHeight = h(root.right);
      if (leftHeight === false || rightHeight === false) return false;
      if (Math.abs(leftHeight - rightHeight) > 1) return false;
      return Math.max(leftHeight, rightHeight) + 1;
    }

    return !!h(this.root);
  }

  rebalance() {
    this.root = Tree.buildTree(this.inOrder());
  }

  static returnInArray(internalFunction, root) {
    const array = [];
    internalFunction((x) => array.push(x.data), root);
    return array;
  }

  static buildTree(array) {
    function bt(subarray) {
      if (!subarray.length) return null;

      const midInd = Math.floor(subarray.length / 2);

      const node = new Node(subarray[midInd]);
      node.left = bt(subarray.slice(0, midInd));
      node.right = bt(subarray.slice(midInd + 1, subarray.length));

      return node;
    }

    return bt(getUniqueInSortedArray(mergeSort(array)));
  }
}
