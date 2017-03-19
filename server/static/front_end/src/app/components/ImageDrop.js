import React, { Component } from 'react';
import Dropzone from 'react-dropzone';

const styles = {
    dropZone: {
        width: '100%',
        maxHeight: '30vh',
        borderWidth: '2px',
        borderColor: 'rgb(102, 102, 102)',
        borderStyle: 'dashed',
        borderRadius: '5px',
        textAlign: 'center',
        display: 'flex',
        justifyContent: 'center',
    },

    preview: {
        display: 'block',
        border: '1px solid #ddd',
        borderRadius: '4px',
        padding: '4px',
        margin: '4px'
    },

    text: {
        marginTop: '6em'
    }
}

export default class ImageDrop extends Component {
    constructor(props) {
        super(props);

        this.state = {
            file: undefined
        };
    }

    cleanPreview = () => {
        this.setState({ file: undefined })
    }

    handleDrop = (newFiles) => {
        this.props.onImageUpload(newFiles);
        this.setState({ file: newFiles[0] })
    }

    render() {
        return (
            <Dropzone onDrop={this.handleDrop} multiple={false}
                accept={'image/jpeg, image/png'} maxSize={5242880} style={styles.dropZone}>
                {this.state.file ? <img style={styles.preview} src={this.state.file.preview} /> :
                    <p style={styles.text}>Drop Image or Click Here</p>}
            </Dropzone>
        );
    }
}