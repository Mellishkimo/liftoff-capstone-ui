import React, { Component } from 'react';
import MovieDataService from '../service/MovieDataService';
import { Link } from 'react-router-dom';
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
        MovieDataService.retrieveRecentlyReviewed(REVIEW)
            .then(
                response => {
                    this.setState({ movies: response.data })
                }
            )
    }


    render() {
        return (
            <div className="container">
                <h3 style={{ borderBottom: '1px solid gray', textAlign: 'center' }}>Recently Reviewed Movies</h3>
                <div className="container" style={{ display: 'flex', justifyContent: 'center' }}>
                    <CardGroup>
                    { this.state.movies.map(
                        movie =>
                        <Card key={movie.id} style={{ display: 'flex', justifyContent: 'center', maxWidth: '183px' }}>
                            <Card.Img className='poster' src={movie.posterSource} />
                            <Card.Footer className='card-footer-btn'>
                                <Link to={`/reviews-for/${movie.id}`} style={{ color: '#ff6600', fontWeight: 'bold' }}>
                                    {movie.title}
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