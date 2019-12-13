import React, { Component } from 'react';
import MovieDataService from '../service/MovieDataService';
import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image'
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
                <h3 style={{ fontSize: 'xxx-large' }}>All Reviews for {this.state.movie.title}</h3>
                <Image style={{ marginLeft: '450px', maxWidth: '200px' }} src={this.state.movie.posterSource} />
                <div className="container">
                    { this.state.reviews.map(
                        review =>
                        <Card border="primary" key={review.id}>
                            <Card.Header><b>Author:</b> {review.author}</Card.Header>
                            <ListGroup >
                                <ListGroup.Item style={{ fontSize: 'x-large' }}> <b>Plot: ({review.plotRating}/10)</b></ListGroup.Item>
                                <ListGroup.Item><i>{review.plotDescription}</i></ListGroup.Item>
                                <ListGroup.Item style={{ fontSize: 'x-large' }}> <b>Characters: ({review.characterRating}/10)</b></ListGroup.Item>
                                <ListGroup.Item><i>{review.characterDescription}</i></ListGroup.Item>
                                <ListGroup.Item style={{ fontSize: 'x-large' }}> <b>Threat/Antagonist: ({review.threatRating}/10)</b></ListGroup.Item>
                                <ListGroup.Item><i>{review.threatDescription}</i></ListGroup.Item>
                                <ListGroup.Item style={{ fontSize: 'x-large' }}> <b>Aesthetic/Atmosphere: ({review.aestheticRating}/10)</b></ListGroup.Item>
                                <ListGroup.Item><i>{review.aestheticDescription}</i></ListGroup.Item>
                                <ListGroup.Item style={{ fontSize: 'x-large' }}> <b>Graphic Content: ({review.graphicContentRating}/10)</b></ListGroup.Item>
                                <ListGroup.Item><i>{review.graphicContentDescription}</i></ListGroup.Item>
                            </ListGroup>
                        </Card>
                    )}
                    
                </div>
                <br />
                <br />
            </div>
        )
    }
}

export default MoviePage


