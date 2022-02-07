const {Menu} = require("../models/Schema");

module.exports = {
	// add menu on db
	addMenu: async (req, res) => {
		try{
			const create = await Menu.create({
				menu: req.body.menu,
				price: req.body.price,
				photo: req.body.photo,
				timeestimate: req.body.timeestimate,
				categories: req.body.categories
			});
			res.status(200).json({message: "menu has added."})
		}catch(err) {
			res.status(200).json({message: err})
		}
	},

	// edit menu content
	editMenu: async (req, res) => {
		try {
			const update = await Menu.findByIdAndUpdate(req.body.id, {
				menu: req.body.menu,
				price: req.body.price,
				photo: req.body.photo,
				timeestimate: req.body.timeestimate,
				categories: req.body.categories
			});
			res.status(200).json({message: "menu has edited."})
		}catch(err) {
			res.status(500).json({message: err})
		}
	},

	// delete some menu with spesific id from db
	deleteMenu: async (req, res) => {
		try{
			const del = await Menu.findByIdAndDelete(req.body.id);
			res.status(200).json({message: "menu has deleted."})
		}catch(err) {
			res.status(200).json({message: err})
		}
	},

	// geting all menu from database
	getAllMenu: (req, res) => {
		Menu.find({})
        .then((data) => res.status(200).json({ data }))
        .catch((err) => res.status(400).json({ message: err.message }));
	},

	// get some menu from database
	getMenu: (req, res) => {
		Menu.find({_id: req.params.menuId})
		.then((data) => res.status(200).json({ data }))
        .catch((err) => res.status(400).json({ message: err.message }));
	},

	// search function to find menu from db
	searchMenu: (req, res) => {
		Menu.find({menu: req.body.search})
		.then((data) => res.status(200).json({ data }))
        .catch((err) => res.status(400).json({ message: err.message }));
	},
}