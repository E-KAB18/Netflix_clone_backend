const express = require("express");
const movieRouter = express.Router();
const { verifyToken } = require("../Middelwares");
const { getAll, getByID, addNew, updateOne, deleteOne } = require('./MovieControllers')


//get 
movieRouter.get("/", verifyToken, getAll);
movieRouter.get("/:id", verifyToken, getByID);
//
movieRouter.post("/", verifyToken, addNew);
//update
movieRouter.patch("/:id", verifyToken, updateOne);
movieRouter.delete("/:id", verifyToken, deleteOne);

module.exports = movieRouter;