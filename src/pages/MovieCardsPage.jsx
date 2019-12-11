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
                            <Card.Header><b>Author:</b> {review.author}</Card.Header>
                            <ListGroup >
                                <ListGroup.Item style={{ fontSize: 'x-large' }}> <b>Plot Rating:</b> ({review.plotRating})</ListGroup.Item>
                                <ListGroup.Item><i>{review.plotDescription}</i></ListGroup.Item>
                                <ListGroup.Item style={{ fontSize: 'x-large' }}> <b>Character Rating:</b> ({review.characterRating})</ListGroup.Item>
                                <ListGroup.Item><i>{review.characterDescription}</i></ListGroup.Item>
                                <ListGroup.Item style={{ fontSize: 'x-large' }}> <b>Threat/Antagonist:</b> ({review.threatRating})</ListGroup.Item>
                                <ListGroup.Item><i>{review.threatDescription}</i></ListGroup.Item>
                                <ListGroup.Item style={{ fontSize: 'x-large' }}> <b>Aesthetic/Atmosphere:</b> ({review.aestheticRating})</ListGroup.Item>
                                <ListGroup.Item><i>{review.aestheticDescription}</i></ListGroup.Item>
                                <ListGroup.Item style={{ fontSize: 'x-large' }}> <b>Graphic Content:</b> ({review.graphicContentRating})</ListGroup.Item>
                                <ListGroup.Item><i>{review.graphicContentDescription}</i></ListGroup.Item>
                            </ListGroup>
                        </Card>
                    )}
                    
                </div>
            </div>
        )
    }
}

export default MoviePage


