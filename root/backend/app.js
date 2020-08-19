require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
const port = process.env.PORT || 8080;

var authRoute = require("./routes/auth.route");

mongoose
	.connect(process.env.MONGO_URI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => console.log("connected to database"))
	.catch((error) => console.log("error occured", error));

app.use(
	cors({
		origin: `http://localhost:8081`,
	})
);

// parser application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parser application/json
app.use(bodyParser.json());

app.use("/api/auth", authRoute);
app.get("/", (req, res) => {
	res.send("Hello");
});

app.listen(port, () => {
	console.log(`App listening at http://localhost:${port}`);
});
