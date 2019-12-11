import React, { Component } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import MovieDataService from '../service/MovieDataService';
import { withRouter } from 'react-router-dom'
import Button from 'react-bootstrap/Button'


class MovieComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            title: ''
        }

        this.onSubmit = this.onSubmit.bind(this)
        this.validate = this.validate.bind(this)

    }

  

    validate(values) {
        let errors = {}
        if (!values.title) {
            errors.title = 'Enter a Title'
        }

        return errors

    }

    onSubmit(values) {
        
        let movie = {
            title: values.title
        }

        if (movie.title !== "zzyzyzz") {
            MovieDataService.createMovie(movie)
                .then(() => {this.props.history.push('/all-movies')})
        }

        console.log(values);
    }

    render() {

        let { title } = this.state

        return (
            <div>
                <div className="text-center">
                    <Formik
                        initialValues={{ title }}
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
                                    <Button className="btn btn-success" type="submit">Add Movie</Button>
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

