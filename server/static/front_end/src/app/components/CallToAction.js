import React, { Component } from 'react';

const styles = {
    container: {
        display: 'flex',
        flexFlow: 'wrap',
        justifyContent: 'center',
        background: 'linear-gradient(to top, rgba(255,255,255,1) 5%,rgba(0,0,0,0) 100%)'
    },

    text: {
        width: '100%',
        textAlign: 'center',
        fontSize: '2.5em'
    },

    icon: {
        color: '#C5CAE9',
        fontSize: '6em',
    }
}

export default class CallToAction extends Component {
    render() {
        return (
            <div style={styles.container}>
                <h2 style={styles.text}>Try it out</h2>
                <span style={styles.icon} className='icon-long-arrow-down'></span>
            </div>
        )
    }
}