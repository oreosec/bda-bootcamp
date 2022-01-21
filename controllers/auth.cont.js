const {Auth} = require("../models/Schema");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

module.exports = {
	register: async (req, res) => {
		if (req.body.password == null || req.body.username == null) req.status(500).json({message: "form must field."});

		// encrypt password
		salt = process.env.SALT || 10;
		const hashedPassword = await bcrypt.hash(req.body.password, salt);
		await Auth.create({
			username: req.body.username,
			password: hashedPassword
		});
		res.status(200).json({message: "register success.	"})
	},

	login: async (req, res) => {
		// grab token
		if (req.method == 'GET') return res.status(200).send(req.headers["x-access-token"]);

		const {username, password} = req.body;

		const currentUser = await Auth.findOne({username});

		if(!currentUser || currentUser === {}) {
			res.status(401).json({message: "Invalid credentials."});
		} else {
			const passwordIsValid = await bcrypt.compare(
				password,
				currentUser.password
			);

			if(!passwordIsValid)
				res.status(401).json({
					auth: false,
					token: null,
					message: "Invalid credentials."
				});
			else {
				const token = jwt.sign(
					{
						auth: true,
						id: currentUser.details,
						username: currentUser.username
					},
					process.env.SECRET || "secret"
				);
				req.headers["x-access-token"] = token;

				res.status(200).json({token});
			}
		}
	},

	logout: (req, res) => {
		res.status(401).json({
			auth: false,
			token: null,
		});
	},
};