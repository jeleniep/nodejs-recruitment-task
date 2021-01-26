
import { Router } from 'express';
import {
    getMovies,
    addMovie
} from './endpoints';
import {
    checkAuthMiddleware
} from '../../middlewares'

class MoviesController {

    constructor(jwtSecret, apiUrl, apiKey) {
        this.router = Router();
        this.path = '/movies';
        this.initializeRoutes(jwtSecret, apiUrl, apiKey);

    }

    initializeRoutes(jwtSecret, apiUrl, apiKey) {
        const router = Router();
        router
            .get('/', checkAuthMiddleware(jwtSecret), getMovies)
            .post('/', checkAuthMiddleware(jwtSecret), addMovie(apiUrl, apiKey))


        this.router.use(
            this.path,
            router
        );
    }
}

export default MoviesController;
