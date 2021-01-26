
import { Movie, User } from '../../../models'


const getMovies = async (req, res, next) => {
    try {
        if (req.userDetails.userId) {
            const user = await User.findOne({ id: req.userDetails.userId })
            const movies = await Movie.find({ owner: user }).select(
                {
                    title: 1,
                    fullTitle: 1,
                    released: 1, 
                    genre: 1, 
                    director: 1, 
                    _id: 1
                })
            res.json(movies);
        }
    } catch (error) {
        next(error);
    }
}

export default getMovies;