const {Auth} = require("../models/Schema");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const jwksClient = require('jwks-rsa');

const priv = '-----BEGIN RSA PRIVATE KEY-----\nMIIEpAIBAAKCAQEAxVwY8XrYwD+WcKU3hnpY0Jdkds9iv52GSK4TaQFoQ9hhyVEU\nNrbhr4CpVjlFHY2KwQ/bnB0eoeYaGbdN17bEUoXOLNVPHFM7LQ62gfT1Ia7KX+4V\nkjS9Awtcm0dm7L9hFaHFNLOndtN4VkEcLduO75TGIlk09Crc8wwLyhMpCzmj5uOd\ngaLe2ZODMmtNsWRAkqW1YLxciFzkwBZQZygjir0NSc+P+rOwOMwEahbU3lC2dT3W\nO6u9r1Ilw3SNvtpija+U/UlO6s0G3AEwFT30LJdnmJEksTHGBQ2wMEX8OzAmg7Gz\nsIBULkWMiqFvW1FPLdp8xayYarDweJQDZYVhywIDAQABAoIBABbQhrGjmdrffuyW\nrMyG6C100tBJOQkdlKBiPywsVXlCUkuLa+LHUV+QaALnq+22pwuaYbCyTRA6IVpH\nrl/5aMiBX0wffH2xwW17/e0X/B5grlRYmXXFUvQ/I/1vS56ioP53LOzit8EswQR3\nkmJatzNK53yhA1YWfmQ6SEKb5Gq/ksMG3T5BHi0GWkR7YmbfvqgcNTlWgmlKj3qp\n5JQWpaWea4tEtdoV06kciE8ugs4R0Tzd4NbjXGJiidoMY/mvcm7Ln425cYEJj+44\naGmOnoFLSNJaVk6mYWzXpOLZAjPDSROI+mYj1gRR9PROnvHVZWKsogBl+DMCq46h\n/GIqNwECgYEA+s7d17mrDFuo0qQfr8AP/ThVujwvmcBCtQsI/a0DrSHFRV1c9zK9\nTeKZ/0FqOFnNr4a+F7LKYT9PpsbOClJbNP7nLJXE64vQLQVB/IbkJ6bDw63LZRvX\nPFp3xr3ltMrQ+bjEkt3IHF0ae20II5W3mjaEPG7Gd/Gnpi61NF53LhECgYEAyXH8\nkoQr2IB3jduwN2mNYrc1Twb1QDhj9a4/W/yIsgIbJ4/8sjuJyehvm1Xb2f9axY6Q\nCpse4piYYnKSk3AqbSThVW+X4LgXlKR0Xe5Zhsf/F2072+822h1wRyqKR4xM5kbv\n5ruH9ZTi2K0Fll3rGhDzJ0ygoe0uGmWG2bNNJhsCgYEAqDjaORhSbt6HtIjaq/Hh\nh5EihuBZeQGofG/jXuqN3bEZ9LVzZmZE7JmBeuCwUw2A1StGEvUbovBpB06u4eNt\nQ3V5LsFhrC9BuQCeyrbbDvFeur+1/aIX0mZHkijKimHCmsxgJLXWw5d67LAr1lpU\nJH5OYY5XVhnivab0aSS3QVECgYAVZX8PTOyfTV3lem0oJZT35D/MSg/op1SutrhS\nG+ulBKY/uIJ9p+dFw+N+20rDx+SrUS4pgjpwlQayhjrdYC+RcjZg7b5zBvqyNhmK\nFJP7xehpY5fVD36DAld3p6QSX2uXlfdLSaXyRsMlgpMyWn1rQluhU/lH2bpo4VnG\na84I+wKBgQDKy7HGzCp6CXbiEUOlitZhST8eq8Dwk+bh9HGMMvrPCMPWBibshwl4\nDFi8Mol0XoiLgrc8fCu7/8wz0ctD+5R63rHG6/vZLsZEW2JsoWP/b/wCdXu/jdXU\nNWpjmc9EgSTEbqhKSSHoXt/Q3HKi770ps7Ajd4O50yu99GLZZ4kVHA==\n-----END RSA PRIVATE KEY-----\n';

module.exports = {
	register: async (req, res) => {
		if (req.body.password == null || req.body.username == null) req.status(500).json({message: "form must field."});

		// encrypt password
		salt = process.env.SALT || 10;
		const hashedPassword = await bcrypt.hash(req.body.password, salt);
		const existed = await Auth.findOne({username: req.body.username});

		if(existed != null) {
			res.status(200).json({message: "user existed."})	
		}else{
			await Auth.create({
				username: req.body.username,
				password: hashedPassword
			});
			res.status(200).json({message: "register success."})
		}
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
				const DOMAIN = process.env.PORT || "http://localhost:3000";
				const jwk = `${DOMAIN}/.well_known/jwks.json`;
				const token = jwt.sign(
					{
						auth: true,
						id: currentUser._id,
						username: currentUser.username
					},
					priv,
					{ 
						algorithm: 'RS256',
						header: {
							"jku": jwk
						}
					}
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

	changePassword: async (req, res, next) => {
		const token = req.headers["x-access-token"];
        if (!token) res.status(403).json({ message: "no access token" });
        else {
			const DOMAIN = process.env.PORT || "http://localhost:3000";
			const jwk = `${DOMAIN}/.well_known/jwks.json`;
			const client = jwksClient({
				jwksUri: jwk
			});
			const kid = "b88f7144a68f7f2f9e0d9befb1c40cff";
			const key = await client.getSigningKey(kid);
			const signingKey = key.getPublicKey();
			var decoded = jwt.decode(token, {complete: true});

			if(decoded.header.jku != jwk) {
				res.status(500).json({
					message: "failed authenticate token.",
				});
			}else{
				jwt.verify(token, signingKey, (err, decoded) => {
					if (err)
						res.status(500).json({
							message: "failed authenticate token.",
						});
					if (decoded) {
						Auth.findOne({_id: decoded.id})						
						.then((result) => {
							// checking old password
							const passwordIsValid = bcrypt.compareSync(							
								req.body.oldPassword,
								result.password
							);
							if(!passwordIsValid){
								res.status(500).json({message: "password invalid."});
							}else{
								// change process
								const salt = process.env.SALT || 10;
								const hashedPassword = bcrypt.hashSync(req.body.newPassword, salt);
								Auth.findOneAndUpdate({username: decoded.username}, {				
									password: hashedPassword
								}, null, (err, docs) => {
									if(err) res.status(500).json({message: "error changing password."});
									if(docs) res.status(200).json({message: "password change successfull."});
								});
							}
						})
						.catch((err) => {
							res.status(500).json({message: err});
						})
														
							
					}
				});
			}
        }
	},

	isAdmin: async (req, res, next) => {
        const token = req.headers["x-access-token"];
        if (!token) res.status(403).json({ message: "no access token" });
        else {
			const DOMAIN = process.env.PORT || "http://localhost:3000";
			const jwk = `${DOMAIN}/.well_known/jwks.json`;
			const client = jwksClient({
				jwksUri: jwk
			});
			const kid = "b88f7144a68f7f2f9e0d9befb1c40cff";
			const key = await client.getSigningKey(kid);
			const signingKey = key.getPublicKey();
			var decoded = jwt.decode(token, {complete: true});

			if(decoded.header.jku != jwk) {
				res.status(500).json({
					message: "failed authenticate token.",
				});
			}else{
				jwt.verify(token, signingKey, (err, decoded) => {
					if (err)
						res.status(500).json({
							message: "failed authenticate token.",
						});
					if (decoded) {
						next();
					}
				});
			}
        }
    },
};