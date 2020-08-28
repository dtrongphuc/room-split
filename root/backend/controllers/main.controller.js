const User = require("../models/user.model");
const Room = require("../models/room.model");
const Purchase = require("../models/purchase.model");

let getAll = async (req, res) => {
	const { data } = req.jwtDecoded;
	try {
		const user = await User.findById(data._id);
		const room = await Room.findById(data.room);

		res.status(200).json({
			user: user,
			room: room,
		});
	} catch (err) {
		res.status(404).json(err);
	}
};

let postPurchase = (req, res) => {
	const {
		userID,
		productName,
		productPrice,
		productQuantity,
		productDate,
	} = req.body;

	try {
		User.findById(userID).exec((err, user) => {
			if (err) {
				res.status(500).send({
					success: false,
					error: {
						message: err,
					},
				});
			}
			Purchase.create({
				user: user._id,
				date: productDate,
				productName: productName,
				price: productPrice,
				quantity: productQuantity,
			});
		});

		res.status(200).send({
			success: true,
		});
	} catch (err) {
		res.status(500).json(err);
	}
};

module.exports = {
	getAll: getAll,
	postPurchase: postPurchase,
};
