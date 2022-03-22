const mongoose = require("mongoose");
const { MovieSchema } = require("./MovieSchema");

const Movie = mongoose.model("Movies", MovieSchema, "movies");

module.exports = Movie;
