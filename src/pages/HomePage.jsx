import React from 'react'
import { Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import RecentlyReviewed from '../component/RecentlyReviewedComponent'
import Pumpkin from '../helpers/Pumpkin.svg'

export default () => {
    return (
    <div className="container">
        <h1 style={{ fontSize: '50px', marginBottom: '0px' }}>Lightning Fast Horror Reviews</h1>
        <p style={{ fontSize: '18px', fontStyle: 'italic', textAlign: 'center' }}>
            The only site where you can find the exact horror movie to fit your mood.
        </p>
        <Row style={{ display: 'flex', justifyContent: 'center' }}>
            <img src={Pumpkin} alt={'Pumpkin'} />
            <Link to='/add-movie' className='lightningLink' style={{ paddingLeft: '74px', paddingRight: '74px' }}>Add Movie</Link>
            <img src={Pumpkin} alt={'Pumpkin'} />
        </Row>
        <Row style={{ display: 'flex', justifyContent: 'center' }}>
            <img src={Pumpkin} alt={'Pumpkin'} />
            <Link to='/add-review' className='lightningLink' style={{ paddingLeft: '51.5px', paddingRight: '51.5px' }}>Submit Review</Link>
            <img src={Pumpkin} alt={'Pumpkin'} />
        </Row>
        <Row style={{ display: 'flex', justifyContent: 'center' }}>
            <img src={Pumpkin} alt={'Pumpkin'} />
            <Link to='/all-movies' className='lightningLink' style={{ paddingLeft: '35px', paddingRight: '35px' }}>Browse All Movies</Link>
            <img src={Pumpkin} alt={'Pumpkin'} />
        </Row>
        <RecentlyReviewed />
        <br />
    </div>
    )
}