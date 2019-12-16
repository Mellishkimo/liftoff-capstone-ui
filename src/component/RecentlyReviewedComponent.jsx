import React, { Component } from 'react';
import MovieDataService from '../service/MovieDataService';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';

const REVIEW = 'lightning-fast-horror-reviews'


class RecentlyReviewed extends Component {

    constructor(props) {
        super(props)
        this.state = {
            movies: []
        }
        this.refreshMovies = this.refreshMovies.bind(this)
        
    }


    componentDidMount() {
        this.refreshMovies();        
    }

    refreshMovies() {
        MovieDataService.retrieveRecentlyReviewed(REVIEW)//HARDCODED
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
                <h3 style={{ fontSize: 'xxx-large' }}>Recently Reviewed Movies</h3>
                <div className="container">
                    <CardGroup>
                    { this.state.movies.map(
                        movie =>
                        <Card key={movie.id}>
                            <Card.Img style={{ maxHeight: '500px' }} variant="top" src={movie.posterSource} />
                            <Card.Footer>
                                <Link to={`/reviews-for/${movie.id}`} style={{ max: '80px' }}>
                                    <Button style={{ color: 'black' }} variant='link'><b>{movie.title}</b></Button>
                                </Link>
                            </Card.Footer>
                        </Card>
                    )}
                    </CardGroup>
                </div>
                <br />
                <br />
            </div>
        )
    }
}

export default RecentlyReviewed