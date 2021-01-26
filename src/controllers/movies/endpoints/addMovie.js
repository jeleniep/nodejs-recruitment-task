
import { Movie, User } from '../../../models'
import { MovieDataService } from '../../../services'

const checkUserCredits = async (user) => {
    if (user.role === "premium") {
        return true
    }
    if (user.credits > 0) {
        return true
    }
    return false;
}

const addMovie = (apiUrl, apiKey) => async (req, res, next) => {
    if (!req.body) {
        return res.status(400).json({ error: "invalid payload" });
    }

    const { title } = req.body;

    if (!title || typeof title !== "string") {
        return res.status(400).json({ error: "invalid payload" });
    }


    try {
        if (req.userDetails.userId) {
            const user = await User.findOne({ id: req.userDetails.userId })
            if (user) {
                const getMovieData =  MovieDataService.getMovieData(apiUrl, apiKey)
                const movieDetails = await getMovieData(title);
                const movie = new Movie({ title, owner: user })
                if (movieDetails) {
                    movie.fullTitle= movieDetails.Title;
                    movie.released = movieDetails.Released;
                    movie.genre = movieDetails.Genre;
                    movie.director = movieDetails.Director;
                }
                const ifEnoughCredits = await checkUserCredits(user);
                if (!ifEnoughCredits) {
                    return res.status(403).json({ error: "You don't have enough credits to add new movie." });
                }
                await movie.save();
                user.credits--;
                await user.save()
                return res.status(200).json({ status: "Movie added successfully." });

            } else {
                return res.status(401).json({ error: "User not authorized" });
            }
        }
        return res.status(401).json({ error: "User not authorized" });
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
}

export default addMovie;