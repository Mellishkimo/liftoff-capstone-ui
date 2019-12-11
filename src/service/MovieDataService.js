import axios from 'axios';

const MOVIE_API_URL = 'http://localhost:8080'

class MovieDataService {

    retrieveAllMovies(name) {
        return axios.get(`${MOVIE_API_URL}/movies`);
    }

    retrieveMovie(name, id) {
        return axios.get(`${MOVIE_API_URL}/movies/${id}`);
    }
    
    createMovie(movie) {
        return axios.post(`${MOVIE_API_URL}/movies/`, movie);
    }

    createReview(review, id) {
        return axios.post(`${MOVIE_API_URL}/movies/reviews/${id}`, review);
    }

    retrieveAllReviews(name, id) {
        return axios.get(`${MOVIE_API_URL}/movies/${id}/reviews/`);
    }

    retrieveAllAggregateScores(name) {
        return axios.get(`${MOVIE_API_URL}/movies/aggregates/`);
    }
}

export default new MovieDataService()