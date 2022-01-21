const { Schema, model } = require("mongoose");

// login register in here
const AuthSchema = new Schema({
	username: String,
	password: String
});

// schema for saving all lists menu
const MenuSchema = new Schema({
	menu: String, // name
	photo: String, // path of photo
	timeestimate: String, 
	price: String, // format 100000 without "."
	categories: String, // drink, food etc
	empty: Boolean // if menu is sold out fill with true
});

// schema for ordering some menu
const QueueSchema = new Schema({
	que: Number, // number of queue
	table: Number, // table's number
	order: [MenuSchema], // list from cart
	note: String, // note from customer if existed
	total: Number //total pricing
});

const [Auth, Menu, Queue] = [
	model("Auth", AuthSchema),
	model("Menu", MenuSchema),
	model("Queue", QueueSchema)
];

module.exports = {
	Auth,
	Menu,
	Queue
};
