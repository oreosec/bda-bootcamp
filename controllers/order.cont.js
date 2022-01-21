const {Queue} = require("../models/Schema");

// queue system with linked list alghorytm
class Node {
	constructor(element, index=0, next=null) {
		this.element = element;
		this.next = next;
		this.index = index;

	}
}

class Queues {
	constructor() {
		this.head = null;
		this.tail = null;
		this.size = 0;
	}
	length() {
		return this.size;
	}

	// return true if empty
	isempty() {
		return this.size == 0;
	}

	// add some queue
	enqueue(element) {
		var newnode = new Node(element, this.size+1);
		if(this.tail == null) {
			this.head = newnode;
			this.tail = this.head;
		}else {
			this.tail.next = newnode;
			this.tail = this.tail.next;
		}

		++this.size
	}

	first() {
		if(this.isempty()) return null;
		else return this.head.element;
	}

	// out 
	dequeue() {
		var result;
		if(!this.isempty()) {
			var temp = this.head;
			result = temp.element;
			this.head = this.head.next;
			this.size--;
		}

		result = {
			value: result,
			index: temp.index
		}
		return result;
	}
}

let queue = new Queues();

module.exports = {

	// for order some menu
	newOrder: async (req, res) => {

		// validate request
		try {
			const { order, note } = req.body
		}catch(err) {
			res.send(500).json({message: "field not be empty."})
		}


		const data = req.body;
		data.table = req.query.table;
		data.que = queue.size+1
		
		queue.enqueue(data);
		const que = await Queue.create(data);

		res.status(200).json({message: "success ordering menu"});
	},

	deOrder: async (req, res) => {
		const dequ = queue.dequeue();
		const que = await Queue.deleteOne({"que": 1});
		res.status(200).json({message: dequ});
	}
}