import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';

import IconButton from 'material-ui/IconButton';
import Help from 'material-ui/svg-icons/action/help';

import Badge from 'material-ui/Badge';

import Clear from 'material-ui/svg-icons/content/clear';

import { red300 } from 'material-ui/styles/colors';

const styles = {
    icon: {
        width: 24,
        height: 24,
        color: red300
    },
    small: {
        width: 48,
        height: 48,
        padding: 12,
    },
}

export default class UrlField extends Component {
    constructor(props) {
        super(props);

        this.state = {
            submitEnabled: false,
            errorText: null,
            showClear: false,
            urlText: ''
        }
    }

    onChange = (event) => {
        let text = event.target.value;

        if (this.isValidUrl(text)) {
            this.props.onValidInsta(text);
        }

        let sholdShowClear = false;
        if (text && text.length > 0) {
            sholdShowClear = true;
        }

        this.setState({ showClear: sholdShowClear, urlText: text });
    }

    isValidUrl(url) {
        return true;
    }

    clearInput = () => {
        this.setState({ urlText: '', showClear: false });
    }

    render() {
        return (
            <Badge badgeContent={
                <IconButton
                    tooltip={this.props.hint}
                    touch={true}
                    tooltipPosition='top-center'>
                    <Help />
                </IconButton >}>

                <TextField
                    type='url'
                    value={this.state.urlText}
                    hintText="Insert your url here"
                    errorText={this.state.errorText}
                    onChange={this.onChange}
                    floatingLabelText="Image URL"
                />
                {this.state.showClear ?
                    <IconButton tooltip="Clear" onClick={this.clearInput} tooltipPosition="top-right" style={styles.small} iconStyle={styles.icon}>
                        <Clear />
                    </IconButton> : null}
            </Badge>
        );
    }
}