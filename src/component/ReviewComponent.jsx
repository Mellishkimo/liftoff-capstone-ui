import React, { Component } from 'react'
import {
    Button,
    Col,
    Form,
    FormGroup,
    Input,
    Label
  } from 'reactstrap'
import { selectOptions } from '../helpers/selectOptions'
import MovieDataService from '../service/MovieDataService';
import { withRouter } from 'react-router-dom';
import Slider from '@material-ui/core/Slider'
import { withStyles } from '@material-ui/core/styles'
import Pumpkin from '../helpers/Pumpkin.svg'
import { Row } from 'react-bootstrap';

const REVIEW = 'lightning-fast-horror-reviews'

const PumpkinSlider = withStyles({
    root: {
      color: 'black',
      height: 14
    },
    thumb: {
      color: 'black',
      height: 25,
      width: 28,
      marginTop: -6,
      marginLeft: -12,
      '&:focus, &:hover': {
        boxShadow: 'inherit',
      },
    },
    mark: {
        width: 0
    },
    markLabel: {
        fontSize: '16px',
        marginTop: '14px'
    },
    track: {
      border: '3px solid #ff6600',
      color: '#ffcc00',
      height: 14,
      borderRadius: 4,
    },
    rail: {
      border: '3px solid #ff8c00',
      height: 14,
      borderRadius: 4,
      opacity: 1
    },
  })(Slider);

  function PumpkinThumb(props) {
      return (
          <span {...props}>
              <img src={Pumpkin} alt={'Pumpkin'} />
          </span>
      )
  }

class ReviewComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            aestheticCommentChecked: false,
            aestheticDescription: '',
            aestheticRating: 1,
            aestheticRemaining: 140,
            characterCommentChecked: false,
            characterDescription: '',
            characterRating: 1,
            characterRemaining: 140,
            graphicCommentChecked: false,
            graphicContentDescription: '',
            graphicContentRating: 1,
            graphicContentRemaining: 140,
            movie: {},
            movieId: this.props.match.params.id,
            plotCommentChecked: false, 
            plotDescription: '',
            plotRating: 1,
            plotRemaining: 140,
            reviewerName: '',
            submitAttempted: false,
            threatCommentChecked: false,
            threatDescription: '',
            threatRating: 1,
            threatRemaining: 140
        }

        this.handleAestheticComment = this.handleAestheticComment.bind(this)
        this.handleAestheticCommentCheck = this.handleAestheticCommentCheck.bind(this)
        this.handleAestheticRatingSelect = this.handleAestheticRatingSelect.bind(this)
        this.handleCharacterComment = this.handleCharacterComment.bind(this)
        this.handleCharacterCommentCheck = this.handleCharacterCommentCheck.bind(this)
        this.handleCharacterRatingSelect = this.handleCharacterRatingSelect.bind(this)
        this.handleGraphicCommentCheck = this.handleGraphicCommentCheck.bind(this)
        this.handleGraphicContentComment = this.handleGraphicContentComment.bind(this)
        this.handleGraphicContentRatingSelect = this.handleGraphicContentRatingSelect.bind(this)
        this.handlePlotComment = this.handlePlotComment.bind(this)
        this.handlePlotCommentCheck = this.handlePlotCommentCheck.bind(this)
        this.handlePlotRatingSelect = this.handlePlotRatingSelect.bind(this)
        this.handleReviewerName = this.handleReviewerName.bind(this)
        this.handleThreatComment = this.handleThreatComment.bind(this)
        this.handleThreatCommentCheck = this.handleThreatCommentCheck.bind(this)
        this.handleThreatRatingSelect = this.handleThreatRatingSelect.bind(this)
        this.submit = this.submit.bind(this)
    }

    handleAestheticComment (event) {
        this.setState({ 
            [event.target.id]: event.target.value,
            aestheticRemaining: 140 - (event.target.value.length) })
    }

    handleAestheticCommentCheck (event) {
        this.setState({ aestheticCommentChecked: !this.state.aestheticCommentChecked })
    }

    handleAestheticRatingSelect (event, value) {
        this.setState({ aestheticRating: value })
    }

    handleCharacterComment (event) {
        this.setState({ 
            [event.target.id]: event.target.value,
            characterRemaining: 140 - (event.target.value.length) })
    }

    handleCharacterCommentCheck (event) {
        this.setState({ characterCommentChecked: !this.state.characterCommentChecked })
    }

    handleCharacterRatingSelect (event, value) {
        this.setState({ characterRating: value })
    }

    handleGraphicCommentCheck (event) {
        this.setState({ graphicCommentChecked: !this.state.graphicCommentChecked })
    }

    handleGraphicContentComment (event) {
        this.setState({ 
            [event.target.id]: event.target.value,
            graphicContentRemaining: 140 - (event.target.value.length) })
    }

    handleGraphicContentRatingSelect (event, value) {
        this.setState({ graphicContentRating: value })
    }

    handlePlotComment (event) {
        this.setState({ 
            [event.target.id]: event.target.value,
            plotRemaining: 140 - (event.target.value.length) })
    }

    handlePlotCommentCheck (event) {
        this.setState({ plotCommentChecked: !this.state.plotCommentChecked })
    }

    handlePlotRatingSelect (event, value) {
        this.setState({ plotRating: value })
    }

    handleReviewerName (event) {
        this.setState({ [event.target.id]: event.target.value })
    }

    handleThreatComment (event) {
        this.setState({ 
            [event.target.id]: event.target.value,
            threatRemaining: 140 - (event.target.value.length) })
    }

    handleThreatCommentCheck (event) {
        this.setState({ threatCommentChecked: !this.state.threatCommentChecked })
    }

    handleThreatRatingSelect (event, value) {
        this.setState({ threatRating: value })
    }

    submit(event) {
        event.preventDefault()

        if (!this.state.reviewerName) {
                this.setState({
                    submitAttempted: true
                })
            return
        }
        
        let review = {
            author: this.state.reviewerName,
            plotRating: this.state.plotRating,
            characterRating: this.state.characterRating,
            threatRating: this.state.threatRating,
            aestheticRating: this.state.aestheticRating,
            graphicContentRating: this.state.graphicContentRating,
            plotDescription: this.state.plotDescription,
            characterDescription: this.state.characterDescription,
            threatDescription: this.state.threatDescription,
            aestheticDescription: this.state.aestheticDescription,
            graphicContentDescription: this.state.graphicContentDescription
        }

        MovieDataService.createReview(review, this.state.movieId)
            .then(() => {this.props.history.push(`/reviews-for/${this.state.movieId}`)})
    }

    componentDidMount() {
        MovieDataService.retrieveMovie(REVIEW, this.state.movieId)
        .then(
            response => {
                this.setState({ movie: response.data })
            }
        )
    }

    render() {

        const { aestheticCommentChecked, aestheticDescription, aestheticRemaining, characterCommentChecked, characterDescription, characterRemaining,
                graphicCommentChecked, graphicContentDescription, graphicContentRemaining, movie, plotCommentChecked, plotDescription, plotRemaining,
                reviewerName, submitAttempted, threatCommentChecked, threatDescription, threatRemaining } = this.state

        return (
            <div>
                <h2>Review of {movie.title}</h2>
                <Row>
                    <Col />
                    <Col style={{ display: 'flex', justifyContent: 'center' }}>
                        <img src={movie.posterSource} alt={'Poster'} style={{ height: '268px', width: '182px' }} />
                    </Col>
                    <Col />
                </Row>
                <br />
                <div className="container">
                    <Form>
                                    <FormGroup row>
                                        <Label for='reviewerName' style={{ marginTop: '6px', paddingLeft: '20px' }}>Reviewer:</Label>
                                        <Col sm={4}>
                                            <Input
                                                id='reviewerName'
                                                placeholder='Your username here'
                                                invalid={submitAttempted && !reviewerName}
                                                value={reviewerName}
                                                onChange={this.handleReviewerName} />
                                        </Col>
                                    </FormGroup>
                                    <div className='reviewRow'>
                                    <FormGroup row className='reviewHalf'>
                                        <Col className='reviewCol'>
                                            <h3 className='reviewCategory'>Plot</h3>
                                            <FormGroup check>
                                                <Label check>
                                                <Input 
                                                    type='checkbox'
                                                    id='plotCommentCheckbox'
                                                    checked={plotCommentChecked}
                                                    onChange={this.handlePlotCommentCheck} />
                                                    Add comment
                                                </Label>
                                            </FormGroup>
                                        </Col>
                                        <Col className='sliderCol'>
                                            <PumpkinSlider
                                                ThumbComponent={PumpkinThumb}
                                                defaultValue={1}
                                                onChange={this.handlePlotRatingSelect}
                                                min={.9}
                                                max={10.1}
                                                step={null}
                                                marks={selectOptions} />
                                        </Col>
                                    </FormGroup>
                                    {plotCommentChecked &&
                                    <React.Fragment>
                                    <FormGroup row>
                                        <Col className='commentCol'>
                                            <Input
                                                id='plotDescription'
                                                type='text'
                                                placeholder='You may include a brief comment here, no greater than 140 characters in length'
                                                value={plotDescription}
                                                onChange={this.handlePlotComment} />
                                        </Col>
                                    </FormGroup>
                                    <p className='characterCounter' style={plotRemaining < 0 ? { color: '#dc3545' } : { color: '#5d5d5d' }}>{`${plotRemaining} characters remaining`}</p>
                                    </React.Fragment>}
                                    </div>
                                    <div className='reviewRow'>
                                    <FormGroup row className='reviewHalf'>
                                        <Col className='reviewCol'>
                                            <h3 className='reviewCategory'>Threat</h3>
                                            <FormGroup check>
                                                <Label check>
                                                <Input 
                                                    type='checkbox'
                                                    id='threatCommentCheckbox'
                                                    checked={threatCommentChecked}
                                                    onChange={this.handleThreatCommentCheck} />
                                                    Add comment
                                                </Label>
                                            </FormGroup>
                                        </Col>
                                        <Col className='sliderCol'>
                                            <PumpkinSlider
                                                ThumbComponent={PumpkinThumb}
                                                defaultValue={1}
                                                onChange={this.handleThreatRatingSelect}
                                                min={.9}
                                                max={10.1}
                                                step={null}
                                                marks={selectOptions} />
                                        </Col>
                                    </FormGroup>
                                    {threatCommentChecked &&
                                    <React.Fragment>
                                    <FormGroup row>
                                        <Col className='commentCol'>
                                            <Input
                                                id='threatDescription'
                                                type='text'
                                                placeholder='You may include a brief comment here, no greater than 140 characters in length'
                                                value={threatDescription}
                                                onChange={this.handleThreatComment} />
                                        </Col>
                                    </FormGroup>
                                    <p className='characterCounter' style={threatRemaining < 0 ? { color: '#dc3545' } : { color: '#5d5d5d' }}>{`${threatRemaining} characters remaining`}</p>
                                    </React.Fragment>}
                                    </div>
                                    <div className='reviewRow'>
                                    <FormGroup row className='reviewHalf'>
                                        <Col className='reviewCol'>
                                            <h3 className='reviewCategory'>Characters</h3>
                                            <FormGroup check>
                                                <Label check>
                                                <Input 
                                                    type='checkbox'
                                                    id='characterCommentCheckbox'
                                                    checked={characterCommentChecked}
                                                    onChange={this.handleCharacterCommentCheck} />
                                                    Add comment
                                                </Label>
                                            </FormGroup>
                                        </Col>
                                        <Col className='sliderCol'>
                                            <PumpkinSlider
                                                ThumbComponent={PumpkinThumb}
                                                defaultValue={1}
                                                onChange={this.handleCharacterRatingSelect}
                                                min={.9}
                                                max={10.1}
                                                step={null}
                                                marks={selectOptions} />
                                        </Col>
                                    </FormGroup>
                                    {characterCommentChecked &&
                                    <React.Fragment>
                                    <FormGroup row>
                                        <Col className='commentCol'>
                                            <Input
                                                id='characterDescription'
                                                type='text'
                                                placeholder='You may include a brief comment here, no greater than 140 characters in length'
                                                value={characterDescription}
                                                onChange={this.handleCharacterComment} />
                                        </Col>
                                    </FormGroup>
                                    <p className='characterCounter' style={characterRemaining < 0 ? { color: '#dc3545' } : { color: '#5d5d5d' }}>{`${characterRemaining} characters remaining`}</p>
                                    </React.Fragment>}
                                    </div>
                                    <div className='reviewRow'>
                                    <FormGroup row className='reviewHalf'>
                                        <Col className='reviewCol'>
                                            <h3 className='reviewCategory'>Aesthetic</h3>
                                            <FormGroup check>
                                                <Label check>
                                                <Input 
                                                    type='checkbox'
                                                    id='aestheticCommentCheckbox'
                                                    checked={aestheticCommentChecked}
                                                    onChange={this.handleAestheticCommentCheck} />
                                                    Add comment
                                                </Label>
                                            </FormGroup>
                                        </Col>
                                        <Col className='sliderCol'>
                                            <PumpkinSlider
                                                ThumbComponent={PumpkinThumb}
                                                defaultValue={1}
                                                onChange={this.handleAestheticRatingSelect}
                                                min={.9}
                                                max={10.1}
                                                step={null}
                                                marks={selectOptions} />
                                        </Col>
                                    </FormGroup>
                                    {aestheticCommentChecked &&
                                    <React.Fragment>
                                    <FormGroup row>
                                        <Col className='commentCol'>
                                            <Input
                                                id='aestheticDescription'
                                                type='text'
                                                placeholder='You may include a brief comment here, no greater than 140 characters in length'
                                                value={aestheticDescription}
                                                onChange={this.handleAestheticComment} />
                                        </Col>
                                    </FormGroup>
                                    <p className='characterCounter' style={aestheticRemaining < 0 ? { color: '#dc3545' } : { color: '#5d5d5d' }}>{`${aestheticRemaining} characters remaining`}</p>
                                    </React.Fragment>}
                                    </div>
                                    <div className='reviewRow'>
                                    <FormGroup row className='reviewHalf'>
                                        <Col className='reviewCol'>
                                            <h3 className='reviewCategory'>Graphic Content</h3>
                                            <FormGroup check>
                                                <Label check>
                                                <Input 
                                                    type='checkbox'
                                                    id='graphicCommentCheckbox'
                                                    checked={graphicCommentChecked}
                                                    onChange={this.handleGraphicCommentCheck} />
                                                    Add comment
                                                </Label>
                                            </FormGroup>
                                        </Col>
                                        <Col className='sliderCol'>
                                            <PumpkinSlider
                                                ThumbComponent={PumpkinThumb}
                                                defaultValue={1}
                                                onChange={this.handleGraphicContentRatingSelect}
                                                min={.9}
                                                max={10.1}
                                                step={null}
                                                marks={selectOptions} />
                                        </Col>
                                    </FormGroup>
                                    {graphicCommentChecked &&
                                    <React.Fragment>
                                    <FormGroup row>
                                        <Col className='commentCol'>
                                            <Input
                                                id='graphicContentDescription'
                                                type='text'
                                                placeholder='You may include a brief comment here, no greater than 140 characters in length'
                                                value={graphicContentDescription}
                                                onChange={this.handleGraphicContentComment} />
                                        </Col>
                                    </FormGroup>
                                    <p className='characterCounter' style={graphicContentRemaining < 0 ? { color: '#dc3545' } : { color: '#5d5d5d' }}>{`${graphicContentRemaining} characters remaining`}</p>
                                    </React.Fragment>}
                                    </div>
                                    <Button
                                    type="submit"
                                    className='submitButton'
                                    onClick={this.submit}
                                    >Submit</Button>
                                </Form>
                </div>
            </div>
        )
    }
}

export default withRouter(ReviewComponent)