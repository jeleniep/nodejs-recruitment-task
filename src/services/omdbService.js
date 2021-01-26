import jwt from "jsonwebtoken"
import { User } from "../models"
import axios from "axios"

class MovieDataService {
  static getMovieData = (apiUrl, apiKey) => async (title) => {

    const API = axios.create({
      baseURL: apiUrl,
      params: {
        apikey: apiKey
      }
    });

    const movieDetails = await API.get("", {
      params: {
        t: title
      }
    })
    if (movieDetails.status === 200) {
      return movieDetails.data;
    } else {
      return undefined;
    }
  };
}
export default MovieDataService;

