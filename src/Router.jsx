import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Layout from './Layout'
import HomePage from './pages/HomePage'
import AddMoviePage from './pages/AddMoviePage'
import AddReviewPage from './pages/AddReviewPage'
import MasterListPage from './pages/MasterListPage'
import ReviewSubmissionPage from './pages/ReviewSubmissionPage'
import MovieCardsPage from './pages/MovieCardsPage'



export const Routes = () => {
    return (
        <Router>
            <Layout>
                <div style={{ marginTop: '100px', width: '100vw' }}>
                    <Route path="/" exact component={HomePage} />
                    <Route path="/add-movie" exact component={AddMoviePage} />
                    <Route path="/add-review" exact component={AddReviewPage} />
                    <Route path="/all-movies" exact component={MasterListPage} />
                    <Route path="/submit-review/:id" exact component={ReviewSubmissionPage} />
                    <Route path="/reviews-for/:id" exact component={MovieCardsPage} />
                </div>
            </Layout>
        </Router>
    )
}