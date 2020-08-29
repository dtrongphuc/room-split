var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var purchaseSchema = new Schema(
	{
		user: Object,
		date: Date,
		productName: String,
		price: Number,
		quantity: Number,
		totalPrice: Number,
	},
	{ versionKey: false }
);

var Purchase = mongoose.model("Purchase", purchaseSchema, "purchase");

module.exports = Purchase;
