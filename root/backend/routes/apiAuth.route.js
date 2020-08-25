const express = require("express");
const authController = require("../controllers/auth.controller");
//const authMiddleware = require("../middleware/auth.middleware");
const authValidation = require("../validate/auth.validate");
const Router = express.Router();

let initAPIs = (app) => {
	//Router.use(authMiddleware.isAuth);
	Router.post("/login", authValidation.postLogin, authController.login);
	Router.post(
		"/register",
		authValidation.postRegister,
		authController.register
	);
	Router.post("/join", authValidation.postJoinRoom, authController.joinRoom);
	Router.post(
		"/create",
		authValidation.postCreateRoom,
		authController.createRoom
	);
	return app.use("/api/auth", Router);
};

module.exports = initAPIs;
