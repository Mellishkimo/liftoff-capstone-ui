import React, { Component } from 'react';
import MovieDataService from '../service/MovieDataService';
import Card from 'react-bootstrap/Card';
import { Col, ListGroup, ListGroupItem, Row } from 'react-bootstrap';


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
        MovieDataService.retrieveMovie(REVIEW, this.state.id)
            .then(
                response => {
                    this.setState({ movie: response.data })
                }
            )
        this.refreshMovie();
    }

    refreshMovie() {
        MovieDataService.retrieveAllReviews(REVIEW, this.state.id)//HARDCODED
            .then(
                response => {
                    this.setState({ reviews: response.data })
                }
            )
    }


    render() {
        return (
            <div className="container">
                <h2>All Reviews for {this.state.movie.title}</h2>
                <Row>
                    <Col />
                    <Col>
                        <img src={this.state.movie.posterSource} alt={'Poster'} style={{ height: '268px', width: '182px' }} />
                    </Col>
                    <Col />
                </Row>
                <div className="container">
                    {this.state.reviews.map(
                        review =>
                        <Card border="primary" key={review.id}>
                            <Card.Header><b>Author:</b> {review.author}</Card.Header>
                            <ListGroup>
                                <Card.Header style={{ backgroundColor: 'white'}}> <b>Plot: ({review.plotRating})</b></Card.Header>
                                {review.plotDescription.length > 0 &&
                                <ListGroupItem><i>{review.plotDescription}</i></ListGroupItem>}
                                <ListGroupItem>
                                    <Row>
                                    <Col className='categoryCol'>
                                        Threat:
                                    </Col>
                                    <Col className='scoreCol'>
                                    ({review.threatRating})
                                    </Col>
                                    </Row>
                                </ListGroupItem>
                                {review.threatDescription.length > 0 &&
                                <ListGroupItem><i>{review.threatDescription}</i></ListGroupItem>}
                                <ListGroupItem > <b>Characters: ({review.characterRating})</b></ListGroupItem>
                                {review.characterDescription.length > 0 &&
                                <ListGroupItem><i>{review.characterDescription}</i></ListGroupItem>}
                                <ListGroupItem > <b>Aesthetic: ({review.aestheticRating})</b></ListGroupItem>
                                {review.aestheticDescription.length > 0 &&
                                <ListGroupItem><i>{review.aestheticDescription}</i></ListGroupItem>}
                                <ListGroupItem > <b>Graphic Content: ({review.graphicContentRating})</b></ListGroupItem>
                                {review.graphicContentDescription.length > 0 &&
                                <ListGroupItem><i>{review.graphicContentDescription}</i></ListGroupItem>}
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


