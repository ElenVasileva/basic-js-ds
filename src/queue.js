const { NotImplementedError } = require('../extensions/index.js');

// const { ListNode } = require('../extensions/list-node.js');

/**
 * Implement the Queue with a given interface via linked list (use ListNode extension above).
 *
 * @example
 * const queue = new Queue();
 *
 * queue.enqueue(1); // adds the element to the queue
 * queue.enqueue(3); // adds the element to the queue
 * queue.dequeue(); // returns the top element from queue and deletes it, returns 1
 * queue.getUnderlyingList() // returns { value: 3, next: null }
 */
class Queue {

  data = [];

  getUnderlyingList() {
    let next = null;
    for (let i = this.data.length - 1; i >= 0; i--) {
      next = {value: this.data[i], next};
    }
    return next;
  }

  enqueue(value) {
    this.data.push(value);
  }

  dequeue() {
    const el = this.data[0]
    this.data = this.data.slice(1)
    return el;
  }
}

module.exports = {
  Queue
};
