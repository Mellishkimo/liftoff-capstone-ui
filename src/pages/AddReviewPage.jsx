import React from 'react'
import Button from 'react-bootstrap/Button'
import { Link } from 'react-router-dom'

export default () => {
    return (
        <div className="text-center">
            <h1>Submit a Movie Review</h1>
            <p>
                In order to review a movie, you must first select a film from the database,
                either by searching for its title, or by using the "Review This Movie!" button
                next to the movie on the Master List.
            </p>
            <br />
            <p>
                Is your search not turning up the movie you're looking for? Perhaps you misspelled
                the title, or it is in the database under an alternate title. Try browsing the Master
                List for it. If you can't find it there, add the movie to the database using the link below!
            </p>
            <Link to="/add-movie">
                <Button>*Add the Movie to the Database!*</Button>
            </Link>
            <br />
            <br />
            <p>
                In the mood to critique, but you don't have a particular movie in mind? Browse the
                Master List and see if something catches your eye!
            </p>
            <Link to="/all-movies">
                <Button>*Browse the Master List*</Button>
            </Link>

        </div>
    )
    
}