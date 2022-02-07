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

const OrderSchema = new Schema({
	order: { type: Schema.Types.ObjectId, ref: "Menu" },
	count: Number,
	note: String, // note from customer, if any
});

// schema for ordering some menu
const QueueSchema = new Schema({
	table: Number, // table's number
	order: [OrderSchema], // list from cart
});

const [Auth, Menu, Queue, Order] = [
	model("Auth", AuthSchema),
	model("Menu", MenuSchema),
	model("Queue", QueueSchema),
	model("Order", OrderSchema)
];

module.exports = {
	Auth,
	Menu,
	Queue,
	Order,
};
