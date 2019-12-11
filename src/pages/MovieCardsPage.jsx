import React, { Component } from 'react';
import MovieDataService from '../service/MovieDataService';
import Card from 'react-bootstrap/Card';
import { ListGroup } from 'react-bootstrap';


const REVIEW = 'lightning-fast-horror-reviews'



class MoviePage extends Component {

    constructor(props) {
        super(props)
        this.state = {
            id: this.props.match.params.id,
            movie: {},
            reviews: []
        }
        this.refreshMovie = this.refreshMovie.bind(this)
    }

    componentDidMount() {

        console.log(this.state.id)

        this.state.movie = MovieDataService.retrieveMovie(REVIEW, this.state.id)
            .then(
                response => {
                    console.log(response);
                    this.setState({ movie: response.data })
                }
            )
        
        this.refreshMovie();
    }

    refreshMovie() {
        

        MovieDataService.retrieveAllReviews(REVIEW, this.state.id)//HARDCODED
            .then(
                response => {
                    console.log(response);
                    this.setState({ reviews: response.data })
                }
            )
    }


    render() {
        return (
            <div className="container">
                <h3>All Reviews for {this.state.movie.title}</h3>
                <div className="container">
                    { this.state.reviews.map(
                        review =>
                        <Card border="primary" key={review.id}>
                            <ListGroup >
                                <ListGroup.Item> Author: {review.author}</ListGroup.Item>
                                <ListGroup.Item> Plot: ({review.plotRating}) Description: {review.plotDescription}</ListGroup.Item>
                                <ListGroup.Item> Characters: ({review.characterRating}) Description: {review.characterDescription}</ListGroup.Item>
                                <ListGroup.Item> Threat/Antagonist: ({review.threatRating}) Description: {review.threatDescription}</ListGroup.Item>
                                <ListGroup.Item> Aesthetic/Atmosphere: ({review.aestheticRating}) Description: {review.aestheticDescription}</ListGroup.Item>
                                <ListGroup.Item> Graphic Content: ({review.graphicContentRating}) Description: {review.graphicContentDescription}</ListGroup.Item>
                            </ListGroup>
                        </Card>
                    )}
                    
                </div>
            </div>
        )
    }
}

export default MoviePage


