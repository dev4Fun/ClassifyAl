import React, { Component } from 'react';
import ImageDrop from './ImageDrop';
import RaisedButton from 'material-ui/RaisedButton';
import UrlField from './UrlField';

import { postPicture, postInstaUrl, postImageUrl } from '../util/webClient';

import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';

import ResultDialog from './ResultDialog';

import ErrorDisplay from '../util/ErrorDisplay';

const INSTA_HINT = 'Link to a post that is publicly visible E.x: www.instagram.com/p/***';
const URL_HINT = 'Use direct link to an image';

const styles = {
    container: {
        margin: '8px',
    },
};

export default class SubmitImageSection extends Component {
    constructor(props) {
        super(props);

        this.state = {
            error: '',
            selected: 'upload',
            image: null,
            submitDisabled: true,
            dialogOpen: false,
            predictions: null,
            imageUrl: null,
            hint: URL_HINT,
        }
    }

    displayResultDialog = (res) => {
        this.setState({
            dialogOpen: true,
            predictions: res.body.results,
            image: res.body.image_url || this.state.image
        })
    }

    onDialogClose = () => {
        if (this.refs.imageDrop) {
            this.refs.imageDrop.cleanPreview();
        }

        this.setState({
            dialogOpen: false,

            predictions: null,
            imageUrl: null,
            image: null
        });
    }

    onValidInsta = (validUrl) => {
        this.setState({
            submitDisabled: false,
            imageUrl: validUrl
        })
    }

    displayError = (err) => {
        if (err.response) {
            this.setState({
                errorOpened: true,
                error: err.response.body.reason,
                submitDisabled: false
            });
        }
    }

    onErrorClose = () => {
        this.setState({
            error: '',
        })
    }

    onChange = (event) => {
        let selection = event.target.value;
        let newHint = URL_HINT;
        if (selection === 'insta') {
            newHint = INSTA_HINT;
        }
        this.setState({ selected: selection, hint: newHint });
    }

    onImageUpload = (newImage) => {
        this.setState({
            image: newImage[0],
            submitDisabled: false
        });
    }

    onSubmit = (e) => {
        e.preventDefault();

        // show loading
        this.setState({ submitDisabled: true })

        let selection = this.state.selected;
        if (selection === 'upload' && this.state.image) {
            postPicture(this.state.image).then(this.displayResultDialog, this.displayError)
        } else if (selection === 'insta') {
            postInstaUrl(this.state.imageUrl).then(this.displayResultDialog, this.displayError);
        } else {
            postImageUrl(this.state.imageUrl).then(this.displayResultDialog, this.displayError);
        }
    }

    render() {
        return (
            <div style={styles.container}>
                <ResultDialog open={this.state.dialogOpen} onClose={this.onDialogClose}
                    predictions={this.state.predictions} image={this.state.image} />

                <h3>Select Image Source <sub style={{ fontStyle: 'italic' }}>supports jpeg and png up to 5MB</sub></h3>

                <RadioButtonGroup name="imageSource" defaultSelected="upload"
                    onChange={this.onChange}>
                    <RadioButton
                        value="upload"
                        label="Upload Image"
                    />
                    <RadioButton
                        value="insta"
                        label="Download from Instagram"
                    />
                    <RadioButton
                        value="url"
                        label="Download from Image URL"
                    />

                </RadioButtonGroup>

                <div style={styles.container}>
                    {
                        this.state.selected === 'upload' ?
                            <ImageDrop ref="imageDrop" onImageUpload={this.onImageUpload} /> :
                            <UrlField hint={this.state.hint} onValidInsta={this.onValidInsta} />
                    }
                </div>

                <RaisedButton
                    target="_blank"
                    primary={true}
                    label="Get me Predictions!"
                    onClick={this.onSubmit}
                    disabled={this.state.submitDisabled}
                    fullWidth={true}
                />

                <ErrorDisplay onClose={this.onErrorClose} open={this.state.error.length > 1} message={this.state.error} />
            </div>
        );
    }
}