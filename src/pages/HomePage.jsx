import React from 'react'
import Button from 'react-bootstrap/Button'
import { Link } from 'react-router-dom'
import RecentlyReviewed from '../component/RecentlyReviewedComponent'

export default () => {
    return (
    <div className="container" style={{ textAlign: 'center' }}>
        <h1 style={{ fontSize: 'xxx-large' }}>Welcome to Lightning Fast Horror Reviews</h1>
        <br />
        <br />
        <h3 style={{ fontSize: 'x-large' }}>
            The only website where you can find the exact horror movie to fit your mood.
            Browse the database to find the perfect film for the evening, or give back to
            the community by submitting a review of your own! Thank you for using Lightning
            Fast Horror Reviews.
        </h3>
        <br />
        <Link to="/all-movies">
                <Button size="lg" style={{ width: '300px' }}>*Browse the Database*</Button>
        </Link>
        <br />
        <br />
        <Link to="/add-review">
            <Button size="lg" style={{ width: '300px' }}>*Submit a Review*</Button>
        </Link>
        <br />
        <br />
        <RecentlyReviewed />
        <br />
    </div>
    )
}