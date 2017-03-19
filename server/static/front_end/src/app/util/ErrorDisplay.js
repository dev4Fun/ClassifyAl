import React from 'react';
import Snackbar from 'material-ui/Snackbar';

export default class ErrorDisplay extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            autoHideDuration: 4000,
        }
    }

    render() {
        return (
            <Snackbar
                open={this.props.open}
                message={this.props.message}
                action="ok"
                autoHideDuration={this.state.autoHideDuration}
                onActionTouchTap={this.props.onClose}
                onRequestClose={this.props.onClose}
            />
        );
    }
}