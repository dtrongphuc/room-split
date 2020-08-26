const express = require("express");
var Router = express.Router();

const mainController = require("../controllers/main.controller");
const authMiddleware = require("../middleware/auth.middleware");

let initAPIs = (app) => {
	Router.use(authMiddleware.isAuth);
	Router.get("/get-all", mainController.getAll);
	return app.use("/api", Router);
};

module.exports = initAPIs;
