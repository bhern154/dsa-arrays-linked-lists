// STRUCTURE OF A NODE
// this.val -> REFERS TO THE VALUE OF THE NODE
// this.next -> REFERS TO THE END POINTER OF THE NODE

//STRUCTURE OF A LINKED LIST
// this.head -> REFERS TO THE HEAD (FIRST ITEM) OF THE LIST
// this.tail -> REFERS TO THE TAIL (LAST ITEM) OF THE LIST
// this.tail.next -> REFERS TO THE TAIL END POINTER OF THE LIST

/** Node: node for a singly linked list. */

class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

/** LinkedList: chained together nodes. */

class LinkedList {
  constructor(vals = []) {
    this.head = null;
    this.tail = null;
    this.length = 0;

    for (let val of vals) this.push(val);
  }

  /** push(val): add new value to end of list. */

  push(val) {

    let newNode = new Node(val);

    if (!this.head) { // check if the linked list is empty
      this.head = newNode; // assign the new node as the head because it is the only node
      this.tail = this.head; // assign the new node as the tail because it is the only node
    } else { // if the linked list is not empty
      this.tail.next = newNode; // the current tail pointer will point to the new node
      this.tail = newNode; // make the new node the new tail
    }

    this.length += 1; // track the length of the linked list
  }

  /** unshift(val): add new value to start of list. */

  unshift(val) {
    let newNode = new Node(val);

    if (this.head === null) { // if the list is empty
      this.head = newNode; // assign the new node as the new head
    } else { // if the list is not empty
      newNode.next = this.head; // make the new node point to the current head
      this.head = newNode; // assign the new node to be the head
    }

    if (this.length === 0) this.tail = this.head; // if the list WAS empty, make the head the tail as well

    this.length += 1; // track the length of the linked list
  }

  /** _get(idx): retrieve node at idx. */

  _get(idx) {
    let cur = this.head;
    let count = 0;

    while (cur !== null && count != idx) {
      count += 1;
      cur = cur.next;
    }

    return cur;
  }

  /** pop(): return & remove last item. */

  pop() {
    return this.removeAt(this.length - 1);
  }

  /** shift(): return & remove first item. */

  shift() {
    return this.removeAt(0);
  }

  /** getAt(idx): get val at idx. */

  getAt(idx) {
    // if the list is empty, return error
    if (idx >= this.length || idx < 0) {
      throw new Error("Invalid index.");
    }

    let cur = this.head;
    let count = 0;

    while (cur !== null && count != idx) {
      count += 1;
      cur = cur.next;
    }

    return cur.val;
  }

  /** setAt(idx, val): set val at idx to val */

  setAt(idx, val) {
    if (idx >= this.length || idx < 0) {
      throw new Error("Invalid index.");
    }

    let cur = this.head;
    let count = 0;

    while (cur !== null && count != idx) {
      count += 1;
      cur = cur.next;
    }

    cur.val = val;
  }

  /** insertAt(idx, val): add node w/val before idx. */

  insertAt(idx, val) {
    if (idx > this.length || idx < 0) {
      throw new Error("Invalid index.");
    }

    // if you want to insert in the begining, use unshift
    if (idx === 0) return this.unshift(val);

    // if you want to insert at the end, use push
    if (idx === this.length) return this.push(val);

    // get the one before it
    let prev = this._get(idx - 1);

    let newNode = new Node(val);
    newNode.next = prev.next;
    prev.next = newNode;

    this.length += 1;
  }

  /** removeAt(idx): return & remove item at idx, */

  removeAt(idx) {
    if (idx >= this.length || idx < 0) {
      throw new Error("Invalid index.");
    }

    // if the list only has one node
    if (idx === 0) {
      let val = this.head.val; // get the value of the head
      this.head = this.head.next; // make the next node the head
      this.length -= 1; // track the length of the linked list
      if (this.length < 2) this.tail = this.head; // if there is only one node left, make it the tail as well
      return val;
    }

    // get one node before the last node
    let prev = this._get(idx - 1); 
   
    // special case: remove tail
    if (idx === this.length - 1) {
      let val = prev.next.val;
      prev.next = null; // unlink the last node
      this.tail = prev; // make the second to last node, the tail
  
      this.length -= 1; // track the length of the linked list
  
      return val; // return the value of the last node that was popped
    }

    // normal case: remove in middle
    let val = prev.next.val;
    prev.next = prev.next.next;

    this.length -= 1;

    return val;
  }

  /** average(): return an average of all values in the list */

  average() {
    if (this.length === 0) return 0;

    let total = 0;
    let current = this.head;

    while (current) {
      total += current.val;
      current = current.next;
    }

    return total / this.length;
  
  }
}

module.exports = LinkedList;