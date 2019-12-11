import React from 'react'
import Button from 'react-bootstrap/Button'
import { Link } from 'react-router-dom'

export default () => {
    return (
        <div className="container" style={{ textAlign: 'center' }}>
            <h1>Submit a Movie Review</h1>
            <br />
            <br />
            <p style={{ fontSize: 'large' }}>
                In order to review a movie, you must first select a film from the Database
                by using the "Review This Movie!" button
                next to the movie on the Master List.
            </p>
            <br />
            <Link to="/all-movies">
                <Button>*Browse the Master List*</Button>
            </Link>
            <br />
            <br />
            <br />
            <p style={{ fontSize: 'large' }}>
                Can't find the movie you want to review in the database? It might not have been added yet!
                Add the movie to the database using the link below!
            </p>
            <br />
            <Link to="/add-movie">
                <Button>*Add the Movie to the Database!*</Button>
            </Link>
        </div>
    )
    
}