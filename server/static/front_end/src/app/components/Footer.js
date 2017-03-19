import React, { Component } from 'react';

import { Container, Row, Col } from 'react-grid-system';

import Link from './Link';

const styles = {
    footer: {
        marginTop: '3em',
        backgroundColor: 'rgb(200, 200, 200)',
        color: '#ADADAD',
    },

    container: {
        padding: 0
    },

    center: {
        fontSize: '20px',
        fontWeight: 'bold',
        marginTop: '2em',
        marginBottom: '2em',
        color: 'rgb(45, 45, 45)'
    },

    icon: {
        fontSize: '20px',
        cursor: 'pointer',
        textAlign: 'center',
        whiteSpace: 'nowrap',
        marginTop: '2em',
        marginBottom: '2em'
    }

};

export default class Footer extends Component {
    handleEmailClick = (e) => {
        e.preventDefault();
        window.location.href = 'mailto:maksim-avdyushkin@hotmail.ca';
    }

    handleLinkedClick = (e) => {
        e.preventDefault();
        window.open('https://www.linkedin.com/in/maksimavdyushkin');
    }

    render() {
        return (
            <footer style={styles.footer}>
                <Container style={styles.container}>
                    <Row>
                        <Col md={8}>
                            <p style={styles.center}>Made with <span style={{ color: 'red' }} className='icon-heart-o'></span> by Max Avdyushkin © {new Date().getFullYear()}</p>
                        </Col>
                        <Col md={2}>
                            <Link >
                                <p style={styles.icon} onClick={this.handleEmailClick}><span className='icon-envelope-open'></span> Contact</p>
                            </Link>
                        </Col>
                        <Col md={2}>
                            <Link>
                                <p style={styles.icon} onClick={this.handleLinkedClick}><span className='icon-linkedin'></span> LinkedIn</p>
                            </Link>
                        </Col>
                    </Row>
                </Container>
            </footer>
        )
    }
}