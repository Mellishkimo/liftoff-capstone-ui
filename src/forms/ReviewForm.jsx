import React from 'react';
import { withFormik, Form, Field } from 'formik';
import Select from 'react-select';
import ReviewComponent from '../component/ReviewComponent';

const formikEnhancer = withFormik({
    mapPropsToValues: props => ({
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
    }),
    handleSubmit: (values, { setSubmitting }) => {
        const payload = {
            ...values,
            plotRating: values.plotRating,
            characterRating: values.characterRating,
            threatRating: values.threatRating,
            aestheticRating: values.aestheticRating,
            graphicContentRating: values.graphicContentRating,
            plotDescription: values.plotDescription,
            characterDescription: values.characterDescription,
            threatDescription: values.threatDescription,
            aestheticDescription: values.aestheticDescription,
            graphicContentDescription: values.graphicContentDescription,
        };
        setTimeout(() => {
            alert(JSON.stringify(payload, null, 2));
            setSubmitting(false);
          }, 1000);
    },
    displayName: 'ReviewForm',
});

const BaseForm = props => {
    const {
        values,
        touched,
        setFieldValue,
        setFieldTouched,
        isSubmitting,
    } = props;
    
    return (
        <Form onSubmit={ReviewComponent.onSubmit}>
            <label>Plot</label>
            <PlotSelect
            value={values.plotRating}
            onChange={setFieldValue}
            onBlur={setFieldTouched}
            touched={touched.plotRating}
            />
            <fieldset className="form-group">
                <Field className="form-control" type="text" name="plotDescription" />
            </fieldset>
            <label>Characters</label>
            <CharacterSelect
            value={values.characterRating}
            onChange={setFieldValue}
            onBlur={setFieldTouched}
            touched={touched.characterRating}
            />
            <fieldset className="form-group">
                <Field className="form-control" type="text" name="characterDescription" />
            </fieldset>
            <label>Threat/Antagonist</label>
            <ThreatSelect
            value={values.threatRating}
            onChange={setFieldValue}
            onBlur={setFieldTouched}
            touched={touched.threatRating}
            />
            <fieldset className="form-group">
                <Field className="form-control" type="text" name="threatDescription" />
            </fieldset>
            <label>Atmosphere/Aesthetic</label>
            <AestheticSelect
            value={values.aestheticRating}
            onChange={setFieldValue}
            onBlur={setFieldTouched}
            touched={touched.aestheticRating}
            />
            <fieldset className="form-group">
                <Field className="form-control" type="text" name="aestheticDescription" />
            </fieldset>
            <label>Graphic Content</label>
            <GraphicContentSelect
            value={values.graphicContentRating}
            onChange={setFieldValue}
            onBlur={setFieldTouched}
            touched={touched.graphicContentRating}
            />
            <fieldset className="form-group">
                <Field className="form-control" type="text" name="graphicContentDescription" />
            </fieldset>
            <button
            className="btn btn-success"
            type="submit"
            disabled={isSubmitting}
            >Submit Review</button>

        </Form>
    );
};

const options = [
    { value: '1', label: '1' },
    { value: '2', label: '2' },
    { value: '3', label: '3' },
    { value: '4', label: '4' },
    { value: '5', label: '5' },
    { value: '6', label: '6' },
    { value: '7', label: '7' },
    { value: '8', label: '8' },
    { value: '9', label: '9' },
    { value: '10', label: '10' },
];

export class PlotSelect extends React.Component {
    handleChange = value => {
        this.props.onChange('plotRating', value);
    };

    handleBlur = () => {
        this.props.onBlur('plotRating', true);
    };

    render() {
        return (
            <div style={{ margin: '1rem 0'  }}>
                <Select
                options={options}
                onChange={this.handleChange}
                onBlur={this.handleBlur}
                value={this.props.value}
                />
            </div>
        );
    }
}

export class CharacterSelect extends React.Component {
    handleChange = value => {
        this.props.onChange('characterRating', value);
    };

    handleBlur = () => {
        this.props.onBlur('characterRating', true);
    };

    render() {
        return (
            <div style={{ margin: '1rem 0'  }}>
                <Select
                options={options}
                onChange={this.handleChange}
                onBlur={this.handleBlur}
                value={this.props.value}
                />
            </div>
        );
    }
}

export class ThreatSelect extends React.Component {
    handleChange = value => {
        this.props.onChange('threatRating', value);
    };

    handleBlur = () => {
        this.props.onBlur('threatRating', true);
    };

    render() {
        return (
            <div style={{ margin: '1rem 0'  }}>
                <Select
                options={options}
                onChange={this.handleChange}
                onBlur={this.handleBlur}
                value={this.props.value}
                />
            </div>
        );
    }
}

export class AestheticSelect extends React.Component {
    handleChange = value => {
        this.props.onChange('aestheticRating', value);
    };

    handleBlur = () => {
        this.props.onBlur('aestheticRating', true);
    };

    render() {
        return (
            <div style={{ margin: '1rem 0'  }}>
                <Select
                options={options}
                onChange={this.handleChange}
                onBlur={this.handleBlur}
                value={this.props.value}
                />
            </div>
        );
    }
}

export class GraphicContentSelect extends React.Component {
    handleChange = value => {
        this.props.onChange('graphicContentRating', value);
    };

    handleBlur = () => {
        this.props.onBlur('graphicContentRating', true);
    };

    render() {
        return (
            <div style={{ margin: '1rem 0'  }}>
                <Select
                options={options}
                onChange={this.handleChange}
                onBlur={this.handleBlur}
                value={this.props.value}
                />
            </div>
        );
    }
}

const ReviewForm = formikEnhancer(BaseForm);

export default ReviewForm