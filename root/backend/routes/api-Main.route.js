const express = require("express");
var Router = express.Router();
const mainController = require("../controllers/main.controller");

let initAPIs = (app) => {
	Router.get("/get-all", mainController.getAll);
	return app.use("/api", Router);
};

module.exports = initAPIs;
