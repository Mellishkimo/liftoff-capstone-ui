import React, { Component } from 'react';
import Table from 'react-bootstrap/Table';
import MovieDataService from '../service/MovieDataService';
import { Link } from 'react-router-dom';
import { Button } from '@material-ui/core';

const REVIEW = 'lightning-fast-horror-reviews'
const sortAggs = {
    overallUp: {
        fn: (a, b) => a.overallAggregate - b.overallAggregate
    },
    overallDown: {
        fn: (a, b) => b.overallAggregate - a.overallAggregate
    },
    plotUp: {
        fn: (a, b) => a.plotAggregate - b.plotAggregate
    },
    plotDown: {
        fn: (a, b) => b.plotAggregate - a.plotAggregate
    },
    characterUp: {
        fn: (a, b) => a.characterAggregate - b.characterAggregate
    },
    characterDown: {
        fn: (a, b) => b.characterAggregate - a.characterAggregate
    },
    threatUp: {
        fn: (a, b) => a.threatAggregate - b.threatAggregate
    },
    threatDown: {
        fn: (a, b) => b.threatAggregate - a.threatAggregate
    },
    aestheticUp: {
        fn: (a, b) => a.aestheticAggregate - b.aestheticAggregate
    },
    aestheticDown: {
        fn: (a, b) => b.aestheticAggregate - a.aestheticAggregate
    },
    graphicContentUp: {
        fn: (a, b) => a.graphicContentAggregate - b.graphicContentAggregate
    },
    graphicContentDown: {
        fn: (a, b) => b.graphicContentAggregate - a.graphicContentAggregate
    },
    default: {
        fn: (a, b) => a
    }
}


class ListMovies extends Component {

    constructor(props) {
        super(props)
        this.state = {
            movies: [],
            currentSort: 'default'
        }
        this.refreshMovies = this.refreshMovies.bind(this)
        
    }

    onSortChangeOverall = () => {
        const { currentSort } = this.state;
        let nextSort;

        if (currentSort === 'overallDown') nextSort = 'overallUp';
        else if (currentSort === 'overallUp') nextSort = 'overallDown';
        else if (currentSort === 'default') nextSort = 'overallDown';
        else nextSort = 'overallDown';

        this.setState({
            currentSort: nextSort
        })
    }

    onSortChangePlot = () => {
        const { currentSort } = this.state;
        let nextSort;

        if (currentSort === 'plotDown') nextSort = 'plotUp';
        else if (currentSort === 'plotUp') nextSort = 'plotDown';
        else if (currentSort === 'default') nextSort = 'plotDown';
        else nextSort = 'plotDown';

        this.setState({
            currentSort: nextSort
        })
    }

    onSortChangeCharacter = () => {
        const { currentSort } = this.state;
        let nextSort;

        if (currentSort === 'characterDown') nextSort = 'characterUp';
        else if (currentSort === 'characterUp') nextSort = 'characterDown';
        else if (currentSort === 'default') nextSort = 'characterDown';
        else nextSort = 'characterDown';

        this.setState({
            currentSort: nextSort
        })
    }

    onSortChangeThreat = () => {
        const { currentSort } = this.state;
        let nextSort;

        if (currentSort === 'threatDown') nextSort = 'threatUp';
        else if (currentSort === 'threatUp') nextSort = 'threatDown';
        else if (currentSort === 'default') nextSort = 'threatDown';
        else nextSort = 'threatDown';

        this.setState({
            currentSort: nextSort
        })
    }

    onSortChangeAesthetic = () => {
        const { currentSort } = this.state;
        let nextSort;

        if (currentSort === 'aestheticDown') nextSort = 'aestheticUp';
        else if (currentSort === 'aestheticUp') nextSort = 'aestheticDown';
        else if (currentSort === 'default') nextSort = 'aestheticDown';
        else nextSort = 'aestheticDown';

        this.setState({
            currentSort: nextSort
        })
    }

    onSortChangeGraphicContent = () => {
        const { currentSort } = this.state;
        let nextSort;

        if (currentSort === 'graphicContentDown') nextSort = 'graphicContentUp';
        else if (currentSort === 'graphicContentUp') nextSort = 'graphicContentDown';
        else if (currentSort === 'default') nextSort = 'graphicContentDown';
        else nextSort = 'graphicContentDown';

        this.setState({
            currentSort: nextSort
        })
    }



    componentDidMount() {
        this.refreshMovies();        
    }

    refreshMovies() {
        MovieDataService.retrieveAllAggregateScores(REVIEW)//HARDCODED
            .then(
                response => {
                    console.log(response);
                    this.setState({ movies: response.data })
                }
            )
    }


    render() {
        const { currentSort } = this.state;

        return (
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>
                            <button onClick={this.onSortChangeOverall}>
                                Overall Rating
                            </button>
                        </th>
                        <th>
                            <button onClick={this.onSortChangePlot}>
                                Plot
                            </button>
                        </th>
                        <th>
                            <button onClick={this.onSortChangeCharacter}>
                                Characters
                            </button>
                        </th>
                        <th>
                            <button onClick={this.onSortChangeThreat}>
                                Threat/Antagonist
                            </button>
                        </th>
                        <th>
                            <button onClick={this.onSortChangeAesthetic}>
                                Aesthetic/Atmosphere
                            </button>
                        </th>
                        <th>
                            <button onClick={this.onSortChangeGraphicContent}>
                                Graphic Content
                            </button>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.movies.sort(sortAggs[currentSort].fn).map(
                        movie =>
                        <tr key={movie.movieId}>
                            <td>
                                <Link to={`/reviews-for/${movie.movieId}`}>
                                    <Button>{movie.movieName}</Button>
                                </Link>
                            </td>
                            <td>{movie.overallAggregate}</td>
                            <td>{movie.plotAggregate}</td>
                            <td>{movie.characterAggregate}</td>
                            <td>{movie.threatAggregate}</td>
                            <td>{movie.aestheticAggregate}</td>
                            <td>{movie.graphicContentAggregate}</td>
                            <td>
                                <Link to={`/submit-review/${movie.movieId}`}>
                                    <Button>Review This!</Button>
                                </Link>
                            </td>
                        </tr>
                    )}
                </tbody>
            </Table>
        );
            
    }
}

export default ListMovies