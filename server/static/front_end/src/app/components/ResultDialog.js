import React, { Component } from 'react';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

import { Container, Row, Col } from 'react-grid-system';

import ResultTable from './ResultTable';

const styles = {
    predictions: {
        lineHeight: '1.5em'
    },

    emphasized: {
        fontWeight: '500'
    },

    image: {
        maxWidth: '100%',
        height: '15em',
        border: '1px solid #ddd',
        borderRadius: '4px',
        padding: '5px'
    }
}

export default class ResultDialog extends Component {
    constructor(props) {
        super(props);

        this.actions = [
            <FlatButton
                label="Ok"
                primary={true}
                keyboardFocused={true}
                onTouchTap={this.props.onClose}
            />,
        ]
    }
    render() {
        let image = this.props.image;

        if (image && typeof (image) == 'object') {
            image = image.preview;
        }

        return (
            <Dialog
                title="Predictions"
                open={this.props.open}
                onRequestClose={this.props.onClose}
                actions={this.actions}
                autoScrollBodyContent={true}>

                <h3>My best guesses are:</h3>

                <Row>
                    <Col md={6} >
                        <ResultTable predictions={this.props.predictions} />
                    </Col>

                    <Col md={6}>
                        <div style={{ float: 'right' }}>
                            {image ?
                                <img src={image} style={styles.image} />
                                : null}
                        </div>
                    </Col>
                </Row>
            </Dialog>
        )
    }
}