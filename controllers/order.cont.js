const { Queue, Order } = require("../models/Schema");

// queue system with linked list alghorytm
/*
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
*/
class Queues {
	constructor() {
		this.data = [];
		this.size = 0;
		this.front = 0;
	}
	isempty(){
		return this.size == 0;
	}
	first() {
		if (this.isempty()) return null;
		else return this.data[this.front];
	}
	enqueue(element) {
		this.data.push(element);
		this.size++
	}
	dequeue() {
		if (!this.isempty()) {
			var result = this.data[this.front];
			this.data.shift();
			this.size--;
			return result;
		}
	}
}
var queue = new Queues();

module.exports = {

	// for order some menu
	newOrder: async (req, res) => {
		/* Requests example
		{
			order: [
				{
					"order": "61f35bdd98f476da3bf8813d"
					"count": 2,
					"note": "gak pake micin"
				},
				{
					"order": "61f35bdd98f476da3bf88f4"
					"count": 1,
					"note": "gak pake micin"
				},
				{
					"order": "61f35bdd98f476da3bf88cvd"
					"count": 1,
					"note": "gak pake micin"
				}
			]
		}
		*/

		// validate request
		const orders = req.body.order;
		const table = req.query.table;

		if(table == undefined || orders == undefined) {
			res.status(500).json({message: "field not be empty."});
		}else {
			// queue.enqueue(table);
			const que = await Queue.create({
				table: table,
				order: orders
			});

			res.status(200).json({message: "success ordering menu"});
		}
	},

	deOrder: async (req, res) => {
		// const dequ = queue.dequeue();
		const orders = await Queue.find({}, null, {limit: 1});
		const order = orders[0];
		const delte = Queue.findByIdAndDelete(orders[0]._id, (err, docs) => {
			if (err){
				res.status(500).json({message: err});
			}
			else{
				res.status(200).json({message: docs});
			}
		});
	},

	getQueueNumber: async (req, res) => {
		const table = req.query.table;
		var urutan;
		await Queue.find({})
		.then((data) => {
			data.map((value, index) => {
				if(value.table == table) {
					urutan = index;
				}
			});
			res.status(200).json({message: urutan+1});
		})
		.catch((err) => {
			res.status(500).json({message: err});
		})
	},
}