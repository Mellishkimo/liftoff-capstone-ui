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
        if (values.plotDescription.length > 140) {
            errors.plotDescription = 'Comments must be fewer than 140 characters in length.'
        }
        if (values.characterDescription.length > 140) {
            errors.characterDescription = 'Comments must be fewer than 140 characters in length.'
        }
        if (values.threatDescription.length > 140) {
            errors.threatDescription = 'Comments must be fewer than 140 characters in length.'
        }
        if (values.aestheticDescription.length > 140) {
            errors.aestheticDescription = 'Comments must be fewer than 140 characters in length.'
        }
        if (values.graphicContentDescription.length > 140) {
            errors.graphicContentDescription = 'Comments must be fewer than 140 characters in length.'
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
                                    <label><b>Author</b> (Enter your name or nickname here)</label>
                                    <fieldset className="form-group">
                                        <Field className="form-control" type="text" name="author" />
                                    </fieldset>

                                    
                                    <ErrorMessage name="plotDescription" component="div"
                                        className="alert alert-warning" />                                
                                    <fieldset className="form-group">
                                    <label><b>Plot:</b></label> 
                                        <Field name="plotRating" component="select">
                                            <option value="1">1</option>
                                            <option value="2">2</option>
                                            <option value="3">3</option>
                                            <option value="4">4</option>
                                            <option value="5">5</option>
                                            <option value="6">6</option>
                                            <option value="7">7</option>
                                            <option value="8">8</option>
                                            <option value="9">9</option>
                                            <option value="10">10</option>
                                        </Field>
                                    </fieldset>
                                    <fieldset className="form-group">
                                        <label>You may optionally include a brief comment in the box below, no more than 140 characters in length</label>
                                        <Field className="form-control" type="textarea" rows="2" name="plotDescription" />
                                    </fieldset>
                                    
                                    <ErrorMessage name="characterDescription" component="div"
                                        className="alert alert-warning" />                            
                                    <fieldset className="form-group">
                                        <label><b>Characters:</b></label>    
                                        <Field name="characterRating" component="select">
                                            <option value="1">1</option>
                                            <option value="2">2</option>
                                            <option value="3">3</option>
                                            <option value="4">4</option>
                                            <option value="5">5</option>
                                            <option value="6">6</option>
                                            <option value="7">7</option>
                                            <option value="8">8</option>
                                            <option value="9">9</option>
                                            <option value="10">10</option>
                                        </Field>
                                    </fieldset>
                                    <fieldset>
                                        <label>You may optionally include a brief comment in the box below, no more than 140 characters in length</label>
                                        <Field className="form-control" type="textarea" rows="2" name="characterDescription" />
                                    </fieldset>
                                 
                                    <ErrorMessage name="threatDescription" component="div"
                                        className="alert alert-warning" />
                                    <fieldset className="form-group">
                                        <label><b>Threat/Antagonist:</b></label> 
                                        <Field name="threatRating" component="select">
                                            <option value="1">1</option>
                                            <option value="2">2</option>
                                            <option value="3">3</option>
                                            <option value="4">4</option>
                                            <option value="5">5</option>
                                            <option value="6">6</option>
                                            <option value="7">7</option>
                                            <option value="8">8</option>
                                            <option value="9">9</option>
                                            <option value="10">10</option>
                                        </Field>
                                    </fieldset>
                                    <fieldset>
                                        <label>You may optionally include a brief comment in the box below, no more than 140 characters in length</label>
                                        <Field className="form-control" type="textarea" rows="2" name="threatDescription" />
                                    </fieldset>
                                    
                                    <ErrorMessage name="aestheticDescription" component="div"
                                        className="alert alert-warning" />                                
                                    <fieldset className="form-group">
                                        <label><b>Atmosphere/Aesthetic:</b></label>   
                                        <Field name="aestheticRating" component="select">
                                            <option value="1">1</option>
                                            <option value="2">2</option>
                                            <option value="3">3</option>
                                            <option value="4">4</option>
                                            <option value="5">5</option>
                                            <option value="6">6</option>
                                            <option value="7">7</option>
                                            <option value="8">8</option>
                                            <option value="9">9</option>
                                            <option value="10">10</option>
                                        </Field>
                                    </fieldset>
                                    <fieldset>
                                        <label>You may optionally include a brief comment in the box below, no more than 140 characters in length</label>
                                        <Field className="form-control" type="textarea" rows="2" name="aestheticDescription" />
                                    </fieldset>
                                    
                                    <ErrorMessage name="graphicContentDescription" component="div"
                                        className="alert alert-warning" />
                                    <fieldset className="form-group">
                                        <label><b>Graphic Content:</b></label>
                                        <Field name="graphicContentRating" component="select">
                                            <option value="1">1</option>
                                            <option value="2">2</option>
                                            <option value="3">3</option>
                                            <option value="4">4</option>
                                            <option value="5">5</option>
                                            <option value="6">6</option>
                                            <option value="7">7</option>
                                            <option value="8">8</option>
                                            <option value="9">9</option>
                                            <option value="10">10</option>
                                        </Field>
                                    </fieldset>
                                    <fieldset>
                                        <label>You may optionally include a brief comment in the box below, no more than 140 characters in length</label>
                                        <Field className="form-control" type="textarea" rows="2" name="graphicContentDescription" />
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