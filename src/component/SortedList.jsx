import React, { Component } from 'react';
import Table from 'react-bootstrap/Table';
import MovieDataService from '../service/MovieDataService';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';

const REVIEW = 'lightning-fast-horror-reviews'
const sortAggs = {
    overallUp: { fn: (a, b) => a.overallAggregate - b.overallAggregate },
    overallDown: { fn: (a, b) => b.overallAggregate - a.overallAggregate },
    plotUp: { fn: (a, b) => a.plotAggregate - b.plotAggregate },
    plotDown: { fn: (a, b) => b.plotAggregate - a.plotAggregate },
    characterUp: { fn: (a, b) => a.characterAggregate - b.characterAggregate },
    characterDown: { fn: (a, b) => b.characterAggregate - a.characterAggregate },
    threatUp: { fn: (a, b) => a.threatAggregate - b.threatAggregate },
    threatDown: { fn: (a, b) => b.threatAggregate - a.threatAggregate },
    aestheticUp: { fn: (a, b) => a.aestheticAggregate - b.aestheticAggregate },
    aestheticDown: { fn: (a, b) => b.aestheticAggregate - a.aestheticAggregate },
    graphicContentUp: { fn: (a, b) => a.graphicContentAggregate - b.graphicContentAggregate },
    graphicContentDown: { fn: (a, b) => b.graphicContentAggregate - a.graphicContentAggregate },
    default: { fn: (a, b) => a }
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

    filterMovieTitles = () => {
        const input = document.getElementById('titleFilter')
        const filter = input.value.toUpperCase()
        const table = document.getElementById('movieTable')
        const tr = table.getElementsByTagName('tr')
  
        for (let i = 0; i < tr.length; i++) {
          const td = tr[i].getElementsByTagName('td')[1]
  
          if (td) {
            const txtValue = td.textContent || td.innerText
  
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
              tr[i].style.display = ''
            } else {
              tr[i].style.display = 'none'
            }
          }
        }
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
        else nextSort = 'plotDown';

        this.setState({ currentSort: nextSort })
    }

    onSortChangeCharacter = () => {
        const { currentSort } = this.state;
        let nextSort;

        if (currentSort === 'characterDown') nextSort = 'characterUp';
        else nextSort = 'characterDown';

        this.setState({ currentSort: nextSort })
    }

    onSortChangeThreat = () => {
        const { currentSort } = this.state;
        let nextSort;

        if (currentSort === 'threatDown') nextSort = 'threatUp';
        else nextSort = 'threatDown';

        this.setState({ currentSort: nextSort })
    }

    onSortChangeAesthetic = () => {
        const { currentSort } = this.state;
        let nextSort;

        if (currentSort === 'aestheticDown') nextSort = 'aestheticUp';
        else nextSort = 'aestheticDown';

        this.setState({ currentSort: nextSort })
    }

    onSortChangeGraphicContent = () => {
        const { currentSort } = this.state;
        let nextSort;

        if (currentSort === 'graphicContentDown') nextSort = 'graphicContentUp';
        else nextSort = 'graphicContentDown';

        this.setState({ currentSort: nextSort })
    }

    refreshMovies() {
        MovieDataService.retrieveAllAggregateScores(REVIEW)
            .then(
                response => {
                    this.setState({ movies: response.data })
                }
            )
    }

    componentDidMount() {
        this.refreshMovies();        
    }

    render() {
        const { currentSort } = this.state;

        return (
            <React.Fragment>
            <input id='titleFilter' onKeyUp={this.filterMovieTitles} placeholder='Filter by title...' />
            <Table id='movieTable' striped bordered hover size='sm' style={{ fontWeight: 'bold' }}>
                <thead>
                    <tr>
                        <th></th>
                        <th style={{ paddingBottom: '10px' }}>Title</th>
                        <th>
                            <Button style={{ color: 'black', fontWeight: 'bold' }} variant='link' onClick={this.onSortChangeOverall}>
                                Overall
                            </Button>
                        </th>
                        <th>
                            <Button style={{ color: 'black', fontWeight: 'bold' }} variant='link' onClick={this.onSortChangePlot}>
                                Plot
                            </Button>
                        </th>
                        <th>
                            <Button style={{ color: 'black', fontWeight: 'bold' }} variant='link' onClick={this.onSortChangeCharacter}>
                                Characters
                            </Button>
                        </th>
                        <th>
                            <Button style={{ color: 'black', fontWeight: 'bold' }} variant='link' onClick={this.onSortChangeThreat}>
                                Threat
                            </Button>
                        </th>
                        <th>
                            <Button style={{ color: 'black', fontWeight: 'bold' }} variant='link' onClick={this.onSortChangeAesthetic}>
                                Aesthetic
                            </Button>
                        </th>
                        <th>
                            <Button style={{ color: 'black', fontWeight: 'bold' }} variant='link' onClick={this.onSortChangeGraphicContent}>
                                Graphic Content
                            </Button>
                        </th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.movies.sort(sortAggs[currentSort].fn).map(
                        movie =>
                        <tr key={movie.movieId}>
                            <td>
                                <Image style={{ maxHeight: '80px' }} src={movie.moviePosterSource} />
                            </td>
                            <td style={{ paddingTop: '20px' }}>
                                <Link to={`/reviews-for/${movie.movieId}`}>
                                    <Button style={{ color: 'black' }} variant='link'><b>{movie.movieName}</b></Button>
                                </Link>
                            </td>
                            <td style={{ paddingTop: '26px' }}>{movie.overallAggregate.toFixed(1)}</td>
                            <td style={{ paddingTop: '26px' }}>{movie.plotAggregate.toFixed(1)}</td>
                            <td style={{ paddingTop: '26px' }}>{movie.characterAggregate.toFixed(1)}</td>
                            <td style={{ paddingTop: '26px' }}>{movie.threatAggregate.toFixed(1)}</td>
                            <td style={{ paddingTop: '26px' }}>{movie.aestheticAggregate.toFixed(1)}</td>
                            <td style={{ paddingTop: '26px' }}>{movie.graphicContentAggregate.toFixed(1)}</td>
                            <td style={{ paddingTop: '20px' }}>
                                <Link to={`/submit-review/${movie.movieId}`}>
                                    <button className='pageButton'>Review This!</button>
                                </Link>
                            </td>
                        </tr>
                    )}
                </tbody>
            </Table>
            </React.Fragment>
        );
        
            
    }
}

export default ListMovies