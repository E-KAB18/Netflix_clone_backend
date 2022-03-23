const mongoose = require("mongoose");
const { Schema } = mongoose;
const MovieSchema = new Schema({
    title: {
        type: String,
        required: true, unique: true
    },
    desc: {
        type: String,
    },

    img: {
        type: String,
    },
    trailer: {
        type: String,
    },

    video: {
        type: String,
    },

    rate: {
        type: String,
    },

    year: {
        type: Date
    },
    limit: {
        type: Number
    },
    genere: {
        type: String,
        enum: ["Action",
            "Comedy",
            "Drama",
            "Fantasy",
            "Horror",
            "Mystery",
            "Romance",
            "Thriller"]
    },
    isSeries: {
        type: Boolean,
        default: false,
    },
});

module.exports = { MovieSchema };
