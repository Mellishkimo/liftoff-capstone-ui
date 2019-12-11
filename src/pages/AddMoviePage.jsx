import React from 'react'
import MovieComponent from '../component/MovieComponent'
import { Link } from 'react-router-dom'
import Button from 'react-bootstrap/Button'

export default () => {
    return <div className="container" style={{ textAlign: 'center' }}>
        <h1>Add a Movie to the Database!</h1>
        <br />
        <p>
            Before adding a movie to the database, ensure it does not already
            have an entry by browsing the database below!
        </p>
        <Link to="/all-movies">
            <Button variant="success">*Browse the Master List*</Button>
        </Link>
        <br />
        <br />


        <p>
            Now that you are confident the movie is not already in the database, add it below!
        </p>
        <p>
            Enter a movie title along with the date it was released in parentheses.
            (Ex: Final Exam (1981))
        </p>
        <MovieComponent />
    </div>
}