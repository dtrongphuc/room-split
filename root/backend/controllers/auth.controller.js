const jwtHelper = require("../helpers/jwt.helper");
var randomize = require("randomatic");
var User = require("../models/user.model");
var Room = require("../models/room.model");
var Token = require("../models/token.model");

const accessTokenSecret =
	process.env.ACCESS_TOKEN_SECRET || "access-token-secret-@dtrongphuc";
const accessTokenLife = process.env.ACCESS_TOKEN_LIFE || "3days";

const refreshTokenSecret =
	process.env.REFRESH_TOKEN_SECRET || "refresh-token-secret-@dtrongphuc";
const refreshTokenLife = process.env.REFRESH_TOKEN_LIFE || "3650days";

let logout = async (req, res) => {
	const TokenFromClient = req.headers["cookie"];
	const refreshTokenFormClient =
		TokenFromClient && TokenFromClient.split(/[\=\;]/)[1];

	if (refreshTokenFormClient) {
		await Token.findOneAndUpdate(
			{},
			{
				$pull: {
					tokenList: {
						$elemMatch: refreshToken,
					},
				},
			}
		);
	}

	res.clearCookie("accessToken");
	res.clearCookie("refreshToken");
	res.status(200).send({ success: true });
};

let login = async (req, res) => {
	try {
		var accessToken;
		var refreshToken;

		User.findOne({
			username: req.body.username,
		})
			.populate("room")
			.then((data) => {
				const decoded = {
					_id: data._id,
					realname: data.realname,
					room: data.room._id,
				};
				accessToken = jwtHelper.generateToken(
					decoded,
					accessTokenSecret,
					accessTokenLife
				);

				refreshToken = jwtHelper.generateToken(
					decoded,
					refreshTokenSecret,
					refreshTokenLife
				);

				Promise.all([accessToken, refreshToken]).then(
					async (values) => {
						[accessToken, refreshToken] = values;
						let token = await Token.findOne({});
						let tokenList = {};
						if (!token) {
							await Token.create({
								tokenList: [],
							});
						}

						tokenList[refreshToken] = {
							accessToken,
							refreshToken,
						};

						await Token.findOneAndUpdate(
							{},
							{
								$push: {
									tokenList: {
										$each: [tokenList],
									},
								},
							},
							{ useFindAndModify: false }
						);

						res.cookie("refreshToken", refreshToken, {
							httpOnly: true,
							maxAge: 864000000 * 365,
						});

						res.cookie("accessToken", accessToken, {
							httpOnly: true,
							maxAge: parseInt(process.env.COOKIE_LIFE),
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
			success: true,
			user: username,
			error: {
				messeage: "Create user successful.",
			},
		});
	} catch (error) {
		return res.status(403).send({
			success: false,
			error: {
				messeage: error || "Error while create new user.",
			},
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

			await Room.findByIdAndUpdate(
				room._id,
				{
					$set: {
						memberCount: room.memberCount + 1,
					},
				},
				{
					useFindAndModify: false,
				}
			);

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
		let roomName = req.body.roomName;
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
	const TokenFromClient = req.headers["cookie"];
	const refreshTokenFormClient =
		TokenFromClient && TokenFromClient.split(/[\=\;]/)[1];
	const token = await Token.findOne({});
	const tokenList = (token && token["tokenList"]) || {};

	if (refreshTokenFormClient && tokenList[refreshTokenFormClient]) {
		try {
			var accessToken;
			jwtHelper
				.verifyToken(refreshTokenFormClient, refreshTokenSecret)
				.then(async (decoded) => {
					accessToken = await jwtHelper.generateToken(
						decoded.data,
						accessTokenSecret,
						accessTokenLife
					);
					res.cookie("accessToken", accessToken, {
						httpOnly: true,
						maxAge: parseInt(process.env.COOKIE_LIFE),
					});

					return res.status(200).json({ accessToken });
				});

			console.log("renew access token");
		} catch (error) {
			res.status(403).send({
				messeage: "Invalid refresh token.",
			});
		}
	} else {
		return res.status(500).json(error);
	}
};

let isAuth = (req, res) => {
	res.status(200).send({ success: true });
};

module.exports = {
	login: login,
	logout: logout,
	register: register,
	joinRoom: joinRoom,
	createRoom: createRoom,
	refreshToken: refreshToken,
	isAuth: isAuth,
};
