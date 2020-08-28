const User = require("../models/user.model");
const Room = require("../models/room.model");

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

module.exports = {
	getAll: getAll,
};
