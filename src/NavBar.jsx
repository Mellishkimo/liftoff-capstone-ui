import React from 'react'
import Button from '@material-ui/core/Button'
import { Link } from 'react-router-dom'
import { AppBar, Toolbar } from '@material-ui/core'

export const NavBar = ({ color }) => (
    <AppBar color={color}>
        <Toolbar>
            <Link to="/">
                <Button>Home</Button>
            </Link>
            <Link to="/add-movie">
                <Button>Add Movie to Database</Button>
            </Link>
            <Link to="/add-review">
                <Button>Review a Movie</Button>
            </Link>
            <Link to="/all-movies">
                <Button>List of All Movies</Button>
            </Link>
        </Toolbar>    
    </AppBar>
)