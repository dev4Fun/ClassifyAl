import React, { Component } from 'react';

import { white } from 'material-ui/styles/colors';

const styles = {
    h1: {
        color: white,
        fontSize: '62px'
    },

    h3: {
        color: white,
        fontSize: "18px",
        margin: '0',
        fontFamily: 'sans-serif',
        fontWeight: 500,
        textAlign: 'center',
        textShadow: "rgba(0, 0, 0, 1) -1px 3px 5px, rgba(0, 0, 0, 1) 4px 6px 12px, rgba(0, 0, 0, 0.047059) -14px 33px 5px"
    },

    firstPart: {
        textShadow: "rgb(0, 0, 0) -1px 3px 14px, rgb(0, 0, 0) 4px 8px 21px, rgba(0, 0, 0, 0.0470588) -14px 33px 7px"
    },

    secondPart: {
        textShadow: "rgb(0, 0, 0) -1px 3px 14px, rgb(0, 0, 0) 9px 9px 18px, rgba(0, 0, 0, 0.0470588) -14px 33px 7px",
        fontSize: 'larger'
    },

    wrapper: {
        display: 'flex',
        flexFlow: 'column wrap',
        alignItems: 'center',
    }
}

export default class IntroText extends Component {
    render() {
        return (
            <div style={styles.wrapper}>

                <h1 style={styles.h1}>
                    <span style={styles.firstPart}>Classify</span>
                    <span style={styles.secondPart}>Al</span>
                </h1>

                <h3 style={styles.h3}>Retrained inception v3 model with Tensorflow <br />to recognize common human activities made entirely of public Google images</h3>

                <br />
            </div>
        )
    }
}