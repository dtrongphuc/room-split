const User = require("../models/user.model");
const Room = require("../models/room.model");
const Purchase = require("../models/purchase.model");

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
				totalPrice: productPrice * productQuantity,
			});
		});

		res.status(200).send({
			success: true,
		});
	} catch (err) {
		res.status(500).json(err);
	}
};

let getHistory = async (userID, month, year) => {
	let data = await Purchase.aggregate([
		{
			$addFields: {
				month: { $month: "$date" },
				year: { $year: "$date" },
			},
		},
		{
			$match: {
				month: month,
				year: year,
				user: userID,
			},
		},
		{
			$project: {
				productName: 1,
				price: 1,
				quantity: 1,
				date: 1,
				totalPrice: 1,
				_id: 0,
			},
		},
	]);

	return data;
};

let getAll = async (req, res) => {
	try {
		const { data } = req.jwtDecoded;
		const { month, year } = req.query;
		let totalPricePurchase = 0;
		const currentUser = await User.findById(data._id);
		const users = await User.find({
			room: data.room,
			_id: { $ne: currentUser._id },
		});
		const room = await Room.findById(
			data.room,
			"name code price memberCount otherPrice -_id"
		).exec();

		let currentHistory = await getHistory(
			currentUser._id,
			parseInt(month),
			parseInt(year)
		);

		let priceOfCurrentUser = currentHistory.reduce(
			(total, item) => total + item.totalPrice,
			0
		);

		totalPricePurchase += priceOfCurrentUser;

		let currentUserData = {
			_id: currentUser._id,
			realname: currentUser.realname,
			purchase: currentHistory,
			priceOfMember: priceOfCurrentUser,
		};

		let membersData = await Promise.all(
			[...users].map(async (user) => {
				let history = await getHistory(
					user._id,
					parseInt(month),
					parseInt(year)
				);
				let priceOfMember = history.reduce(
					(total, item) => total + item.totalPrice,
					0
				);

				totalPricePurchase += priceOfMember;

				return {
					_id: user._id,
					realname: user.realname,
					purchase: history,
					priceOfMember: priceOfMember,
				};
			})
		);

		let priceSplit = Math.ceil(totalPricePurchase / room.memberCount);

		res.status(200).json({
			currentUser: currentUserData,
			membersData: [currentUserData].concat(membersData),
			room: {
				...room.toObject(),
				totalPrice: totalPricePurchase,
				priceSplit: priceSplit,
			},
		});
	} catch (err) {
		res.status(500).json(err);
	}
};

module.exports = {
	getAll: getAll,
	postPurchase: postPurchase,
	getHistory: getHistory,
};
