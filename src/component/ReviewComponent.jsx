import React, { Component } from 'react'
import { Formik, Field, Form, ErrorMessage } from 'formik';
import MovieDataService from '../service/MovieDataService';
import { withRouter } from 'react-router-dom';


const REVIEW = 'lightning-fast-horror-reviews'

class ReviewComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            author: '',
            plotRating: 5,
            characterRating: 5,
            threatRating: 5,
            aestheticRating: 5,
            graphicContentRating: 5,
            plotDescription: '',
            characterDescription: '',
            threatDescription: '',
            aestheticDescription: '',
            graphicContentDescription: '',
            movieId: this.props.match.params.id, 
            movie: {}

        }

        this.onSubmit = this.onSubmit.bind(this)
        this.validate = this.validate.bind(this)

    }

    componentDidMount() {

        console.log(this.state.movieId)

        this.state.movie = MovieDataService.retrieveMovie(REVIEW, this.state.movieId)
        .then(
            response => {
                console.log(response);
                this.setState({ movie: response.data })
            }
        )
    }

    validate(values) {
        let errors = {}
        if (!values.author) {
            errors.author = 'Enter your name or nickname!'
        }

        return errors

    }

  

    onSubmit(values) {
        
        let review = {
            author: values.author,
            plotRating: values.plotRating,
            characterRating: values.characterRating,
            threatRating: values.threatRating,
            aestheticRating: values.aestheticRating,
            graphicContentRating: values.graphicContentRating,
            plotDescription: values.plotDescription,
            characterDescription: values.characterDescription,
            threatDescription: values.threatDescription,
            aestheticDescription: values.aestheticDescription,
            graphicContentDescription: values.graphicContentDescription
        }

        if (review.plotDescription !== "zzyzyzz") {
            MovieDataService.createReview(review, this.state.movieId)
                .then(() => {this.props.history.push(`/reviews-for/${this.state.movieId}`)})
        }

        console.log(values);
    }

    render() {

        let { author, plotRating, characterRating, threatRating, aestheticRating, graphicContentRating,
            plotDescription, characterDescription, threatDescription, aestheticDescription, graphicContentDescription } = this.state

        return (
            <div>
                <h1>Review for {this.state.movie.title}</h1>
                <br />
                <div className="container">
                    <Formik
                        initialValues={{ author, plotRating, characterRating, threatRating, aestheticRating, graphicContentRating,
                            plotDescription, characterDescription, threatDescription, aestheticDescription, graphicContentDescription }}
                        onSubmit={this.onSubmit}
                        validate={this.validate}
                    >
                        {
                            (props) => (
                                <Form>
                                    <ErrorMessage name="author" component="div"
                                        className="alert alert-warning" />
                                    <label>Author (Enter your name or nickname here)</label>
                                    <fieldset className="form-group">
                                        <Field className="form-control" type="text" name="author" />
                                    </fieldset>

                                    <label>Plot (Please enter a rating on a scale of 1-10)</label>                                 
                                    <fieldset className="form-group">
                                        <Field className="form-control" type="text" name="plotRating" />
                                        <label>You may optionally include a brief comment in the box below, no more than 140 characters in length</label>
                                        <Field className="form-control" type="textarea" rows="2" name="plotDescription" />
                                    </fieldset>
                                    
                                    <label>Characters (Please enter a rating on a scale of 1-10)</label>                                
                                    <fieldset className="form-group">
                                        <Field className="form-control" type="text" name="characterRating" />
                                        <label>You may optionally include a brief comment in the box below, no more than 140 characters in length</label>
                                        <Field className="form-control" type="text" name="characterDescription" />
                                    </fieldset>

                                    <label>Threat/Antagonist (Please enter a rating on a scale of 1-10)</label>                                  
                                    <fieldset className="form-group">
                                        <Field className="form-control" type="text" name="threatRating" />
                                        <label>You may optionally include a brief comment in the box below, no more than 140 characters in length</label>
                                        <Field className="form-control" type="text" name="threatDescription" />
                                    </fieldset>
                                    
                                    <label>Atmosphere/Aesthetic (Please enter a rating on a scale of 1-10)</label>                                   
                                    <fieldset className="form-group">
                                        <Field className="form-control" type="text" name="aestheticRating" />
                                        <label>You may optionally include a brief comment in the box below, no more than 140 characters in length</label>
                                        <Field className="form-control" type="text" name="aestheticDescription" />
                                    </fieldset>
                                    
                                    <label>Graphic Content (Please enter a rating on a scale of 1-10)</label>
                                    <fieldset className="form-group">
                                        <Field className="form-control" type="text" name="graphicContentRating" />
                                        <label>You may optionally include a brief comment in the box below, no more than 140 characters in length</label>
                                        <Field className="form-control" type="text" name="graphicContentDescription" />
                                    </fieldset>
                                    <button
                                    className="btn btn-success"
                                    type="submit"
                                    >Submit Review</button>

                                </Form>
                            )
                        }

                    </Formik>    
                </div>
            </div>
        )
    }
}

export default withRouter(ReviewComponent)