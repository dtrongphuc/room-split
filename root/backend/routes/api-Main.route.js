const express = require("express");
var Router = express.Router();

const mainController = require("../controllers/main.controller");
const mainValidate = require("../validate/main.validate");
const authMiddleware = require("../middleware/auth.middleware");

let initAPIs = (app) => {
	Router.use(authMiddleware.isAuth);
	Router.get("/get-all", mainController.getAll);
	Router.post(
		"/add/purchase",
		mainValidate.postPurchase,
		mainController.postPurchase
	);
	return app.use("/api", Router);
};

module.exports = initAPIs;
