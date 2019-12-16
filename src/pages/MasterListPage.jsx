import React from 'react'
import SortedList from '../component/SortedList'

export default () => {
    return <div>
        <p>
            <i>Click a category header to sort the movies by their average rating in that category.
            To see all the reviews for a movie, just click the title!</i> 
        </p>
        <p>
            <i>Note that a movie's Graphic Content rating is not factored into its Overall Rating.</i>
        </p>
        <SortedList striped />
    </div>
}