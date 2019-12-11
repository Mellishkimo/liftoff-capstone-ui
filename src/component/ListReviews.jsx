import React, { Component } from 'react';
import MovieDataService from '../service/MovieDataService';
import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom';

const REVIEW = 'lightning-fast-horror-reviews'

class ListReviews extends Component {

    constructor(props) {
        super(props)
        this.state = {
            reviews: [],
            message: null
        }
        this.refreshReviews = this.refreshReviews.bind(this)
    }

    componentDidMount() {
        this.refreshReviews();
    }

    refreshReviews() {
        MovieDataService.retrieveAllMovies(REVIEW)//HARDCODED
            .then(
                response => {
                    console.log(response);
                    this.setState({ movies: response.data })
                }
            )
    }

    render() {
        return (
            <div className="container">
                <h3>All Movies</h3>
                <div className="container">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>Overall Rating</th>
                                <th>Plot</th>
                                <th>Characters</th>
                                <th>Threat/Antagonist</th>
                                <th>Atmosphere/Aesthetic</th>
                                <th>Graphic Content</th>
                                <th>Submit Review</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.movies.map(
                                    movie =>
                                    <tr key={movie.id}>
                                        <td>{movie.title}</td>
                                        <td>N/A</td>
                                        <td>N/A</td>
                                        <td>N/A</td>
                                        <td>N/A</td>
                                        <td>N/A</td>
                                        <td>N/A</td>
                                        <td>
                                            <Link to="/submit-review/">
                                                <Button>Review This!</Button>
                                            </Link>
                                        </td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

export default ListMovies