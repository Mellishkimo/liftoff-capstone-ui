import React from 'react'
import { Link } from 'react-router-dom'
import { AppBar, Toolbar } from '@material-ui/core'

export const NavBar = ({ color }) => (
    <AppBar color={color} style={{ background: '#ff6600'}}>
        <Toolbar>
            <Link to="/" className='navBar-link'>
                <div>Home</div>
            </Link>
            <Link to="/add-movie" className='navBar-link'>
                <div>Add Movie</div>
            </Link>
            <Link to="/add-review" className='navBar-link'>
                <div>Submit Review</div>
            </Link>
            <Link to="/all-movies" className='navBar-link'>
                <div>All Movies</div>
            </Link>
        </Toolbar>    
    </AppBar>
)