import React, { Component } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import MovieDataService from '../service/MovieDataService';
import { withRouter } from 'react-router-dom';
import Button from 'react-bootstrap/Button';



class MovieComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            title: '',
            posterSource: ''
        }

        this.onSubmit = this.onSubmit.bind(this)
        this.validate = this.validate.bind(this)

    }

    

  

    validate(values) {
        let errors = {}
        if (!values.title) {
            errors.title = 'Enter a Title'
        }
        if (!values.posterSource) {
            errors.posterSource = 'Please paste a source address for the movie poster image'
        }

        return errors

    }

    onSubmit(values) {
        
        let movie = {
            title: values.title,
            posterSource: values.posterSource
        }

        if (movie.title !== "zzyzyzz") {
            MovieDataService.createMovie(movie)
                .then(() => {this.props.history.push('/all-movies')})
        }

        console.log(values);
    }

    render() {

        let { title, posterSource } = this.state

        return (
            <div>
                <div className="text-center">
                    <Formik
                        initialValues={{ title, posterSource }}
                        onSubmit={this.onSubmit}
                        validate={this.validate}
                    >
                        {
                            (props) => (
                                <Form>
                                    <ErrorMessage name="title" component="div"
                                        className="alert alert-warning" />
                                    <fieldset className="form-group">
                                        <Field className="form-control" type="text" name="title" />
                                    </fieldset>
                                    <label>Paste the image address of the image you would like to upload as the movie's poster below!</label>
                                    <ErrorMessage name="posterSource" component="div"
                                        className="alert alert-warning" />
                                    <fieldset className="form-group">
                                        <Field className="form-control" type="text" name="posterSource" />
                                    </fieldset>
                                    <Button type="submit">Add Movie</Button>
                                </Form>
                            )
                        }

                    </Formik>    
                </div>
            </div>
        )
    }
}

export default withRouter(MovieComponent)

