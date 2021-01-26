import App from './app'
import MoviesController from './controllers/movies/moviesController'
import AuthController from './controllers/auth/authController'
import {JWT_SECRET, API_KEY, API_URL} from './config'
const app = new App([
  new MoviesController(JWT_SECRET, API_URL, API_KEY),
  new AuthController(JWT_SECRET)
]);

app.listen();
