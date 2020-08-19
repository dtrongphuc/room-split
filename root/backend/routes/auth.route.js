const express = require("express");
const auth = require("../controllers/auth.controller");
const validate = require("../middleware/auth.middleware");
const Router = express.Router();

Router.post("/join", validate.resgisterValidator, auth.createUser);
Router.post("/login", validate.loginValidator, auth.login);

module.exports = Router;
