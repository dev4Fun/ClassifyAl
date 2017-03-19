import React, { Component } from 'react';

import Paper from 'material-ui/Paper';

const styles = {

    textColor: {
        color: '#FFF',
        fontSize: '1.5rem'
    },

    paper: {
        backgroundColor: 'rgba(255, 255, 255, 0.6)',
        paddingBottom: '10px'
    },

    container: {
        margin: "0px"
    },

    col: {
        padding: "0px",
        marginRight: "5px"
    },

    image: {
        width: 'calc(20%)',
        height: 'calc(25%)',
        marginTop: '8px',
        marginRight: '8px',
        opacity: '0.9'
    },

    wrapper: {
        display: 'flex',
        flexFlow: 'row wrap',
        justifyContent: 'center',
    }
};


const images = [];
for (var i = 1; i < 13; i++) {
    var imageName = "image" + i + ".jpg";
    images.push(
        <img key={imageName} style={styles.image} src={"./assets/grid/" + imageName} alt="" />
    );
}

export default class ImageGrid extends Component {
    render() {
        return (
            <Paper zDepth={2} style={styles.paper}>
                <div style={styles.wrapper}>
                    {images}
                </div>
            </Paper>
        );
    }
}