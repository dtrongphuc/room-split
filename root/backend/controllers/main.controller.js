let getAll = (req, res) => {
	res.send({ message: "Trang chủ" });
};

module.exports = {
	getAll: getAll,
};
