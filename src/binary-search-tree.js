const { NotImplementedError } = require('../extensions/index.js');
const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/

const findNode = (parentNode, valueToSearch) => {
  if (!parentNode) {
    return null;
  } else if (parentNode.data === valueToSearch) {
    return parentNode;
  } else if (parentNode.data > valueToSearch) {
    return findNode(parentNode.left, valueToSearch);
  } else {
    return findNode(parentNode.right, valueToSearch);
  }
};

const isLeaf = (node) => {
  return !node.left && !node.right;
};

const findMax = (node) => {
  return node.right ? findMax(node.right) : node.data;
};

const findMin = (node) => {
  return node.left ? findMin(node.left) : node.data;
};

class BinarySearchTree {
  rootNode = null;

  root() {
    return this.rootNode;
  }

  add(data) {
    const addNode = (treeNode, nodeToAdd) => {
      if (treeNode.data < nodeToAdd.data) {
        if (!treeNode.right) {
          treeNode.right = nodeToAdd;
        } else {
          addNode(treeNode.right, nodeToAdd);
        }
      } else {
        if (!treeNode.left) {
          treeNode.left = nodeToAdd;
        } else {
          addNode(treeNode.left, nodeToAdd);
        }
      }
    };

    const newNode = new Node(data);
    if (!this.rootNode) {
      this.rootNode = newNode;
    } else {
      addNode(this.rootNode, newNode);
    }
  }

  has(data) {
    const hasNode = (parentNode, valueToSearch) => {
      if (!parentNode) {
        return false;}
      else  if (parentNode.data === valueToSearch) {
          return true;
      } else if (parentNode.data > valueToSearch) {
        return hasNode(parentNode.left, valueToSearch);
      } else {
        return hasNode(parentNode.right, valueToSearch);
      }
    };

    return hasNode(this.rootNode, data);
  }

  find(data) {
    return findNode(this.rootNode, data);
  }

  remove(data) {    

    const removeLeaf = (parentNode, data) => {
      if (parentNode.left && parentNode.left.data === data) {
        parentNode.left = null;
      } else if (parentNode.right && parentNode.right.data === data) {
        parentNode.right = null;
      } else if (parentNode.data > data) {
        removeLeaf(parentNode.left, data);
      } else {
        removeLeaf(parentNode.right, data);
      }
    };

    const removeNotLeaf = (parentNode, data) => {
      if (parentNode.data === data) {
        if (parentNode.left) {
          const max = findMax(parentNode.left);
          parentNode.data = max;
          parentNode.left.data === max
            ? (parentNode.left = null)
            : removeItem(parentNode.left, max);
        } else if (parentNode.right) {
          const min = findMin(parentNode.right);
          parentNode.data = min;
          parentNode.right.data === min
            ? (parentNode.right = null)
            : removeItem(parentNode.right, min);
        }
      } else if (parentNode.data > data) {
        removeNotLeaf(parentNode.left, data);
      } else {
        removeNotLeaf(parentNode.right, data);
      }
    };

    const removeItem = (parentNode, data) => {
      const node = findNode(parentNode, data)
      if(isLeaf(node)){
        removeLeaf(parentNode, data);
      } else{
        removeNotLeaf(parentNode, data);
      }
    }

    removeItem(this.rootNode, data);
  }

  min() {
    return findMin(this.rootNode);
  }

  max() {
    return findMax(this.rootNode);
  }
}

module.exports = {
  BinarySearchTree
};