const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();

const userRouter = require("./Modules/Users/UserRoutes");

const port = 3000;
app.use(express.json());

app.use("/api/users", userRouter);

mongoose.connect("mongodb://localhost:27017/netflix", (err) => {
	if (err) process.exit(1);
	console.log("connected to database successfully");
});
app.listen(port, () => {
	console.log(`Server listening on port ${port}`);
});

app.use((err, req, res, next) => {
	res.send({
		status: err.statusCode,
		message: err.message,
		errors: err.errors || [],
	});
});
