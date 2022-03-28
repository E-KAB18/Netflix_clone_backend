const Movie = require("./MovieModel");

const getAll = async (req, res, next) => {
    try {
        const { type, genere, rate, year } = req.query;
        let movieList = [];
        let isSeries = type === "series" ? true : false;

        if (Object.keys(req.query).length) {

            if (type && genere) {
                movieList = await Movie.find({ isSeries: isSeries, genere });
                res.send(movieList);

            }
            else if (type && rate) {
                movieList = await Movie.find({ isSeries: isSeries }).sort({ rate: -1 }).limit(10);
                res.send(movieList);

            }
            else if (type && year) {
                movieList = await Movie.find({ isSeries: isSeries }).sort({ year: -1 }).limit(10);
                res.send(movieList);

            }
            else if (rate) {
                movieList = await Movie.find().sort({ rate: -1 }).limit(10);
                res.send(movieList);
            }
            else if (year) {
                movieList = await Movie.find().sort({ year: -1 }).limit(10);
                res.send(movieList);
            }

            else if (genere) {
                movieList = await Movie.find({ genere });
                res.send(movieList);
            } else if (type) {
                movieList = await Movie.find({ isSeries: isSeries });
                res.send(movieList);
            }
        }
        else {

            const movies = await Movie.find();
            res.send(movies);
        }

    } catch (error) {
        error.statusCode = 403;
        next(error);
    }

};

const getRandom = async (req, res, next) => {
    try {
        const { type } = req.query;
        if (type) {
            let isSeries = type === "series" ? true : false;
            const count = (await Movie.find({ isSeries: isSeries })).length;
            const random = Math.ceil(Math.random() * count);
            const movie = await Movie.findOne({ isSeries: isSeries }).skip(random);
            res.send(movie);
        } else {
            const count = (await Movie.find()).length;
            const random = Math.ceil(Math.random() * count);
            const movie = await Movie.findOne().skip(random);
            res.send(movie);
        }
    } catch (error) {
        error.statusCode = 403;
        next(error);
    }
};

const getByID = async (req, res, next) => {
    try {
        const { id } = req.params;
        const movie = await Movie.findById(id);
        res.send(movie);
    } catch (error) {
        error.statusCode = 403;
        next(error);
    }
};

const addNew = async (req, res, next) => {
    try {
        if (req.userPayload.isAdmin) {
            const {
                title,
                desc,
                img,
                trailer,
                video,
                year,
                rate,
                limit,
                genere,
                isSeries,
            } = req.body;

            // const data = req.body
            // const createdMovie = await Movie.insertMany(data);

            const newMovie = new Movie({
                title,
                desc,
                img,
                trailer,
                video,
                year,
                rate,
                limit,
                genere,
                isSeries,
            });
            const createdMovie = await newMovie.save();

            res.send(createdMovie);
        } else {
            throw new Error(`You are not allowed to add Movies`);
        }
    } catch (error) {
        error.statusCode = 500;
        next(error);
    }

};

const updateOne = async (req, res, next) => {
    try {
        if (req.userPayload.isAdmin) {
            const { id } = req.params;
            const {
                title,
                desc,
                img,
                trailer,
                video,
                year,
                rate,
                limit,
                genere,
                isSeries,
            } = req.body;
            const updatedMovies = await Movie.findByIdAndUpdate(
                id,
                {
                    title,
                    desc,
                    img,
                    trailer,
                    video,
                    year,
                    rate,
                    limit,
                    genere,
                    isSeries,
                },
                { new: true }
            );
            res.send(updatedMovies);
        } else {
            throw new Error(`You are not allowed to perform this operation!`);
        }
    } catch (error) {
        error.statusCode = 403;
        next(error);
    }
};

const deleteOne = async (req, res, next) => {
    try {
        if (req.userPayload.isAdmin) {
            const { id } = req.params;
            const deletedMovie = await Movie.findByIdAndDelete(id);
            res.send(`${deletedMovie.title} is deleted successfully`);
        } else {
            throw new Error(`You are not allowed to perform this operation!`);
        }
    } catch (error) {
        error.statusCode = 403;
        next(error);
    }
};

module.exports = { getAll, getByID, addNew, updateOne, deleteOne, getRandom };

