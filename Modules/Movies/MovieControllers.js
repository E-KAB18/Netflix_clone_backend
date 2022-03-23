const Movie = require("./MovieModel");


const getAll = async (req, res, next) => {
    try {
        const {type, genere, rate, year} = req.query
        let movieList=[];
        if(type === "movie"){
            if(genere){
                movieList = await Movie.find({isSeries:false, genere})
                res.send(movieList);

            }
            else{
                movieList = await Movie.find({isSeries:false})
                res.send(movieList);
            }

        }
        else{
            const movies = await Movie.find();
            res.send(movies);
        }
    }
    catch (error) {
        error.statusCode = 403;
        next(error);
    }
}
const getByID = async (req, res, next) => {
    try {
        const { id } = req.params;
        const movie = await Movie.findById(id);
        res.send(movie);
    }
    catch (error) {
        error.statusCode = 403;
        next(error);
    }
}

const addNew = async (req, res, next) => {
    try {
        
        if (req.userPayload.isAdmin) {
            const { title, desc, img, trailer, video, year, rate, limit, genere, isSeries } = req.body;

            const newMovie = new Movie({ title, desc, img, trailer, video, year, rate, limit, genere, isSeries });
            const createdMovie = await newMovie.save();
            res.send(createdMovie)
        } else {
            throw new Error(`You are not allowed to add Movies`);
        }


    } catch (error) {
        error.statusCode = 500;
        next(error);
    }
}

const updateOne = async (req, res, next) => {
    try {
        if (req.userPayload.isAdmin) {
        const { id } = req.params;
        const { title, desc, img, trailer, video, year, rate, limit, genere, isSeries } = req.body;
            const updatedMovies = await Movie.findByIdAndUpdate(
                id,
                { title, desc, img, trailer, video, year, rate, limit, genere, isSeries },
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
}

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


module.exports = { getAll, getByID, addNew, updateOne, deleteOne }

// {
// 	"title": "superman3"
// 	, "desc":"tesct desc"
// 	, "img":"lalalala"
// 	, "trailer": "lalalala"
// 	, "video":"lalalala"
// 	, "year":2021
// 	, "rate":6.9
// 	, "limit":16
// 	, "genere":"action"
	
// }