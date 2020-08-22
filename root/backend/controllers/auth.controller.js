const jwtHelper = require("../helpers/jwt.helper");
var randomize = require("randomatic");
var User = require("../models/user.model");
var Room = require("../models/room.model");
var Token = require("../models/token.model");
const debug = console.log.bind(console);

const accessTokenSecret =
	process.env.ACCESS_TOKEN_SECRET || "access-token-secret-@dtrongphuc";
const accessTokenLife = process.env.ACCESS_TOKEN_LIFE || "3days";

const refreshTokenSecret =
	process.env.REFRESH_TOKEN_SECRET || "refresh-token-secret-@dtrongphuc";
const refreshTokenLife = process.env.REFRESH_TOKEN_LIFE || "3650days";

let login = async (req, res) => {
	try {
		var accessToken;
		var refreshToken;

		User.findOne({
			username: req.body.username,
		})
			.populate("room")
			.then((data) => {
				accessToken = jwtHelper.generateToken(
					data,
					accessTokenSecret,
					accessTokenLife
				);

				refreshToken = jwtHelper.generateToken(
					data,
					refreshTokenSecret,
					refreshTokenLife
				);

				Promise.all([accessToken, refreshToken]).then(
					async (values) => {
						[accessToken, refreshToken] = values;
						let token = await Token.findOne({});
						let tokenList = (token && token["tokenList"]) || {};
						if (tokenList && Object.keys(tokenList).length == 0) {
							await Token.create({
								tokenList: {},
							});
						}

						tokenList[refreshToken] = {
							accessToken,
							refreshToken,
						};

						await Token.findOneAndUpdate(
							{},
							{ tokenList: tokenList },
							{ useFindAndModify: false }
						);

						res.cookie("accessToken", accessToken, {
							httpOnly: true,
							signed: true,
							maxAge: parseInt(process.env.COOKIE_LIFE),
						});

						res.cookie("refreshToken", refreshToken, {
							httpOnly: true,
							signed: true,
							maxAge: 864000000 * 365,
						});

						return res
							.status(200)
							.json({ accessToken, refreshToken });
					}
				);
			});
	} catch (error) {
		return res.status(500).json(error);
	}
	// let username = req.body.username;

	// const token = generateAccessToken({ username: username });

	// res.json(token);
	// User.findOne({ username: username })
	// 	.populate("room")
	// 	.exec((err, data) => {
	// 		if (data) {
	// 			res.send(data);
	// 		} else {
	// 			res.status(404).send({
	// 				message: err.message || "Not found",
	// 			});
	// 		}
	// 	});
};

let register = async (req, res) => {
	try {
		let username = req.body.username;
		let password = req.body.password;
		let realName = req.body.realname;
		await User.create({
			username: username,
			password: password,
			realname: realName,
		});
		return res.status(200).send({
			messeage: "Create user successful.",
		});
	} catch (error) {
		return res.status(403).send({
			messeage: error || "Error while create new user.",
		});
	}
};

let joinRoom = (req, res) => {
	try {
		let username = req.body.username;
		let roomCode = req.body.code;

		Room.findOne({ code: roomCode }).then(async (room) => {
			if (!room) {
				return res.status(403).send({
					messeage: "Room code is not exist.",
				});
			}
			await User.findOneAndUpdate(
				{ username: username },
				{ room: room._id },
				{ useFindAndModify: false }
			);

			return login(req, res);
		});
	} catch (error) {
		return res.status(500).json(error);
	}
};

let createRoom = async (req, res) => {
	try {
		let username = req.body.username;
		let roomName = req.body.roomname;
		let price = req.body.price;
		let memberCount = 1;
		let otherPrice = req.body.otherPrice;
		let roomCode;
		let room;
		do {
			roomCode = randomize("0", 10);
			room = await Room.findOne({ code: roomCode }).exec();
		} while (room);

		const newRoom = new Room({
			name: roomName,
			code: roomCode,
			price: price,
			memberCount: memberCount,
			otherPrice: otherPrice,
		});
		newRoom.save().then(() => {
			Room.findOne({ code: roomCode }).then((room) => {
				if (room) {
					User.findOneAndUpdate(
						{ username: username },
						{ room: room._id },
						{ useFindAndModify: false }
					).then(() => {
						return login(req, res);
					});
				}
			});
		});
	} catch (error) {
		return res.status(500).json(error);
	}
};

let refreshToken = async (req, res) => {
	const refreshTokenFromClient = req.body.refreshToken;
	const token = await Token.findOne({});
	const tokenList = (token && token["tokenList"]) || {};

	if (refreshTokenFromClient && tokenList[refreshTokenFromClient]) {
		try {
			var accessToken;
			jwtHelper
				.verifyToken(refreshTokenFromClient, refreshTokenSecret)
				.then(async (decoded) => {
					accessToken = await jwtHelper.generateToken(
						decoded.data,
						accessTokenSecret,
						accessTokenLife
					);
				});

			return res.status(200).json({ accessToken });
		} catch (error) {
			res.status(403).send({
				messeage: "Invalid refresh token.",
			});
		}
	} else {
		return res.status(500).json(error);
	}
};

module.exports = {
	login: login,
	register: register,
	joinRoom: joinRoom,
	createRoom: createRoom,
	refreshToken: refreshToken,
};
